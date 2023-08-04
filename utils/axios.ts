import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: process.env.NAPI_URL,
});
