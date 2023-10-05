import Text from 'components/Text';
import styles from './Header.module.scss';
import GitHubIcon from 'icons/GitHubIcon';
import ProfileIcon from 'icons/PropfileIcon';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer, useLocalObservable } from 'mobx-react-lite';
import ProfileStore from 'store/ProfileStore';

const Header: React.FC = () => {
  const profileStore = useLocalObservable(() => new ProfileStore());

  useEffect(() => {
    profileStore.getProfile();
  }, [profileStore]);

  return (
    <div className={styles.header}>
      <Link to={'/'}>
        <GitHubIcon className={styles.icon} />
      </Link>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <Text view="p-20" weight="bold" className={styles.title}>
          GitHub Client
        </Text>
      </Link>
      <Link className={styles.profile} to={`/profile/api-testing-profile`}>
        <img src={profileStore.profile.avatar_url} className={styles.img} />
      </Link>
    </div>
  );
};

export default observer(Header);
