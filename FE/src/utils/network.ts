import axios from 'axios';
const { VITE_BASE_URL, DEV } = import.meta.env;

const baseURL = DEV ? '' : VITE_BASE_URL;

export const client = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true,
});
