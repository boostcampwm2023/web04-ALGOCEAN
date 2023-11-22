import axios from 'axios';
const { VITE_BASE_URL } = import.meta.env;

export const getQuestionList = async (page: number) => {
  try {
    const url = `${VITE_BASE_URL}/api/questions/lists/${page}`;
    const { status, data } = await axios.get(url);
    if (status !== 200) {
      throw new Error();
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
