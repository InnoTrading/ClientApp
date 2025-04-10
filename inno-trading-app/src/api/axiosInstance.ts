import axios from 'axios';

const instance = axios.create({
    baseURL:"https://localhost:5012",
    timeout: 10000,
    withCredentials: true,
});

export default instance;    