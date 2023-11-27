import { client } from '../utils/network';

interface CreateQuestionData {
  title: string;
  content: string;
  tag: string;
  programmingLanguage: string;
  originalLink: string;
}

export const createQuestionAPI = async (data: CreateQuestionData) => {
  try {
    const res = await client.post('/api/questions', data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // 서버 응답이 있는 경우 (오류 상태 코드 처리)
      if (error.response.status === 400) {
        console.error('Bad Request:', error.response.data);
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
