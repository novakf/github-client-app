import LanguagesStore from './LanguagesStore';
import ContributorsStore from './ContributorsStore';
import ReadmeStore from './ReadmeStore';

export default class RepoStore {
  contributorsStore;
  languagesStore;
  readmeStore;

  constructor(contrsUrl: string, langsUrl: string, readmeUrl: string) {
    this.contributorsStore = new ContributorsStore(contrsUrl);
    this.languagesStore = new LanguagesStore(langsUrl);
    this.readmeStore = new ReadmeStore(readmeUrl);
  }
}
