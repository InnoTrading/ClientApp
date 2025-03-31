import axios from './axiosInstance';
import { getAccessToken } from '@auth0/nextjs-auth0';

export const depositMoney = async (amount: string) => {
  try {
    const accessToken = getAccessToken();

    const response = await axios.post(
      `/gateway/Accounts/deposits`,
      {},
      {
        params: { amount },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error occured during deposit:', error);
    throw error;
  }
};
