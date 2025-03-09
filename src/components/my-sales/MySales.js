import React, { useState, useCallback } from 'react';
import SearchBar from '../common/SearchBar';
import MySalesTable from './MySalesTable';
import AddTransactionModal from './AddTransactionModal';
import Pagination from '../common/Pagination';
import { useODataQuery } from '../../hooks/useODataQuery';
import { API_CONFIG } from '../../config/api.config';
import './MySales.css';

const ITEMS_PER_PAGE = 9;

const MySales = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const buildODataQuery = useCallback((params) => {
    let query = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ODATA.ORDER}?$expand=CustomerUser,CreatedByUser`;
    const filters = [];

    // Add filters based on search params
    if (params.topic) {
      filters.push(`contains(tolower(Title), tolower('${params.topic}'))`);
    }
    if (params.minPrice) {
      filters.push(`MoneyValue ge ${params.minPrice}`);
    }
    if (params.maxPrice) {
      filters.push(`MoneyValue le ${params.maxPrice}`);
    }
    if (params.feeBearer) {
      filters.push(`IsSellerChargeFee eq ${params.feeBearer === 'seller'}`);
    }
    if (params.buyer) {
      filters.push(`CustomerUser/Username ne null and contains(tolower(CustomerUser/Username), tolower('${params.buyer}'))`);
    }
    if (params.seller) {
      filters.push(`contains(tolower(CreatedByUser/Username), tolower('${params.seller}'))`);
    }
    if (params.createdAt) {
      const date = new Date(params.createdAt);
      filters.push(`date(CreatedAt) eq ${date.toISOString().split('T')[0]}`);
    }

    // Filter by logged in user's ID as CreatedByUser
    const userId = localStorage.getItem('userId');
    if (userId) {
      filters.push(`CreatedByUser/Id eq ${userId}`);
    }

    // Add pagination
    query += `&$skip=${(params.page - 1) * ITEMS_PER_PAGE}&$top=${ITEMS_PER_PAGE}`;
    
    // Add count
    query += '&$count=true';

    // Add filters if any
    if (filters.length > 0) {
      query += `&$filter=${filters.join(' and ')}`;
    }

    // Add ordering
    query += '&$orderby=CreatedAt desc';

    return query;
  }, []);

  const fetchOrders = useCallback(async (params) => {
    const response = await fetch(buildODataQuery(params), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const data = await response.json();
    
    return {
      items: data.value.map(order => ({
        id: order.Id,
        code: order.Id.substring(0, 8),
        topic: order.Title,
        description: order.Description,
        buyer: order.CustomerUser ? order.CustomerUser.Username : "Chưa có người mua",
        method: "Chuyển khoản",
        price: order.MoneyValue,
        feeBearer: order.IsSellerChargeFee ? "Người bán" : "Người mua",
        fee: order.FeeOnSuccess,
        createdAt: order.CreatedAt,
        totalMoneyForBuyer: order.TotalMoneyForBuyer,
        sellerReceived: order.SellerReceivedOnSuccess,
        isPublic: order.IsPublic,
        status: order.CustomerUser ? "Đã có người mua" : "Chưa có người mua"
      })),
      total: data['@odata.count'] || 0
    };
  }, [buildODataQuery]);

  const {
    data: transactions,
    loading,
    error,
    total,
    params,
    updateParams,
    refetch
  } = useODataQuery(fetchOrders, { page: 1 });

  const handleSearch = useCallback((searchParams) => {
    updateParams({ ...searchParams, page: 1 });
  }, [updateParams]);

  const handlePageChange = useCallback((newPage) => {
    updateParams({ ...params, page: newPage });
  }, [updateParams, params]);

  const handleAddNew = useCallback(() => {
    setShowAddModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowAddModal(false);
  }, []);

  const handleSubmitTransaction = useCallback(async (formData) => {
    try {
      const newOrderData = {
        Title: formData.topic,
        Description: formData.description || "",
        IsPublic: true,
        MoneyValue: Number(formData.price),
        IsSellerChargeFee: formData.feeBearer === 'seller',
        FeeOnSuccess: Number(formData.price) * 0.01, // 1% fee
      };

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ODATA.ORDER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newOrderData),
      });
      
      if (response.ok) {
        refetch();
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  }, [refetch]);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="my-sales">
      <div className="my-sales-header">
        <div className="header-content">
          <h1>Đơn bán của tôi</h1>
          <p>Quản lý các giao dịch bán hàng của bạn</p>
        </div>
        <button className="add-new-button" onClick={handleAddNew}>
          + Thêm mới
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          <MySalesTable transactions={transactions} />
          <Pagination
            currentPage={params.page}
            totalItems={total}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {showAddModal && (
        <AddTransactionModal
          onClose={handleCloseModal}
          onSubmit={handleSubmitTransaction}
        />
      )}
    </div>
  );
};

export default MySales; 