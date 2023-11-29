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

export const getQuestionDetailContentData = async (questionId: number) => {
  try {
    const url = `/api/questions/${questionId}`;
    const { status, data } = await instance.get(url);
    if (status !== 200) {
      throw new Error();
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getQuestionAnswerListData = async (questionId: number) => {
  try {
    const url = `/api/answers/${questionId}`;
    const { data } = await instance.get(url);
    const { answers } = data;
    return answers;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404) {
        return null;
      }
    } else {
      console.error('Error from get answer list data:', error.message);
    }
    throw error;
  }
};

export const postAnswer = async (content: string) => {
  try {
    const url = '/api/answers';
    const { status, data } = await instance.post(url, {
      content,
      videoLink: 'https://localhost.com',
    });
    if (status !== 201) {
      throw new Error('답변 작성 실패');
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
