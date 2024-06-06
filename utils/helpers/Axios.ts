import axios from 'axios';
import { NAPI_URL } from '@util/CONSTS';

export const axiosClient = axios.create({
    baseURL: NAPI_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
