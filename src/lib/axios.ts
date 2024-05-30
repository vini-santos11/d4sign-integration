import axios from "axios";
import 'dotenv/config';

const baseUrl = process.env.API_URL || '';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})