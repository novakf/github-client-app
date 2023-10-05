import { RepositoryType } from 'App/types';
import React from 'react';
import styles from './RepoContainer.module.scss';
import { Link } from 'react-router-dom';
import CircleIcon from 'icons/CircleIcon';
import { colorPicker } from 'utils/index';
import { useLocalObservable } from 'mobx-react-lite';
import ProfileStore from 'store/ProfileStore';

type Props = {
  repo: RepositoryType;
};

const RepoContainer: React.FC<Props> = ({ repo }) => {
  const profileStore = useLocalObservable(() => new ProfileStore());

  const deleteRepo = () => {
    profileStore.deleteRepo(repo.owner.login, repo.name);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.line}>
        <Link to={`/${repo.owner.login}/${repo.name}`} style={{ textDecoration: 'none' }}>
          <div className={styles.repoName}>{repo.name}</div>
        </Link>
        <div className={styles.visibility}>{repo.private ? 'Private' : 'Public'}</div>
      </div>
      {repo.language && (
        <div className={styles.language}>
          <CircleIcon fill={colorPicker(repo.language)} className={styles.languageIcon} />
          {repo.language}
        </div>
      )}
      {repo.owner.login === 'api-testing-profile' && (
        <button
          className={styles.deleteButton}
          onClick={() => {
            deleteRepo();
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default RepoContainer;
