import ArrowLeftIcon from 'icons/ArrowLeftIcon';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Text from 'components/Text';
import LinkIcon from 'icons/LinkIcon';
import Languages from './components/Languages';
import Readme from './components/Readme';
import Topics from './components/Topics';
import Stats from './components/Stats';
import Contributors from './components/Contributors';
import styles from './RepositoryPage.module.scss';
import GitHubStore from 'store/GitHubStore';
import { observer, useLocalObservable } from 'mobx-react-lite';
import RepoStore from 'store/RepoStore';

const RepositoryPage: React.FC = () => {
  const gitHubStore = useLocalObservable(() => new GitHubStore());
  let currentRepo = gitHubStore.list.filter((rep) => rep.id === Number(useParams().id))[0];
  let readmeUrl = `/repos/${currentRepo.owner.login}/${currentRepo.name}/readme`;
  const repoStore = useLocalObservable(
    () => new RepoStore(currentRepo.contributors_url, currentRepo.languages_url, readmeUrl),
  );

  const contributorsStore = repoStore.contributorsStore;
  const languagesStore = repoStore.languagesStore;
  const readmeStore = repoStore.readmeStore;

  useEffect(() => {
    contributorsStore.getContributors();
    languagesStore.getLanguages();
    readmeStore.getReadme();
  }, [contributorsStore, languagesStore, readmeStore]);

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
          <Contributors contributors={contributorsStore.list} />
          <Languages languages={languagesStore.list} />
        </div>
      </div>
      <Readme file={readmeStore.file} />
    </div>
  ) : (
    <div>Repository not found</div>
  );
};

export default observer(RepositoryPage);
