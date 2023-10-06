import axios from 'axios';
import { RepositoryType, ContributorType, ProfileType, Map } from 'App/types';
import { Octokit } from 'octokit';
import GITHUB_API_TOKEN from 'App/constants';

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

type DataType = React.Dispatch<Map> | React.Dispatch<ProfileType> | React.Dispatch<ContributorType[]>;

export const getData = async (url: string, setData: DataType) => {
  if (GITHUB_API_TOKEN) {
    const result = await octokit.request('GET {url}', {
      url: url,
    });
    setData(result.data);
  } else {
    axios.get(url).then((res) => setData(res.data));
  }
};

export const getReps = async (
  org: string,
  setReps: React.Dispatch<RepositoryType[]>,
  setError: React.Dispatch<string>,
) => {
  if (GITHUB_API_TOKEN)
    try {
      const result = await octokit.request('GET /orgs/{org}/repos', {
        org: org,
      });
      setError('');
      setReps(result.data);
    } catch (error: any) {
      setError(error.status);
    }
  else {
    let url = `https://api.github.com/orgs/${org}/repos`;
    axios
      .get(`${url}`)
      .then((res) => {
        setError('');
        setReps(res.data);
      })
      .catch((err) => {
        setReps([]);
        setError(err);
      });
  }
};

export const getReadme = async (owner: string, repo: string, setFile: React.Dispatch<any>) => {
  if (GITHUB_API_TOKEN) {
    const result = await octokit.request('GET /repos/{owner}/{repo}/readme', {
      owner: owner,
      repo: repo,
      headers: {
        accept: 'application/vnd.github.html',
      },
    });
    setFile(result.data);
  } else {
    let url = `https://api.github.com/repos/${owner}/${repo}/readme`;
    axios
      .get(url, {
        headers: {
          accept: 'application/vnd.github.html',
        },
      })
      .then((res) => setFile(res.data));
  }
};
