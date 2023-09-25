import React, { useEffect } from 'react';
import styles from './Contributor.module.scss';
import { ContributorType } from 'App/types';
import { observer, useLocalObservable } from 'mobx-react-lite';
import ProfileStore from 'store/RepoStore/ProfileStore';

type Props = {
  contributor: ContributorType;
};

const Contributor: React.FC<Props> = ({ contributor }) => {
  const profileStore = useLocalObservable(() => new ProfileStore(contributor.url));

  useEffect(() => {
    profileStore.getProfile();
  }, [profileStore]);

  return (
    <div className={styles.contributor}>
      <img className={styles.logo} src={contributor.avatar_url} alt="contrib" />
      <div className={styles.login}>{contributor.login}</div>
      <div className={styles.name}>{profileStore.info?.name}</div>
    </div>
  );
};

export default observer(Contributor);
