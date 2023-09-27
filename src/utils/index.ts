import { RepositoryType } from 'App/types';

export const contains = (firstArray: RepositoryType[], secondArray: RepositoryType[]) => {
  for (var i = 0; i < secondArray.length; i++) {
    if (firstArray.find((repo) => repo.id === secondArray[i].id)) return true;
  }
  return false;
};
