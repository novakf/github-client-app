import React, { useEffect, useState } from 'react';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'icons/SearchIcon';
import Card from 'components/Card';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.scss';
import StarIcon from 'icons/StarIcon';
import InfiniteScroll from './components/InfiniteScroll';
import GitHubStore from 'store/GitHubStore/';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Meta } from 'store/GitHubStore/types';
import Loader from 'components/Loader';

const MainPage: React.FC = () => {
  const gitHubStore = useLocalObservable(() => new GitHubStore());

  let storedTopic = localStorage.getItem('topic');
  let repsOwner = '';
  if (gitHubStore.list[0]) repsOwner = gitHubStore.list[0].owner.login;

  const [topic, setTopic] = useState<string>(storedTopic ? storedTopic : '');
  const [debouncedTopic, setDebouncedTopic] = React.useState(storedTopic);
  const [inputValue, setInputValue] = useState<string>(repsOwner);

  useEffect(() => {
    localStorage.setItem('topic', topic);
    const timeout = setTimeout(() => {
      setDebouncedTopic(topic);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [topic]);

  if (gitHubStore.list.length !== 0) localStorage.setItem('reps', JSON.stringify(gitHubStore.list));

  if (gitHubStore.meta === Meta.error) localStorage.removeItem('reps');

  const topicTarget = (target?: string[]) => {
    if (!target || !debouncedTopic) return true;
    if (!target.includes(debouncedTopic)) return false;
    else return true;
  };

  const handleOrgEnter = (event: React.KeyboardEvent) => {
    let value = (event.target as HTMLInputElement).value;
    if (event.key === 'Enter') {
      localStorage.removeItem('reps');
      setInputValue(value);
      gitHubStore.getRepos(value);
    }
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
            gitHubStore.getRepos(inputValue);
          }}
        >
          <SearchIcon />
        </Button>
      </div>

      {gitHubStore.meta === Meta.success && gitHubStore.list.length !== 0 && (
        <div className={styles.repsList}>
          <InfiniteScroll
            repsOwner={repsOwner}
            itemsPerPage={6}
            reps={gitHubStore.list.filter((rep) => topicTarget(rep.topics))}
            renderRep={(rep) => {
              let date = new Date();
              if (rep.updated_at) date = new Date(rep.updated_at);
              let splicedDate = 'Updated ' + date.toString().split(' ')[2] + ' ' + date.toString().split(' ')[1];
              return (
                <Link key={rep.id} to={`/repository/${rep.id}`}>
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
            }}
          />
        </div>
      )}
      {gitHubStore.meta === Meta.loading && (
        <div className={styles.listLoader}>
          <Loader />
        </div>
      )}
      {gitHubStore.meta === Meta.error && gitHubStore.list[0]?.owner.login && (
        <Text view="p-16" className={styles.notfoundText}>
          Repositories not found!
        </Text>
      )}
      {gitHubStore.meta === Meta.error && !gitHubStore.list[0]?.owner.login && (
        <Text view="p-16" className={styles.notfoundText}>
          Organization not found!
        </Text>
      )}
    </>
  );
};

export default observer(MainPage);
