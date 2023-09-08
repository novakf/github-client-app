import ArrowLeftIcon from 'icons/ArrowLeftIcon';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './RepositoryPage.module.scss';
import Text from 'components/Text';
import LinkIcon from 'icons/LinkIcon';
import { ContributorType, RepositoryType } from 'App/types';
import StarIcon from 'icons/StarIcon';
import EyeIcon from 'icons/EyeIcon';
import ForkIcon from 'icons/ForkIcon';
import axios from 'axios';
import Contributor from 'App/pages/RepositoryPage/components/Contributor';
import CircleIcon from 'icons/CircleIcon';
import Languages from 'App/pages/RepositoryPage/components/Languages';
import Readme from 'App/pages/RepositoryPage/components/Readme';

type Props = {
  reps: RepositoryType[];
};

const RepositoryPage: React.FC<Props> = ({ reps }) => {
  const [contributors, setContributors] = useState<ContributorType[]>([]);

  let id = useParams().id;

  let index = Number(id);

  let currentRepo = reps[index];

  useEffect(() => {
    axios.get(currentRepo.contributors_url).then((res) => setContributors(res.data));
  }, []);

  return currentRepo ? (
    <div className={styles.repContainer}>
      <div className={styles.titleContainer}>
        <Link to={'/'}>
          <ArrowLeftIcon />
        </Link>
        <img className={styles.logo} src={currentRepo.owner.avatar_url} alt="avatar" />
        <Text className={styles.title} view="title">
          {currentRepo.name}
        </Text>
      </div>
      <div className={styles.repoInfo}>
        {currentRepo.homepage && (
          <a href={currentRepo.homepage} target="_blank" style={{ textDecoration: 'none' }}>
            <Text view="p-16" weight="bold" className={styles.link}>
              <LinkIcon className={styles.linkIcon} />
              {currentRepo.homepage.split('').splice(8, 30).join('')}
            </Text>
          </a>
        )}
        <div className={styles.topics}>
          {currentRepo.topics?.map((topic, i) => {
            return (
              <div key={i} className={styles.topic}>
                {topic}
              </div>
            );
          })}
        </div>
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
        <div className={styles.contributors_languages}>
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
          <Languages languages_url={currentRepo.languages_url} />
        </div>
      </div>
      <Readme repo={currentRepo} />
    </div>
  ) : (
    <div>Repository not found</div>
  );
};

export default RepositoryPage;
