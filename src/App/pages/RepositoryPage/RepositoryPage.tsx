import ArrowLeftIcon from 'icons/ArrowLeftIcon';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Text from 'components/Text';
import LinkIcon from 'icons/LinkIcon';
import { ContributorType } from 'App/types';
import Languages from './components/Languages';
import Readme from './components/Readme';
import { getData } from 'App/model';
import Topics from './components/Topics';
import Stats from './components/Stats';
import Contributors from './components/Contributors';
import styles from './RepositoryPage.module.scss';
import GitHubStore from 'store/GitHubStore';
import { observer, useLocalObservable } from 'mobx-react-lite';

const RepositoryPage: React.FC = () => {
  const gitHubStore = useLocalObservable(() => new GitHubStore());
  const [contributors, setContributors] = useState<ContributorType[]>([]);

  let repos = gitHubStore.list;

  let id = useParams().id;
  let index = Number(id);

  let currentRepo = repos.filter((rep) => rep.id === index)[0];

  useEffect(() => {
    getData(currentRepo.contributors_url, setContributors);
  }, []);

  return currentRepo ? (
    <div className={styles.repContainer}>
      <div className={styles.titleContainer}>
        <Link to={'/'}>
          <ArrowLeftIcon />
        </Link>
        <img className={styles.logo} src={currentRepo.owner.avatar_url} alt="avatar" />
        <Text className={styles.title} view="title">
          {currentRepo.name}
        </Text>
      </div>
      <div className={styles.repoInfo}>
        {currentRepo.homepage && (
          <a href={currentRepo.homepage} target="_blank" style={{ textDecoration: 'none' }}>
            <Text view="p-16" weight="bold" className={styles.link}>
              <LinkIcon className={styles.linkIcon} />
              {currentRepo.homepage.split('').splice(8, currentRepo.homepage.length).join('')}
            </Text>
          </a>
        )}
        <Topics currentRepo={currentRepo} />
        <Stats currentRepo={currentRepo} />
        <div className={styles.contributors_languages}>
          <Contributors contributors={contributors} />
          <Languages languages_url={currentRepo.languages_url} />
        </div>
      </div>
      <Readme repo={currentRepo} />
    </div>
  ) : (
    <div>Repository not found</div>
  );
};

export default observer(RepositoryPage);
