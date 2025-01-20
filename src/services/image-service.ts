import axios from 'axios';
import { getToken } from '../utils/localstorage'; // Importera getToken
import { ImageData } from '../types/image'; // Importera typen ImageData

console.log('VITE_IMAGE_API_URL:', import.meta.env.VITE_IMAGE_API_URL);
const API_URL = import.meta.env.VITE_IMAGE_API_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Lägg till en interceptor för att inkludera JWT-token i Authorization-headern
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request:', config); // Logga request
    return config;
});

// Lägg till en interceptor för att hantera svar och kontrollera tokenens giltighet
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', response); // Logga response
        return response;
    },
    (error) => {
        console.log('Response Error:', error); // Logga response error
        return Promise.reject(error);
    }
);

export const getUploadUrl = (filename: string, description: string) => {
    return axiosInstance.post('/upload-url', { filename, description });
};

export const confirmUpload = (s3URL: string, description: string) => {
    return axiosInstance.post('/confirm-upload', { s3URL, description });
};

// Lägg till en ny funktion för att hämta en specifik bild
export const getImageById = (id: string) => {
    return axiosInstance.get<ImageData>(`/images/${id}`); // Använd typen ImageData
};

// Lägg till en ny funktion för att hämta bilder med paginering
export const fetchImagesPage = (pageParam: number) => {
    return axiosInstance.get<ImageData[]>(`/images/page/${pageParam}`); // Använd typen ImageData[]
};

// Lägg till nya funktioner för att hantera borttagning av bilder
export const getDeleteUrl = (id: string) => {
    return axiosInstance.post('/delete-url', { id });
};

export const confirmDelete = (id: string) => {
    return axiosInstance.post('/confirm-delete', { id });
};