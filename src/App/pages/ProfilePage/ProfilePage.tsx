import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';
import { useLocalObservable, observer } from 'mobx-react-lite';
import ProfileStore from 'store/ProfileStore';
import { ProfileType } from 'App/types';
import ProfileContainer from './components/ProfileContainer';
import Repositories from './components/Repositories';
import { useParams } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const profileStore = useLocalObservable(() => new ProfileStore());
  let profile: ProfileType = profileStore.profile;

  document.body.style.background = 'white';

  let login = useParams().login;

  useEffect(() => {
    profileStore.getProfile(login);
    profile.repos_url && profileStore.getRepos(login !== 'api-testing-profile' ? profile.repos_url : '');
  }, [profileStore, profile.repos_url, login]);

  return (
    <div className={styles.wrapper}>
      <ProfileContainer profile={profile} />
      <Repositories repos={profileStore.repos} meta={profileStore.meta} />
    </div>
  );
};

export default observer(ProfilePage);
