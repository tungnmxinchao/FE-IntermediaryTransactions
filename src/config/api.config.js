export const API_CONFIG = {
    BASE_URL: 'https://localhost:7054',
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/api/Users/login',
            REGISTER: '/api/Users/register',
            REFRESH_TOKEN: '/api/Users/refresh-token',
        },
        ODATA: {
            ORDER: '/odata/Order',
            USER: '/odata/User',
            MY_ORDER: '/odata/MyOrder',
            MY_PURCHASES: '/odata/MyPurchase'
        },
        ORDER_USER: {
            CREATE_ORDER: '/api/Order'
        }
    }
}; 