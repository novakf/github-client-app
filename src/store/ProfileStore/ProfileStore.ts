import { Meta } from '../types';
import { observable, computed, makeObservable, action, runInAction } from 'mobx';
import { GITHUB_API_TOKEN } from 'App/constants';

import { Octokit } from 'octokit';
import axios from 'axios';
import { RepositoryType } from 'App/types';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

const BASE_URL = 'https://api.github.com';

type PrivateFields = '_repos' | '_profile' | '_meta' | '_delMeta';

export default class ProfileStore {
  private _profile: any = {};
  private _repos: any[] = [];
  private _meta: Meta = Meta.success;
  private _delMeta: Meta = Meta.success;

  constructor() {
    makeObservable<ProfileStore, PrivateFields>(this, {
      _profile: observable.ref,
      _repos: observable.ref,
      _meta: observable,
      _delMeta: observable,
      profile: computed,
      repos: computed,
      meta: computed,
      delMeta: computed,
      getRepos: action,
      getProfile: action,
      createRepo: action,
      deleteRepo: action,
    });
  }

  get profile() {
    return this._profile;
  }

  get repos() {
    return this._repos;
  }

  get meta(): Meta {
    return this._meta;
  }

  get delMeta(): Meta {
    return this._delMeta;
  }

  async getProfile(login?: string) {
    this._meta = Meta.loading;

    try {
      const result = await octokit.request('GET {url}', {
        url: login ? `/users/${login}` : '/user',
      });
      runInAction(() => {
        this._profile = result.data;
      });
    } catch (e) {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  }

  async getRepos(url?: string) {
    this._meta = Meta.loading;

    const result = await octokit.request('GET {url}', {
      url: url ? url : '/user/repos',
      visibility: 'all',
    });
    runInAction(() => {
      this._meta = Meta.success;
      this._repos = result.data;
    });
  }

  async createRepo(repoName: string, privateRepo: boolean, description?: string, readme?: boolean) {
    this._meta = Meta.loading;
    await octokit.request('POST /user/repos', {
      name: repoName,
      description: description,
      homepage: 'https://github.com',
      private: privateRepo,
      auto_init: readme,
      is_template: true,
    });

    runInAction(() => {
      window.location.href = `/profile/api-testing-profile`;
      this._meta = Meta.success;
    });
  }

  async deleteRepo(owner: string, repoName: string) {
    this._delMeta = Meta.loading;
    await octokit.request('DELETE /repos/{owner}/{repo}', {
      owner: owner,
      repo: repoName,
    });

    runInAction(() => {
      this._delMeta = Meta.success;
      location.reload();
    });
  }
}
