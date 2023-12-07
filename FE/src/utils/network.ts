import axios from 'axios';
const { VITE_BASE_URL, DEV } = import.meta.env;

const baseURL = DEV ? '' : VITE_BASE_URL;

export const client = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
