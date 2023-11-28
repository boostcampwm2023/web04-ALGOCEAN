import axios from 'axios';
const { VITE_BASE_URL } = import.meta.env;

interface Options {
  page?: number;
  tag?: string;
  ProgrammingLanguage?: string;
  isAdopted?: 1 | 0;
  sortByCreatedAt?: 'desc' | 'asc';
  sortByViewCount?: 'desc' | 'asc';
  [key: string]: number | string | undefined;
}

const instance = axios.create({
  baseURL: VITE_BASE_URL,
});

export const getQuestionList = async (options: Options) => {
  try {
    const queryString = Object.keys(options)
      .map((option) => `${option}=${options[option] as string}`)
      .join('&');
    const url = `/api/questions/lists/?${queryString}`;
    const { status, data } = await instance.get(url);
    if (status !== 200) {
      throw new Error();
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
