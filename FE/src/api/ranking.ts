import { client } from '../utils/network';

export const getRankingListData = async () => {
  try {
    const url = '/api/users/ranking/lists';
    const { data } = await client.get(url);
    return data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};
