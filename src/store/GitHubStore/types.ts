export enum Meta {
  initial = 'initial',
  loading = 'loading',
  error = 'error',
  success = 'success',
}

export interface IGitHubStore {
  getRepos(owner: string): Promise<void>;
}
