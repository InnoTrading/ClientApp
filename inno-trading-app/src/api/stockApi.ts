import axios from './axiosInstance';

export const filterStocks = async (filter: string) => {
    
    try{
        const response = await axios.get(`/gateway/market-data/stocks`,
          { 
            params: {
                filter: filter,
            },
            headers: {'Content-Type': 'application/json'}
        });
        
        return response;
    }
    catch(error){
        console.error('Error occured during searching:', error);
        throw error;
    }
};

export const getStockInfo = async () => {
    
}