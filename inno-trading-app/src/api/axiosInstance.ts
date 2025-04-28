import axios from 'axios';

const instance = axios.create({
    baseURL:"https://localhost:5012",
    timeout: 5000,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default instance;