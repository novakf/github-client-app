export interface Map {
  [key: string]: number;
}

export type RepositoryType = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: OwnerType;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at?: string | null;
  updated_at?: string | null;
  pushed_at?: string | null;
  git_url?: string;
  ssh_url?: string;
  clone_url?: string;
  svn_url?: string;
  homepage?: string | null;
  size?: number;
  stargazers_count?: number;
  watchers_count?: number;
  language?: string | null;
  has_issues?: boolean;
  has_projects?: boolean;
  has_downloads?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  has_discussions?: boolean;
  forks_count?: number;
  mirror_url?: string | null;
  archived?: boolean;
  disabled?: boolean;
  open_issues_count?: number;
  license?: LicenceType | null;
  allow_forking?: boolean;
  is_template?: boolean;
  web_commit_signoff_required?: boolean;
  topics?: string[];
  visibility?: string;
  forks?: number;
  open_issues?: number;
  watchers?: number;
  default_branch?: string;
  permissions?: PermissionsType;
};

export type LicenceType = {
  key?: string;
  name?: string;
  spdx_id?: string;
  url?: string;
  node_id?: string;
};

export type OwnerType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

export type PermissionsType = {
  admin?: boolean;
  maintain?: boolean;
  push?: boolean;
  triage?: boolean;
  pull?: boolean;
};

export type ContributorType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
};

export type ProfileType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company?: null;
  blog: string;
  location?: null;
  email?: null;
  hireable?: null;
  bio?: null;
  twitter_username?: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export enum LanguageColors {
  JavaScript = '#F1E05A',
  TypeScript = '#3178C6',
  HTML = '#E34C26',
  CSS = '#563D7C',
  SCSS = '#C6538C',
  Python = '#3572A5',
  JupiterNotebook = '#DA5B0B',
  default = '#D9D9D9',
}

export type UserType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: any;
  company: any;
  blog: string;
  location: any;
  email: any;
  hireable: any;
  bio: any;
  twitter_username: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: Plan;
};

export type Plan = {
  name: string;
  space: number;
  collaborators: number;
  private_repos: number;
};
