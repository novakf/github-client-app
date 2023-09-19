import { observable, computed, makeObservable, action, runInAction } from 'mobx';
import { GITHUB_API_TOKEN } from 'App/constants';
import { Octokit } from 'octokit';
import axios from 'axios';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

type PrivateFields = '_file';

export default class ReadmeStore {
  private _file: string = '';
  _url: string = '';

  constructor(url: string) {
    this._url = url;

    makeObservable<ReadmeStore, PrivateFields>(this, {
      _file: observable.ref,
      file: computed,
      getReadme: action,
    });
  }

  get file(): string {
    return this._file;
  }

  async getReadme() {
    if (GITHUB_API_TOKEN) {
      const result = await octokit.request('GET {url}', {
        url: this._url,
        headers: {
          accept: 'application/vnd.github.html',
        },
      });
      runInAction(() => (this._file = result.data.toString()));
    } else {
      let url = `https://api.github.com/${this._url}`;
      axios
        .get(url, {
          headers: {
            accept: 'application/vnd.github.html',
          },
        })
        .then((res) => (this._file = res.data));
    }
  }
}
