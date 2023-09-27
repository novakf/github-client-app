import { observable, computed, makeObservable, action, runInAction } from 'mobx';
import { GITHUB_API_TOKEN } from 'App/constants';
import { Octokit } from 'octokit';
import axios from 'axios';
import { Meta } from 'store/types';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

type PrivateFields = '_file' | '_meta';

export default class ReadmeStore {
  private _file: string = '';
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ReadmeStore, PrivateFields>(this, {
      _file: observable.ref,
      _meta: observable,
      file: computed,
      meta: computed,
      getReadme: action,
    });
  }

  get file(): string {
    return this._file;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getReadme(readmeUrl: string) {
    this._meta = Meta.loading;

    if (GITHUB_API_TOKEN) {
      try {
        const result = await octokit.request('GET {url}', {
          url: readmeUrl,
          headers: {
            accept: 'application/vnd.github.html',
          },
        });
        runInAction(() => {
          this._file = result.data.toString();
          this._meta = Meta.success;
        });
      } catch (e) {
        this._meta = Meta.error;
      }
    } else {
      let url = `https://api.github.com/${readmeUrl}`;
      axios
        .get(url, {
          headers: {
            accept: 'application/vnd.github.html',
          },
        })
        .then((res) => {
          this._file = res.data;
          this._meta = Meta.success;
          return;
        })
        .catch(() => {
          this._meta = Meta.error;
        });
    }
  }
}
