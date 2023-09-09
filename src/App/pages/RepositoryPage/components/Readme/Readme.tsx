import React, { useEffect, useState } from 'react';
import { RepositoryType } from 'App/types';
import { getReadme } from 'App/model';
import styles from './Readme.module.scss';

type Props = {
  repo: RepositoryType;
};

const Readme: React.FC<Props> = ({ repo }) => {
  const [file, setFile] = useState<string>('');

  useEffect(() => {
    getReadme(repo.owner.login, repo.name, setFile);
  }, []);

  return (
    <div className={styles.readmeContainer}>
      <div className={styles.filename}>README.MD</div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: file }}></div>
    </div>
  );
};

export default Readme;
