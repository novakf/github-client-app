import React from 'react';
import styles from './Repositories.module.scss';
import { RepositoryType } from 'App/types';
import RepoContainer from './components/RepoContainer';
import RepoIcon from 'icons/RepoIcon';
import { Meta } from 'store/types';
import { useParams } from 'react-router-dom';

type Props = {
  repos: RepositoryType[];
  meta: Meta;
};

const Repositories: React.FC<Props> = ({ repos, meta }) => {
  let login = useParams().login;

  return (
    <div className={styles.wrapper}>
      <div className={styles.action}>
        <div className={styles.title}>Popular repositories</div>
        {login === 'api-testing-profile' && (
          <a href="/new" className={styles.createButton} style={{ textDecoration: 'none' }}>
            <RepoIcon /> New
          </a>
        )}
      </div>
      <ul className={styles.reposList}>
        {repos.map((repo) => {
          return (
            <li key={repo.id}>
              <RepoContainer key={repo.id} repo={repo} />
            </li>
          );
        })}
      </ul>
      {repos.length === 0 && meta !== Meta.loading && <div className={styles.noRepos}>No repositories found</div>}
    </div>
  );
};

export default Repositories;
