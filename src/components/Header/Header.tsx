import Text from 'components/Text';
import styles from './Header.module.scss';
import GitHubIcon from 'icons/GitHubIcon';
import ProfileIcon from 'icons/PropfileIcon';
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
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
      <ProfileIcon className={styles.profile} />
    </div>
  );
};

export default Header;
