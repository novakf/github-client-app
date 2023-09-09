import React, { useEffect, useState } from 'react';
import styles from './Languages.module.scss';
import CircleIcon from 'icons/CircleIcon';
import { Map } from 'App/types';
import { getData } from 'App/model';

type Props = {
  languages_url: string;
};

const Languages: React.FC<Props> = ({ languages_url }) => {
  const [languages, setLanguages] = useState<Map>();

  useEffect(() => {
    getData(languages_url, setLanguages);
  }, []);

  let sum = 0;
  if (languages) sum = Object.values(languages).reduce((acc, curr) => acc + curr, 0);

  const colorPicker = (language: string) => {
    let color = '';
    if (language === 'JavaScript') color = '#F1E05A';
    if (language === 'TypeScript') color = '#3178C6';
    if (language === 'HTML') color = '#E34C26';
    if (language === 'CSS') color = '#563D7C';
    if (language === 'SCSS') color = '#C6538C';
    if (language === 'Python') color = '#3572A5';
    if (language === 'Jupiter Notebook') color = '#DA5B0B';
    if (!color) color = '#D9D9D9';

    return color;
  };

  return (
    languages && (
      <div className={styles.languagesContainer}>
        <div className={styles.title}>Languages</div>
        <div className={styles.bars}>
          {Object.keys(languages).map((language, i) => {
            return (
              <div
                key={i}
                className={styles.bar}
                style={{
                  width: `${Math.round((languages[language] / sum) * 271) - 2}px`,
                  backgroundColor: `${colorPicker(language)}`,
                  borderRadius: `${i === 0 && Object.keys(languages).length > 1 ? '6px 0 0 6px' : ''}
                    ${i === Object.keys(languages).length - 1 && Object.keys(languages).length > 1 ? '0 6px 6px 0' : ''}
                    ${Object.keys(languages).length === 1 ? '6px' : ''}`,
                }}
              ></div>
            );
          })}
        </div>
        <div className={styles.languages}>
          {Object.keys(languages).map((language, i) => {
            return (
              <div className={styles.row} key={i}>
                <CircleIcon fill={colorPicker(language)} className={styles.icon} />
                <div className={styles.language}>{language}</div>
                <div className={styles.percent}>{((languages[language] / sum) * 100).toFixed(1)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Languages;
