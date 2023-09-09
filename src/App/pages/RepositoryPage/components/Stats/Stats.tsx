import React from 'react';
import styles from './Stats.module.scss';
import StarIcon from 'icons/StarIcon';
import Text from 'components/Text';
import { RepositoryType } from 'App/types';
import EyeIcon from 'icons/EyeIcon';
import ForkIcon from 'icons/ForkIcon';

type Props = {
  currentRepo: RepositoryType;
};

const Stats: React.FC<Props> = ({ currentRepo }) => {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <StarIcon />
        <Text view="p-14" className={styles.statText}>
          {currentRepo.stargazers_count} stars
        </Text>
      </div>
      <div className={styles.stat}>
        <EyeIcon style={{ marginLeft: '1px' }} />
        <Text view="p-14" className={styles.statText}>
          {currentRepo.watchers_count} watchers
        </Text>
      </div>
      <div className={styles.stat}>
        <ForkIcon />
        <Text view="p-14" className={styles.statText}>
          {currentRepo.forks_count} forks
        </Text>
      </div>
    </div>
  );
};

export default Stats;
