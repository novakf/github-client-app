import React, { useEffect, useState } from 'react';
import styles from './CreateRepo.module.scss';
import { observer, useLocalObservable } from 'mobx-react-lite';
import ProfileStore from 'store/ProfileStore';
import { ProfileType } from 'App/types';
import RepoIcon from 'icons/RepoIcon';
import PrivateIcon from 'icons/PrivateIcon';
import InfoIcon from 'icons/InfoIcon';
import BranchIcon from 'icons/BranchIcon';
import { Meta } from 'store/types';
import Loader from 'components/Loader';

const CreateRepoPage = () => {
  const profileStore = useLocalObservable(() => new ProfileStore());
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [privateRepo, setPrivateRepo] = useState(false);
  const [readme, setReadme] = useState(false);

  useEffect(() => {
    profileStore.getProfile();
  }, [profileStore]);

  let profile: ProfileType = profileStore.profile;

  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <div className={styles.mainTitle}>Create a new repository</div>
        <div className={styles.textSecondary}>
          A repository contains all project files, including the revision history.
        </div>
      </div>
      <div className={styles.help}>Required fields are marked with an asterisk (*).</div>
      <div className={styles.repoName}>
        <div className={styles.owner}>
          <div className={styles.nameTitle}>Owner *</div>
          <div className={styles.ownerContainer}>
            <div className={styles.avatarContainer}>
              <img src={profile.avatar_url} className={styles.avatar} />
            </div>
            <div>{profile.login}</div>
          </div>
        </div>
        <div className={styles.slash}>/</div>
        <div className={styles.name}>
          <div className={styles.nameTitle}>Repository name *</div>
          <input className={styles.input} type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
        </div>
      </div>
      <div className={styles.nameHelp}>Great repository names are short and memorable.</div>
      <div className={styles.nameTitle}>
        Description <span className={styles.optional}>(optional)</span>
      </div>
      <input
        className={styles.descriptionInput}
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className={styles.typeRadio}>
        <div className={styles.radioChoice}>
          <input
            type="radio"
            value="public"
            className={styles.checkbox}
            checked={!privateRepo}
            onChange={() => setPrivateRepo(false)}
          />
          <RepoIcon width="24" color="black" />
          <div className={styles.typeDescription}>
            <div className={styles.radioTitle}>Public</div>
            <div className={styles.helpDescription}>
              Anyone on the internet can see this repository. You choose who can commit.
            </div>
          </div>
        </div>
        <div className={styles.radioChoice}>
          <input
            type="radio"
            value="public"
            className={styles.checkbox}
            checked={privateRepo}
            onChange={() => setPrivateRepo(true)}
          />
          <PrivateIcon width="24" color="black" />
          <div className={styles.typeDescription}>
            <div className={styles.radioTitle}>Private</div>
            <div className={styles.helpDescription}>You choose who can see and commit to this repository.</div>
          </div>
        </div>
      </div>
      <div className={styles.readmeSection}>
        <div className={styles.nameTitle}>Initialize this repository with:</div>
        <div className={styles.readmeBox}>
          <input
            type="checkbox"
            className={styles.readmeCheckbox}
            checked={readme}
            onChange={() => setReadme(!readme)}
          />
          <div className={styles.typeDescription}>
            <div className={styles.radioTitle}>Add a README file</div>
            <div className={styles.helpDescription}>
              This is where you can write a long description for your project.{' '}
              <a
                target="_blank"
                href="https://docs.github.com/ru/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes"
                className={styles.link}
              >
                Learn more about READMEs.
              </a>
            </div>
          </div>
        </div>
      </div>

      {readme && (
        <div className={styles.textSecondary}>
          This will set
          <div className={styles.main}>
            <BranchIcon />
            main
          </div>
          as the default branch.
        </div>
      )}

      <div className={styles.result}>
        <InfoIcon />
        <div className={styles.textSecondary}>
          You are creating a {privateRepo ? 'Private' : 'Public'} repository in your personal account.
        </div>
      </div>
      <a
        className={styles.createButton}
        style={{ textDecoration: 'none' }}
        onClick={() => {
          profileStore.createRepo(repoName, privateRepo, description, readme);
        }}
      >
        Create repository
      </a>
    </div>
  );
};

export default observer(CreateRepoPage);
