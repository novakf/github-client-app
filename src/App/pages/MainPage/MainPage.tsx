import React, { useEffect, useState } from 'react';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'icons/SearchIcon';
import Card from 'components/Card';
import { Link } from 'react-router-dom';
import { RepositoryType } from 'App/types';
import PaginatedItems from './components/PaginatedItems';
import { getReps } from 'App/model';
import styles from './MainPage.module.scss';
import StarIcon from 'icons/StarIcon';

type Props = {
  reps: RepositoryType[];
  setReps: (value: RepositoryType[]) => void;
};

const MainPage: React.FC<Props> = ({ reps, setReps }) => {
  let storedTopic = localStorage.getItem('topic');
  let repsOwner = '';
  if (reps[0]) repsOwner = reps[0].owner.login;

  const [topic, setTopic] = useState<string>(storedTopic ? storedTopic : '');
  const [debouncedTopic, setDebouncedTopic] = React.useState('');
  const [inputValue, setInputValue] = useState<string>(repsOwner);
  const [org, setOrg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedTopic(topic);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [topic]);

  useEffect(() => {
    org !== '' && getReps(org, setReps, setError);
  }, [org]);

  useEffect(() => {
    localStorage.setItem('topic', topic);
  }, [topic]);

  console.log(debouncedTopic, topic);

  if (reps.length !== 0) localStorage.setItem('reps', JSON.stringify(reps));
  if (error) localStorage.removeItem('reps');

  const topicTarget = (target?: string[]) => {
    if (!target || !debouncedTopic) return true;
    if (!target.includes(debouncedTopic)) return false;
    else return true;
  };

  const handleOrgEnter = (event: React.KeyboardEvent) => {
    let value = (event.target as HTMLInputElement).value;
    if (event.key === 'Enter') {
      setInputValue(value);
      setOrg(value);
    }
  };

  console.log(reps);

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
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="Enter organization name"
          onKeyDown={handleOrgEnter}
        />
        <Button
          className={styles.button}
          onClick={() => {
            localStorage.removeItem('reps');
            setOrg(inputValue);
          }}
        >
          <SearchIcon />
        </Button>
      </div>
      {!error && reps.length !== 0 && (
        <div className={styles.repsList}>
          <PaginatedItems itemsPerPage={6} condition={topicTarget} reps={reps}>
            {reps.map((rep, i: number) => {
              let date = new Date();
              if (rep.updated_at) date = new Date(rep.updated_at);
              let splicedDate = 'Updated ' + date.toString().split(' ')[2] + ' ' + date.toString().split(' ')[1];
              return (
                <Link key={i} to={`/repository/${i}`}>
                  <div className={styles.repCard} onClick={() => localStorage.removeItem('topic')}>
                    <Card
                      image={rep.owner.avatar_url}
                      captionSlot={
                        <div className={styles.captionSlot}>
                          <div className={styles.captionStars}>
                            <StarIcon />
                            {rep.stargazers_count}
                          </div>
                          {splicedDate}
                        </div>
                      }
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
        <Text view="p-16" className={styles.notfoundText}>
          Repositories not found!
        </Text>
      )}
      {error && (
        <Text view="p-16" className={styles.notfoundText}>
          Organization not found!
        </Text>
      )}
    </>
  );
};

export default MainPage;
