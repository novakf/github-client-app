import { ContributorType } from 'App/types';
import { observable, computed, makeObservable, action, runInAction } from 'mobx';
import { GITHUB_API_TOKEN } from 'App/constants';
import { Octokit } from 'octokit';
import axios from 'axios';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

type PrivateFields = '_list';

export default class ContributorsStore {
  private _list: ContributorType[] = [];
  _url: string = '';

  constructor(url: string) {
    this._url = url;

    makeObservable<ContributorsStore, PrivateFields>(this, {
      _list: observable.ref,
      list: computed,
      getContributors: action,
    });
  }

  get list(): ContributorType[] {
    return this._list;
  }

  async getContributors() {
    this._list = [];

    if (GITHUB_API_TOKEN) {
      const result = await octokit.request('GET {url}', {
        url: this._url,
      });
      runInAction(() => {
        this._list = result.data;
      });
    } else {
      await axios.get(this._url).then((res) => {
        this._list = res.data;
      });
    }
  }
}
