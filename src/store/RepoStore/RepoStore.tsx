import { Meta } from '../types';
import { observable, computed, makeObservable, action, runInAction } from 'mobx';
import GITHUB_API_TOKEN from 'App/constants';

import { Octokit } from 'octokit';
import axios from 'axios';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

const BASE_URL = 'https://api.github.com';

type PrivateFields = '_repo' | '_meta';

export default class RepoStore {
  private _repo: any = {};
  private _meta: Meta = Meta.success;

  constructor() {
    makeObservable<RepoStore, PrivateFields>(this, {
      _repo: observable.ref,
      _meta: observable,
      repo: computed,
      meta: computed,
      getRepo: action,
    });
  }

  get repo() {
    return this._repo;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRepo(owner: string, repoName: string) {
    this._meta = Meta.loading;

    if (GITHUB_API_TOKEN)
      try {
        const result = await octokit.request('GET /repos/{owner}/{repoName}', {
          owner: owner,
          repoName: repoName,
        });
        runInAction(() => {
          this._meta = Meta.success;
          this._repo = result.data;
        });
      } catch (e) {
        runInAction(() => {
          this._meta = Meta.error;
        });
      }
    else {
      let url = `${BASE_URL}/repos/${owner}/${repoName}`;
      await axios
        .get(`${url}`)
        .then((res) => {
          this._meta = Meta.success;
          this._repo = res.data;
        })
        .catch(() => {
          this._meta = Meta.error;
        });
    }
  }
}
