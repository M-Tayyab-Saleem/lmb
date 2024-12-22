import axios from 'axios';

const API_URL = "https://bookify-cfly.onrender.com";

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default axiosInstance;
