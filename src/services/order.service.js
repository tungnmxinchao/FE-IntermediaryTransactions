import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import { AuthService } from './auth.service';

const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL
});

// Add interceptor to add auth token
axiosInstance.interceptors.request.use((config) => {
    const token = AuthService.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const OrderService = {
    getOrders: async (params = {}) => {
        const {
            skip = 0,
            top = 10,
            filter = '',
            orderby = 'CreatedAt desc',
            expand = 'CreatedByUser',
            search = ''
        } = params;

        let url = API_CONFIG.ENDPOINTS.ODATA.ORDER;
        const queryParams = [];

        if (expand) queryParams.push(`$expand=${expand}`);
        if (skip) queryParams.push(`$skip=${skip}`);
        if (top) queryParams.push(`$top=${top}`);
        if (filter) queryParams.push(`$filter=${filter}`);
        if (orderby) queryParams.push(`$orderby=${orderby}`);
        if (search) queryParams.push(`$search=${search}`);
        
        // Add count to get total number of records
        queryParams.push('$count=true');

        if (queryParams.length > 0) {
            url += '?' + queryParams.join('&');
        }

        try {
            const response = await axiosInstance.get(url);
            return {
                items: response.data.value,
                total: response.data['@odata.count'],
                nextLink: response.data['@odata.nextLink']
            };
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Add more methods for CRUD operations here
}; 