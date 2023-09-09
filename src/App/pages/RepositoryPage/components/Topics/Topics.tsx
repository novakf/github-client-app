import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Topics.module.scss';
import { RepositoryType } from 'App/types';

type Props = {
  currentRepo: RepositoryType;
};

const Topics: React.FC<Props> = ({ currentRepo }) => {
  return (
    <div className={styles.topics}>
      {currentRepo.topics?.map((topic, i) => {
        return (
          <Link key={i} to={'/'} style={{ textDecoration: 'none' }}>
            <div className={styles.topic} onClick={() => localStorage.setItem('topic', topic)}>
              {topic}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Topics;
