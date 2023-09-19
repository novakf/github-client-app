import React from 'react';
import { ContributorType } from 'App/types';
import CircleIcon from 'icons/CircleIcon';
import Contributor from '../Contributor';
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
      {contributors.map((contributor) => {
        return <Contributor key={contributor.id} contributor={contributor} />;
      })}
    </div>
  );
};

export default Contributors;
