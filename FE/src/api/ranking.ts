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

export const getUserRankingData = async (userId: string) => {
  try {
    const url = `/api/users/ranking/${userId}`;
    const { data } = await client.get(url);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
