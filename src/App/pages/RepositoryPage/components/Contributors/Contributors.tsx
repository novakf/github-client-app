import React from 'react';
import { ContributorType } from 'App/types';
import CircleIcon from 'icons/CircleIcon';
import Contributor from 'App/pages/RepositoryPage/components/Contributor';
import styles from './Contributors.module.scss';

type Props = {
  contributors: ContributorType[];
};

const Contributors: React.FC<Props> = ({ contributors }) => {
  return (
    <div className={styles.contributors}>
      <div className={styles.contributorTitle}>
        Contributors
        <CircleIcon fill="#D9D9D9" />
        <div className={styles.contributorsNumber}>{contributors.length}</div>
      </div>
      {contributors.map((contributor, i) => {
        return <Contributor key={i} contributor={contributor} />;
      })}
    </div>
  );
};

export default Contributors;
