import React, { useEffect, useState } from 'react';
import { GITHUB_API_TOKEN } from 'App/constants';
import { Octokit } from 'octokit';
import { RepositoryType } from 'App/types';
import styles from './Readme.module.scss';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

const getReadme = async (owner: string, repo: string, setFile: (val: any) => void) => {
  const result = await octokit.request('GET /repos/{owner}/{repo}/readme', {
    owner: owner,
    repo: repo,
    headers: {
      accept: 'application/vnd.github.html',
    },
  });

  setFile(result.data);
};

type Props = {
  repo: RepositoryType;
};

const Readme: React.FC<Props> = ({ repo }) => {
  const [file, setFile] = useState('');
  useEffect(() => {
    getReadme(repo.owner.login, repo.name, setFile);
  }, []);

  return (
    <div className={styles.readmeContainer}>
      <div className={styles.filename}>README.MD</div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: file }}></div>;
    </div>
  );
};

export default Readme;
