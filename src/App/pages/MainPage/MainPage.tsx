import React, { useEffect, useState } from 'react';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'icons/SearchIcon';
import Card from 'components/Card';
import { Link, useParams } from 'react-router-dom';
import styles from './MainPage.module.scss';
import StarIcon from 'icons/StarIcon';
import GitHubStore from 'store/GitHubStore/';
import { observer } from 'mobx-react-lite';
import { Meta } from 'store/types';
import Loader from 'components/Loader';

export const gitHubStore = new GitHubStore();

const ONE_PAGE_LIMIT = 6;
const TOPIC_LIMIT = 6;

const MainPage: React.FC = () => {
  let storedTopic = localStorage.getItem('topic');
  let repsOwner = useParams().owner ? (useParams().owner as string) : '';

  const [topic, setTopic] = useState<string>(storedTopic ? storedTopic : '');
  const [debouncedTopic, setDebouncedTopic] = React.useState(storedTopic);
  const [inputValue, setInputValue] = useState<string>(repsOwner);

  document.body.style.background = '#f6f8fa';

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      gitHubStore.incrementPage();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [debouncedTopic]);

  useEffect(() => {
    if (debouncedTopic) gitHubStore.getRepos(repsOwner, ONE_PAGE_LIMIT);
    else gitHubStore.getRepos(repsOwner, TOPIC_LIMIT);
  }, [gitHubStore.page, debouncedTopic]);

  useEffect(() => {
    localStorage.setItem('topic', topic);
    const timeout = setTimeout(() => {
      setDebouncedTopic(topic);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [topic]);

  const topicTarget = (target?: string[]) => {
    if (!target || !debouncedTopic) return true;
    if (!target.includes(debouncedTopic)) return false;
    else return true;
  };

  const handleOrgEnter = (event: React.KeyboardEvent) => {
    let value = (event.target as HTMLInputElement).value;
    if (event.key === 'Enter') {
      setInputValue(value);
      window.location.replace(`/${value}`);
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
            window.location.replace(`/${inputValue}`);
            gitHubStore.getRepos(inputValue);
          }}
        >
          <SearchIcon />
        </Button>
      </div>

      {gitHubStore.list.length !== 0 && (
        <div className={styles.repsList}>
          {gitHubStore.list
            .filter((rep) => topicTarget(rep.topics))
            .map((rep) => {
              let date = new Date();
              if (rep.updated_at) date = new Date(rep.updated_at);
              let splicedDate = 'Updated ' + date.toString().split(' ')[2] + ' ' + date.toString().split(' ')[1];
              return (
                <Link key={rep.id} to={`/${repsOwner}/${rep.name}`}>
                  <div className={styles.repCard}>
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
