import axios from 'axios';
import { getToken } from '../utils/localstorage';
import { ImageData } from '../types/image';

console.log('VITE_IMAGE_API_URL:', import.meta.env.VITE_IMAGE_API_URL);
const IMAGE_API_URL = import.meta.env.VITE_IMAGE_API_URL;

const axiosInstance = axios.create({
    baseURL: IMAGE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// interceptor för att inkludera JWT-token i Authorization-headern
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request:', config); // Logga request
    return config;
});


axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', response); // Logga response
        return response;
    },
    (error) => {
        console.log('Response Error:', error);
        return Promise.reject(error);
    }
);

export const getUploadUrl = (filename: string, description: string) => {
    return axiosInstance.post('/upload-url', { filename, description });
};

export const confirmUpload = (s3URL: string, description: string) => {
    return axiosInstance.post('/confirm-upload', { s3URL, description });
};

export const getImageById = (id: string) => {
    return axiosInstance.get<ImageData>(`/images/${id}`);
};

export const fetchImagesPage = (pageParam: number) => {
    return axiosInstance.get<ImageData[]>(`/images/page/${pageParam}`);
};

export const getDeleteUrl = (id: string) => {
    return axiosInstance.post('/delete-url', { id });
};

export const confirmDelete = (id: string) => {
    return axiosInstance.post('/confirm-delete', { id });
};