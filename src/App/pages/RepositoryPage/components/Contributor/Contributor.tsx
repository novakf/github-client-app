import React, { useEffect, useState } from 'react';
import styles from './Contributor.module.scss';
import { ContributorType, ProfileType } from 'App/types';
import { getData } from 'App/model';

type Props = {
  contributor: ContributorType;
};

const Contributor: React.FC<Props> = ({ contributor }) => {
  const [data, setData] = useState<ProfileType>();

  useEffect(() => {
    getData(contributor.url, setData);
  }, []);

  return (
    <div className={styles.contributor}>
      <img className={styles.logo} src={contributor.avatar_url} alt="contrib" />
      <div className={styles.login}>{contributor.login}</div>
      <div className={styles.name}>{data?.name}</div>
    </div>
  );
};

export default Contributor;
