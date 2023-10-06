import { ProfileType } from 'App/types';
import { observable, computed, makeObservable, action, runInAction } from 'mobx';
import GITHUB_API_TOKEN from 'App/constants';
import { Octokit } from 'octokit';
import axios from 'axios';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

type PrivateFields = '_info';

export default class ProfileStore {
  private _info: ProfileType | null = null;
  _url: string = '';

  constructor(url: string) {
    this._url = url;

    makeObservable<ProfileStore, PrivateFields>(this, {
      _info: observable.ref,
      info: computed,
      getProfile: action,
    });
  }

  get info(): ProfileType | null {
    return this._info;
  }

  async getProfile() {
    if (GITHUB_API_TOKEN) {
      const result = await octokit.request('GET {url}', {
        url: this._url,
      });
      runInAction(() => {
        this._info = result.data;
      });
    } else {
      await axios.get(this._url).then((res) => {
        this._info = res.data;
      });
    }
  }
}
