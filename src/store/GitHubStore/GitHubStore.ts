import { RepositoryType } from 'App/types';
import { Meta } from './types';
import { observable, computed, makeObservable, action, runInAction } from 'mobx';
import { GITHUB_API_TOKEN } from 'App/constants';

import { Octokit } from 'octokit';
import axios from 'axios';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

const BASE_URL = 'https://api.github.com';

type PrivateFields = '_list' | '_meta';

export default class GitHubStore {
  private _list: RepositoryType[] = localStorage.getItem('reps')
    ? JSON.parse(localStorage.getItem('reps') as string)
    : [];

  private _meta: Meta = this._list.length === 0 ? Meta.initial : Meta.success;

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getRepos: action,
    });
  }

  get list(): RepositoryType[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRepos(org: string) {
    this._meta = Meta.loading;
    this._list = [];

    console.log(org);

    if (GITHUB_API_TOKEN)
      try {
        const result = await octokit.request('GET /orgs/{org}/repos', {
          org: org,
        });
        runInAction(() => {
          this._meta = Meta.success;
          this._list = result.data;
        });
      } catch (e) {
        runInAction(() => {
          this._meta = Meta.error;
        });
      }
    else {
      let url = `${BASE_URL}/orgs/${org}/repos`;
      await axios
        .get(`${url}`)
        .then((res) => {
          this._meta = Meta.success;
          this._list = res.data;
        })
        .catch(() => {
          this._meta = Meta.error;
          this._list = [];
        });
    }
  }
}
