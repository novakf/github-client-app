import React, { useEffect, useState } from 'react';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'icons/SearchIcon';
import Card from 'components/Card';
import { Link } from 'react-router-dom';
import { RepositoryType } from 'App/types';
import PaginatedItems from 'App/pages/MainPage/components/PaginatedItems';
import { getReps } from 'App/model';
import styles from './MainPage.module.scss';

// import MultiDropdown from 'components/MultiDropdown';
// import { Option } from 'components/MultiDropdown';

// const DropdownOptions = (): Option[] => {
//   return [
//     { key: 'js', value: 'javascript' },
//     { key: 'pyt', value: 'python' },
//   ];
// };

type Props = {
  reps: RepositoryType[];
  setReps: (value: RepositoryType[]) => void;
};

const MainPage: React.FC<Props> = ({ reps, setReps }) => {
  let storedTopic = localStorage.getItem('topic');

  //  const [value, setValue] = useState<Option[]>(topic ? [{ key: topic, value: topic }] : []);

  const [topic, setTopic] = useState<string>(storedTopic ? storedTopic : '');
  const [inputValue, setInputValue] = useState<string>('');
  const [org, setOrg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    org !== '' && getReps(org, setReps, setError);
  }, [org]);

  useEffect(() => {
    localStorage.setItem('topic', topic);
  }, [topic]);

  if (reps.length !== 0) localStorage.setItem('reps', JSON.stringify(reps));
  if (error) localStorage.removeItem('reps');

  const topicTarget = (target?: string[]) => {
    if (!target || !topic) return true;

    //  let fl = true;
    //  for (let i = 0; i < value.length; i++) {
    //    if (!target.includes(value[i].value)) {
    //      fl = false;
    //      break;
    //    }
    //  }
    // return fl;

    if (!target.includes(topic)) return false;
    else return true;
  };

  return (
    <>
      <Text view="title" className={styles.title}>
        List organization repositories
      </Text>
      <Text view="p-20" className={styles.subtitle}>
        Lists organization repositories
      </Text>

      <div className={styles.topicInput}>
        <Input value={topic} onChange={setTopic} placeholder="Enter topic" />
      </div>

      <div className={styles.orgInput}>
        <Input value={inputValue} onChange={setInputValue} placeholder="Enter organization name" />
        <Button className={styles.button} onClick={() => setOrg(inputValue)}>
          <SearchIcon />
        </Button>
      </div>
      {!error && reps.length !== 0 && (
        <div className={styles.repsList}>
          <PaginatedItems itemsPerPage={6} condition={topicTarget} reps={reps}>
            {reps.map((rep, i: number) => {
              return (
                <Link key={i} to={`/repository/${i}`}>
                  <div className={styles.repCard} onClick={() => localStorage.removeItem('topic')}>
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
          </PaginatedItems>
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
