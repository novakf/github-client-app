import React from 'react';
import styles from './Readme.module.scss';

type Props = {
  file: string;
};

const Readme: React.FC<Props> = ({ file }) => {
  let fileWithoutSvgLink = file.replace(/<svg.*<\/svg>/g, '').replace(/\n/g, '<br/>');

  return (
    <div className={styles.readmeContainer}>
      <div className={styles.filename}>README.md</div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: fileWithoutSvgLink }}></div>
    </div>
  );
};

export default Readme;
