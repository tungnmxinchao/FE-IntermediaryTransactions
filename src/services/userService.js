import axios from 'axios';
import { API_CONFIG } from '../config/api.config'; 

const ODATA_URL = `${API_CONFIG.BASE_URL}/odata`;
const API_URL = `${API_CONFIG.BASE_URL}/api`;

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const userService = {
  getUsers: async (params) => {
    try {
      const response = await axios.get(`${ODATA_URL}/Users`, {
        headers: getAuthHeader(),
        params: {
          $filter: params.filter,
          $orderby: params.orderby,
          $skip: params.skip,
          $top: params.top,
          $count: true,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/Users`, userData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(`${API_URL}/Users/${userId}/admin-update-user`, userData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}; 