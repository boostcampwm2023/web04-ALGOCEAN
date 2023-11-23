import axios from 'axios';
const { VITE_BASE_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_BASE_URL,
});

export const getQuestionList = async (page: number) => {
  try {
    const url = `/api/questions/lists/${page}`;
    const { status, data } = await instance.get(url);
    if (status !== 200) {
      throw new Error();
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
