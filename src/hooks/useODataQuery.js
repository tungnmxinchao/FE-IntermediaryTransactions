import { useState, useEffect, useCallback } from 'react';

export const useODataQuery = (queryFn, initialParams = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [params, setParams] = useState(initialParams);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await queryFn(params);
            setData(response.items);
            setTotal(response.total);
            setError(null);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching data');
            setData([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, [queryFn, params]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const updateParams = useCallback((newParams) => {
        setParams(prev => ({ ...prev, ...newParams }));
    }, []);

    return {
        data,
        loading,
        error,
        total,
        params,
        updateParams,
        refetch: fetchData
    };
}; 