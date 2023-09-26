export interface IGitHubStore {
  getRepos(owner: string): Promise<void>;
}
