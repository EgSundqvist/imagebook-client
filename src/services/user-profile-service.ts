import axios from 'axios';
import { getToken } from '../utils/localstorage';
import { User } from '../types/user';
import { Profile } from '../types/profile';


console.log('VITE_USER_API_URL:', import.meta.env.VITE_USER_API_URL);
const USER_API_URL = import.meta.env.VITE_USER_API_URL;

const axiosInstance = axios.create({
    baseURL: USER_API_URL,
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
        console.log('Response:', response);
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
    return axiosInstance.get<Profile>('/profiles/current-profile');
};

export const updateProfile = (profileData: Profile) => {
    return axiosInstance.put<{ message: string; profile: Profile }>('/profiles/current-profile', profileData);
};

export const fetchUserInfo = () => {
    return axiosInstance.get<User>('/users/current_user');
};

export const changePassword = (passwordData: { old_password: string; new_password: string }) => {
    return axiosInstance.put('/users/change_password', passwordData);
};