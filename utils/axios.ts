import axios from 'axios';
import { NAPI_URL } from '@util/config';

export const axiosClient = axios.create({
    baseURL: NAPI_URL,
});
