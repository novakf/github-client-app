import React from 'react';
import styles from './Readme.module.scss';
import { Meta } from 'store/types';

type Props = {
  file: string;
  meta: Meta;
};

const Readme: React.FC<Props> = ({ file, meta }) => {
  let fileWithoutSvgLink = file.replace(/<svg.*<\/svg>/g, '').replace(/\n/g, '<br/>');

  return file ? (
    <div className={styles.readmeContainer}>
      <div className={styles.filename}>README.md</div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: fileWithoutSvgLink }}></div>
    </div>
  ) : (
    <div className={styles.noFile}>{meta !== Meta.loading && 'No readme found'}</div>
  );
};

export default Readme;
