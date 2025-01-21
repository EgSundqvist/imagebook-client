import axios from 'axios';
import { getToken } from '../utils/localstorage'; // Importera getToken och removeToken
import { User } from '../types/user'; // Importera typen User
import { Profile } from '../types/profile'; // Importera typen Profile


/* console.log('VITE_USER_API_URL:', import.meta.env.VITE_USER_API_URL);
const API_URL = import.meta.env.VITE_USER_API_URL; */

const axiosInstance = axios.create({
    baseURL: "http://userapi.chickenkiller.com",
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
    }

);

export const registerUserAndProfile = (userData: Omit<User, 'id' | 'profile'> & { password: string } & Partial<Profile>) => {
    return axiosInstance.post('/register', userData);
};

export const loginUser = (credentials: { email: string; password: string }) => {
    return axiosInstance.post('/login', credentials);
};

export const fetchProfile = () => {
    return axiosInstance.get<Profile>('/profiles/current-profile'); // Uppdatera endpoint
};

export const updateProfile = (profileData: Profile) => {
    return axiosInstance.put<{ message: string; profile: Profile }>('/profiles/current-profile', profileData); // Uppdatera endpoint
};

export const fetchUserInfo = () => {
    return axiosInstance.get<User>('/users/current_user'); // Lägg till endpoint för att hämta användarens information
};

export const changePassword = (passwordData: { old_password: string; new_password: string }) => {
    return axiosInstance.put('/users/change_password', passwordData); // Lägg till endpoint för att ändra lösenord
};