import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_CONFIG } from '../config/api.config';
import { STORAGE_KEYS } from '../constants/storage.constants';

const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL
});

export const AuthService = {
    setTokens: (data) => {
        const { accessToken, refreshToken } = data;
        const decodedToken = jwtDecode(accessToken);
        
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        localStorage.setItem(STORAGE_KEYS.USER_ID, 
            decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
        localStorage.setItem(STORAGE_KEYS.USER_ROLE,
            decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        localStorage.setItem(STORAGE_KEYS.USER_NAME,
            decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
    },

    login: async (username, password) => {
        try {
            const response = await axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
                username,
                password
            });

            if (response.data.code === 200) {
                AuthService.setTokens(response.data.data);
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_ID);
        localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
        localStorage.removeItem(STORAGE_KEYS.USER_NAME);
    },

    isAuthenticated: () => {
        return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    },

    getAccessToken: () => {
        return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    },

    getUserInfo: () => {
        return {
            userId: localStorage.getItem(STORAGE_KEYS.USER_ID),
            userName: localStorage.getItem(STORAGE_KEYS.USER_NAME),
            userRole: localStorage.getItem(STORAGE_KEYS.USER_ROLE)
        };
    }
}; 