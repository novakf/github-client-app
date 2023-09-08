import React, { useEffect, useState } from 'react';
import styles from './Contributor.module.scss';
import { ContributorType, ProfileType } from 'App/types';
import axios from 'axios';

type Props = {
  contributor: ContributorType;
};

const Contributor: React.FC<Props> = ({ contributor }) => {
  const [data, setData] = useState<ProfileType>();

  useEffect(() => {
    axios.get(contributor.url).then((res) => setData(res.data));
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
