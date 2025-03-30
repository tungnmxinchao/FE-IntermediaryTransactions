import axios from 'axios';

const BASE_URL = 'https://localhost:7054';
const ODATA_URL = `${BASE_URL}/odata`;
const API_URL = `${BASE_URL}/api`;

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
}; 