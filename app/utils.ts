import axios from 'axios';
import config from '&/config.json';

export const axiosClient = axios.create({
    baseURL: config.api,
});
