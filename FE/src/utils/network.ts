import AWS from 'aws-sdk';
import axios from 'axios';

const { VITE_BASE_URL, VITE_AWS_ACCESS_KEY_ID, VITE_AWS_SECRET_ACCESS_KEY } =
  import.meta.env;
// NCP
const endpoint = 'kr.object.ncloudstorage.com';
const region = 'kr-standard';

export const client = axios.create({
  baseURL: VITE_BASE_URL,
});

export const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: VITE_AWS_SECRET_ACCESS_KEY,
  },
});
