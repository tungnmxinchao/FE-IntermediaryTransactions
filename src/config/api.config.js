export const API_CONFIG = {
    BASE_URL: 'https://localhost:7054/api',
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/Users/login',
            REGISTER: '/Users/register',
            REFRESH_TOKEN: '/Users/refresh-token',
        },
        TRANSACTIONS: {
            PUBLIC: '/Transactions/public',
            MY_SALES: '/Transactions/my-sales',
            MY_PURCHASES: '/Transactions/my-purchases',
        }
    }
}; 