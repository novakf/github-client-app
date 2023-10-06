import CryptoJS from 'crypto-js';

const getToken = () => {
  let decoded = 'U2FsdGVkX1+Apct6WKtvwpp5wD+ADOEkS+mSUtayl5zuj3tFobn43n7i/dQmn2vItLg1MBI2AQfyoAcOsiSiUw==';
  let bytes = CryptoJS.AES.decrypt(decoded, 'jhonsnow');
  let GITHUB_API_TOKEN = bytes.toString(CryptoJS.enc.Utf8);
  return GITHUB_API_TOKEN;
};

export default getToken();
