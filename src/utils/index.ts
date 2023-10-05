import { RepositoryType } from 'App/types';
import { LanguageColors } from 'App/types';

export const contains = (firstArray: RepositoryType[], secondArray: RepositoryType[]) => {
  for (var i = 0; i < secondArray.length; i++) {
    if (firstArray.find((repo) => repo.id === secondArray[i].id)) return true;
  }
  return false;
};

export const colorPicker = (language: string) => {
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
