import axios from './axiosInstance';

export const depositMoney = async (amount: string) => {
    try {
      const response = await axios.post(`/gateway/Accounts/deposits`, {}, {
        params: { amount },
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {

      console.error('Error occured during deposit:', error);
      throw error;
    }
  };