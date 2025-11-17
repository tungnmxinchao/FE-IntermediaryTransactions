export const API_CONFIG = {
    BASE_URL: 'https://localhost:44316',
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/api/Users/login',
            REGISTER: '/api/Users/register'
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