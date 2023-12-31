import React from 'react';
import styles from './Languages.module.scss';
import CircleIcon from 'icons/CircleIcon';
import { Map } from 'App/types';
import { LanguageColors } from 'App/types';

type Props = {
  languages: Map;
};

const Languages: React.FC<Props> = ({ languages }) => {
  let sum: number = 0;
  if (languages) sum = Object.values(languages).reduce((acc, curr) => acc + curr, 0);

  const colorPicker = (language: string) => {
    let color = '';
    if (language === 'JavaScript') color = LanguageColors.JavaScript;
    if (language === 'TypeScript') color = LanguageColors.TypeScript;
    if (language === 'HTML') color = LanguageColors.HTML;
    if (language === 'CSS') color = LanguageColors.CSS;
    if (language === 'SCSS') color = LanguageColors.SCSS;
    if (language === 'Python') color = LanguageColors.Python;
    if (language === 'Jupiter Notebook') color = LanguageColors.JupiterNotebook;
    if (!color) color = LanguageColors.default;

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
