import CryptoJS from 'crypto-js';

const getToken = () => {
  let decoded = 'ENCYPTED_TOKEN';
  let bytes = CryptoJS.AES.decrypt(decoded, 'KEY');
  let GITHUB_API_TOKEN = bytes.toString(CryptoJS.enc.Utf8);
  return GITHUB_API_TOKEN;
};

export default getToken();
