import React, { useEffect, useState } from 'react';
import { Octokit } from 'octokit';
import axios from 'axios';
import Text from 'components/Text';
import MultiDropdown from 'components/MultiDropdown';
import { Option } from 'components/MultiDropdown';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'icons/SearchIcon';
import Card from 'components/Card';
import { Link } from 'react-router-dom';
import { GITHUB_API_TOKEN } from 'App/constants.ts';
import styles from './MainPage.module.scss';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

const oktokitGetReps = async (org: string, setReps: React.Dispatch<any>, setError: React.Dispatch<string>) => {
  try {
    const result = await octokit.request('GET /orgs/{org}/repos', {
      org: org,
    });
    console.log(result);
    setError('');
    setReps(result.data);
  } catch (error: any) {
    setError(error.status);
  }
};

// has queries limit
const axiosGetReps = async (org: string, setReps: React.Dispatch<any>, setError: React.Dispatch<string>) => {
  let url = `https://api.github.com/orgs/${org}/repos`;

  axios
    .get(`${url}`)
    .then((res) => {
      setError('');
      setReps(res.data);
    })
    .catch((err) => {
      setReps([]);
      setError(err);
    });
};

const DropdownOptions = (): Option[] => {
  return [
    { key: 'prv', value: ' private' },
    { key: 'pbl', value: ' public' },
  ];
};

const MainPage: React.FC = () => {
  const [value, setValue] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState<string>('ktsstudio');
  const [reps, setReps] = useState<any>([]);
  const [org, setOrg] = useState<string>('ktsstudio');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (GITHUB_API_TOKEN.length !== 0) org !== '' && oktokitGetReps(org, setReps, setError);
    else org !== '' && axiosGetReps(org, setReps, setError);
  }, [org]);

  console.log(reps);

  return (
    <>
      <Text view="title" className={styles.title}>
        List organization repositories
      </Text>
      <Text view="p-20" className={styles.subtitle}>
        Lists organization repositories
      </Text>

      <MultiDropdown
        className={styles.dropdownn}
        getTitle={(values) => (values.length === 0 ? 'Type' : `Chosen: ${values.map((value) => value.value)} `)}
        options={DropdownOptions()}
        value={value}
        onChange={setValue}
      />

      <div className={styles.typeInput}>
        <Input value={inputValue} onChange={setInputValue} placeholder="Enter organization name" />
        <Button className={styles.button} onClick={() => setOrg(inputValue)}>
          <SearchIcon />
        </Button>
      </div>

      {!error && reps.length !== 0 && (
        <div className={styles.repsList}>
          {(reps as any).map((rep: any) => {
            return (
              <Link key={rep.id} to={`/repository/${rep.id}`}>
                <div className={styles.repCard}>
                  <Card
                    image={rep.owner.avatar_url}
                    captionSlot={rep.updated_at}
                    title={rep.name}
                    subtitle={rep.description}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {!error && reps.length === 0 && (
        <Text view="p-16" className={styles.firstText}>
          Repositories not found!
        </Text>
      )}
      {error && (
        <Text view="p-16" className={styles.firstText}>
          Organization not found!
        </Text>
      )}
    </>
  );
};

export default MainPage;
