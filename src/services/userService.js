import axios from 'axios';

const BASE_URL = 'https://localhost:7054/odata';

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const userService = {
  getUsers: async (params) => {
    try {
      const response = await axios.get(`${BASE_URL}/Users`, {
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
}; 