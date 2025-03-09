import { useState, useEffect } from 'react';

export const useODataQuery = (queryFn, initialParams = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [params, setParams] = useState(initialParams);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await queryFn(params);
                setData(response.items);
                setTotal(response.total);
                setError(null);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [queryFn, params]);

    const updateParams = (newParams) => {
        setParams(prev => ({ ...prev, ...newParams }));
    };

    return {
        data,
        loading,
        error,
        total,
        params,
        updateParams
    };
}; 