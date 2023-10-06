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
import { observer, useLocalObservable } from 'mobx-react-lite';
import RepoStore from 'store/RepoStore';
import { gitHubStore } from '../MainPage/MainPage';
import ContributorsStore from 'store/RepoStore/ContributorsStore';
import ReadmeStore from 'store/RepoStore/ReadmeStore';
import LanguagesStore from 'store/RepoStore/LanguagesStore';

const RepositoryPage: React.FC = () => {
  const { owner, repoName } = useParams();
  const repoStore = useLocalObservable(() => new RepoStore());
  let currentRepo = gitHubStore.list.filter((rep) => rep.name === useParams().repoName)[0];

  document.body.style.background = 'white';

  useEffect(() => {
    owner && repoName && repoStore.getRepo(owner, repoName);
  }, [repoStore]);

  if (!currentRepo) currentRepo = repoStore.repo;

  const contributorsStore = useLocalObservable(() => new ContributorsStore());
  const languagesStore = useLocalObservable(() => new LanguagesStore());
  const readmeStore = useLocalObservable(() => new ReadmeStore());

  useEffect(() => {
    if (currentRepo.id) {
      contributorsStore.getContributors(currentRepo.contributors_url);
      languagesStore.getLanguages(currentRepo.languages_url);
      readmeStore.getReadme(`/repos/${owner}/${repoName}/readme`);
    }
  }, [currentRepo, contributorsStore, languagesStore, readmeStore]);

  return (
    currentRepo.id && (
      <div className={styles.repContainer}>
        <div className={styles.titleContainer}>
          <div
            onClick={() => {
              if (history.length > 2) history.back();
              else window.location.href = `profile/${owner}`;
            }}
            style={{ cursor: 'pointer' }}
          >
            <ArrowLeftIcon />
          </div>
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
    )
  );
};

export default observer(RepositoryPage);
