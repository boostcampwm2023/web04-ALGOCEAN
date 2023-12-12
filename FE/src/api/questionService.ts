import { GetQuestionListOptions as Options, QuestionData } from '../types/type';
import { client } from '../utils/network';

export const getQuestionList = async (options: Options) => {
  try {
    const queryString = Object.keys(options)
      .map((option) => `${option}=${options[option] as string}`)
      .join('&');
    const url = `/api/questions/lists/?${queryString}`;
    const { status, data } = await client.get(url);
    if (status !== 200) {
      throw new Error();
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getQuestionDetailContentData = async (questionId: string) => {
  try {
    const url = `/api/questions/${questionId}`;
    const { status, data } = await client.get(url);
    if (status !== 200) {
      throw new Error();
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getQuestionAnswerListData = async (questionId: string) => {
  try {
    const url = `/api/answers/${questionId}`;
    const { data } = await client.get(url);
    const { answers } = data;
    return answers.map((answer: unknown) => {
      return { cardData: answer };
    });
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

export const postAnswer = async (content: string, questionId: string) => {
  try {
    const url = '/api/answers';
    const { status, data } = await client.post(url, {
      questionId: Number(questionId),
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

export const createQuestionAPI = async (data: QuestionData) => {
  return await client.post('/api/questions', data);
};

export const postDraftQuestionAPI = async () => {
  try {
    const res = await client.post('/api/questions/drafts');
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // 서버 응답이 있는 경우 (오류 상태 코드 처리)
      if (error.response.status === 500) {
        console.error('Internal Server Error:', error.response.data);
      } else {
        console.error('Server Error:', error.response.data);
      }
    } else {
      // 서버 응답이 없는 경우 (네트워크 오류 등)
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};

export const putDraftQuestionAPI = async (data: QuestionData) => {
  try {
    const res = await client.put(`/api/questions/drafts/${data.draftId}`, {
      title: data.title,
      content: data.content,
      tag: data.tag,
      programmingLanguage: data.programmingLanguage,
      originalLink: data.originalLink,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // 서버 응답이 있는 경우 (오류 상태 코드 처리)
      console.error('Server Error:', error.response.data);
    } else {
      // 서버 응답이 없는 경우 (네트워크 오류 등)
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};

export const getTodayQuestionAPI = async () => {
  try {
    const res = await client.get('/api/questions/today');
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // 서버 응답이 있는 경우 (오류 상태 코드 처리)
      console.error('Server Error:', error.response.data);
    } else {
      // 서버 응답이 없는 경우 (네트워크 오류 등)
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};

export const getRandomQuestionAPI = async () => {
  try {
    const res = await client.get('/api/questions/random');
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // 서버 응답이 있는 경우 (오류 상태 코드 처리)
      console.error('Server Error:', error.response.data);
    } else {
      // 서버 응답이 없는 경우 (네트워크 오류 등)
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};

export const getTrendingQuestionAPI = async () => {
  try {
    const res = await client.get('/api/questions/trending');
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // 현재 404 에러가 뜨면 dummy 데이터 보내주도록 처리.
      if (error.response.status === 404) {
        return {
          id: 86279,
          title: '다익스트라 알고리즘의 정당성이 궁금해요',
        };
      }
      // 서버 응답이 있는 경우 (오류 상태 코드 처리)
      console.error('Server Error:', error.response.data);
    } else {
      // 서버 응답이 없는 경우 (네트워크 오류 등)
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};
