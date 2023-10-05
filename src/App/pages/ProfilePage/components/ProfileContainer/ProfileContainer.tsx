import React from 'react';
import styles from './ProfileContainer.module.scss';
import { ProfileType } from 'App/types';
import LocationIcon from 'icons/LocationIcon';
import MailIcon from 'icons/MailIcon';

type Props = {
  profile: ProfileType;
};

const ProfileContainer: React.FC<Props> = ({ profile }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.avatarContainer}>
        <img className={styles.avatarImg} src={profile.avatar_url} />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.name}>{profile.name}</div>
        <div className={styles.login}>{profile.login}</div>
        <div className={styles.secondInfo}>
          {profile.location && (
            <div className={styles.info}>
              <LocationIcon />
              <div className={styles.text}>{profile.location}</div>
            </div>
          )}
          {profile.email && (
            <div className={styles.info}>
              <MailIcon />
              <div className={styles.text}>{profile.email}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
