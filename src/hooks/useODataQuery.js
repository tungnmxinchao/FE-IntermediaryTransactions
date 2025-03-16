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
            // Get token from localStorage
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await queryFn(params, token);
            setData(response.items || []);
            setTotal(response.total || 0);
            setError(null);
        } catch (err) {
            // If it's a 404 error, treat it as no data rather than an error
            if (err.response?.status === 404) {
                setData([]);
                setTotal(0);
                setError(null);
            } else {
                setError(err.message || 'An error occurred while fetching data');
                setData([]);
                setTotal(0);
            }
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

export const usePublicODataQuery = (queryFn, initialParams = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [params, setParams] = useState(initialParams);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await queryFn(params);
            setData(response.items || []);
            setTotal(response.total || 0);
            setError(null);
        } catch (err) {
            // If it's a 404 error, treat it as no data rather than an error
            if (err.response?.status === 404) {
                setData([]);
                setTotal(0);
                setError(null);
            } else {
                setError(err.message || 'An error occurred while fetching data');
                setData([]);
                setTotal(0);
            }
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