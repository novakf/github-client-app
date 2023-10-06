import React from 'react';
import { ContributorType } from 'App/types';
import CircleIcon from 'icons/CircleIcon';
import Contributor from '../Contributor';
import styles from './Contributors.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  contributors: ContributorType[];
};

const Contributors: React.FC<Props> = ({ contributors }) => {
  return (
    <div className={styles.contributors}>
      <div className={styles.contributorTitle}>
        Contributors
        <CircleIcon fill="#D9D9D9" />
        <div className={styles.contributorsNumber}>{contributors ? contributors.length : 0}</div>
      </div>
      {contributors?.map((contributor) => {
        return (
          <a key={contributor.id} href={`#profile/${contributor.login}`} style={{ textDecoration: 'none' }}>
            <Contributor contributor={contributor} />
          </a>
        );
      })}
    </div>
  );
};

export default Contributors;
