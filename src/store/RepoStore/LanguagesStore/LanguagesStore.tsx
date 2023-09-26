import { Map } from 'App/types';
import { observable, computed, makeObservable, action, runInAction } from 'mobx';
import { GITHUB_API_TOKEN } from 'App/constants';
import { Octokit } from 'octokit';
import axios from 'axios';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

type PrivateFields = '_list';

export default class LanguagesStore {
  private _list: Map = {};

  constructor() {
    makeObservable<LanguagesStore, PrivateFields>(this, {
      _list: observable.ref,
      list: computed,
      getLanguages: action,
    });
  }

  get list(): Map {
    return this._list;
  }

  async getLanguages(url: string) {
    this._list = {};

    if (GITHUB_API_TOKEN) {
      const result = await octokit.request('GET {url}', {
        url: url,
      });
      runInAction(() => {
        this._list = result.data;
      });
    } else {
      await axios.get(url).then((res) => {
        this._list = res.data;
      });
    }
  }
}
