import { RepositoryType } from 'App/types';
import { Meta } from '../types';
import { observable, computed, makeObservable, action, runInAction } from 'mobx';
import GITHUB_API_TOKEN from 'App/constants';

import { Octokit } from 'octokit';
import axios from 'axios';
import { contains } from 'utils/index';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

const BASE_URL = 'https://api.github.com';

type PrivateFields = '_list' | '_meta' | '_page';

export default class GitHubStore {
  private _list: RepositoryType[] = [];
  private _meta: Meta = Meta.initial;
  private _page: number = 1;
  private _end: boolean = false;

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _page: observable,
      _meta: observable,
      list: computed,
      page: computed,
      meta: computed,
      getRepos: action,
      incrementPage: action,
      resetStore: action,
    });
  }

  get list(): RepositoryType[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get page(): number {
    return this._page;
  }

  incrementPage() {
    if (this._meta !== Meta.loading) this._page++;
  }

  resetStore() {
    this._page = 1;
    this._list = [];
  }

  async getRepos(org: string, limit?: number) {
    if (this._end) return;

    this._meta = Meta.loading;

    if (GITHUB_API_TOKEN)
      try {
        const result = await octokit.request('GET /orgs/{org}/repos', {
          org: org,
          per_page: limit ? limit : 100,
          page: this._page,
        });
        runInAction(() => {
          this._meta = Meta.success;
          if (result.data.length === 0) {
            this._end = true;
          }

          if (!limit) {
            this._list = result.data;
            return;
          }

          if (contains(this._list, result.data)) return;
          else this._list = [...this._list, ...result.data];
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
