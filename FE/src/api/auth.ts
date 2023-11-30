import { SignupFetchData } from '../types/type';
import { client } from '../utils/network';

export const getUserIdVerified = async (userId: string) => {
  try {
    const url = `/api/users/check/${userId}`;
    const { status } = await client.get(url);
    return status === 200;
  } catch (error: any) {
    console.error('Error from Verify user Id');
    return false;
  }
};

export const postSignup = async (fetchBody: SignupFetchData) => {
  try {
    const url = '/api/users/register';
    const { status } = await client.post(url, fetchBody);
    return status === 201;
  } catch (error: any) {
    if (error.response.status === 409) {
      console.error('Error from Signup : User Id conflict');
      return false;
    }
    console.error('Error from Signup: Server Error');
    throw error;
  }
};
