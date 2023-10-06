import { ContributorType } from 'App/types';
import { observable, computed, makeObservable, action, runInAction } from 'mobx';
import GITHUB_API_TOKEN from 'App/constants';
import { Octokit } from 'octokit';
import axios from 'axios';
import { Meta } from '../../types';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

type PrivateFields = '_list' | '_meta';

export default class ContributorsStore {
  private _list: ContributorType[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ContributorsStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getContributors: action,
    });
  }

  get list(): ContributorType[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getContributors(contributorsUrl: string) {
    this._meta = Meta.loading;
    this._list = [];

    if (GITHUB_API_TOKEN) {
      const result = await octokit.request('GET {url}', {
        url: contributorsUrl,
      });
      runInAction(() => {
        this._meta = Meta.success;
        this._list = result.data;
      });
    } else {
      await axios.get(contributorsUrl).then((res) => {
        this._meta = Meta.success;
        this._list = res.data;
      });
    }
  }
}
