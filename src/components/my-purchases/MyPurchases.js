import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { API_CONFIG } from '../../config/api.config';
import { PAGINATION_CONFIG } from '../../config/pagination.config';
import Pagination from '../common/Pagination';
import SearchBar from '../common/SearchBar';
import MyPurchasesTable from './MyPurchasesTable';
import { useODataQuery } from '../../hooks/useODataQuery';
import './MyPurchases.css';

const ITEMS_PER_PAGE = 9;

const MyPurchases = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ value: [], '@odata.count': 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = {
    page: parseInt(searchParams.get('page')) || 1,
    status: searchParams.get('status') || 'all'
  };

  const buildODataQuery = useCallback((params) => {
    let query = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ODATA.MY_PURCHASES}?$expand=CustomerUser,CreatedByUser`;
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

    // Filter by logged in user's ID as CustomerUser
    const userId = localStorage.getItem('userId');
    if (userId) {
      filters.push(`CustomerUser/Id eq ${userId}`);
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

  const getStatusText = (statusId) => {
    switch (statusId) {
      case 1:
        return "Sẵn sàng giao dịch";
      case 2:
        return "Bị hủy";
      case 3:
        return "Kiểm tra hàng1";
      case 4:
        return "Hoàn thành";
      case 5:
        return "Khiếu nại";
      case 6:
        return "Khiếu nại không sai";
      case 7:
        return "Yêu cầu admin";
      case 8:
        return "Chờ bên mua xác nhận";
      default:
        return "Không xác định";
    }
  };

  const fetchOrders = useCallback(async (params) => {
    const response = await fetch(buildODataQuery(params), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      return {
        items: [],
        total: 0
      };
    }

    const data = await response.json();
    
    return {
      items: data.value.map(order => ({
        id: order.Id,
        code: order.Id.substring(0, 8),
        topic: order.Title,
        description: order.Description,
        seller: order.CreatedByUser ? order.CreatedByUser.Username : "Chưa có người bán",
        method: order.Contact,
        price: order.MoneyValue,
        feeBearer: order.IsSellerChargeFee ? "Người bán" : "Người mua",
        fee: order.FeeOnSuccess,
        createdAt: order.CreatedAt,
        totalMoneyForBuyer: order.TotalMoneyForBuyer,
        sellerReceived: order.SellerReceivedOnSuccess,
        isPublic: order.IsPublic,
        status: getStatusText(order.StatusId),
        statusId: order.StatusId
      })),
      total: data['@odata.count'] || 0
    };
  }, [buildODataQuery]);

  const {
    data: transactions,
    loading: oDataLoading,
    error: oDataError,
    total,
    params: oDataParams,
    updateParams: updateODataParams
  } = useODataQuery(fetchOrders, { page: 1 });

  const handleSearch = useCallback((searchParams) => {
    updateODataParams({ ...searchParams, page: 1 });
  }, [updateODataParams]);

  const handlePageChange = useCallback((newPage) => {
    updateODataParams({ ...oDataParams, page: newPage });
  }, [updateODataParams, oDataParams]);

  if (oDataError) {
    return <div className="error-message">Error: {oDataError}</div>;
  }

  return (
    <div className="my-purchases">
      <div className="my-purchases-header">
        <div className="header-content">
          <h1>Đơn mua của tôi</h1>
          <p>Quản lý các giao dịch mua hàng của bạn</p>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} />

      {oDataLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          <MyPurchasesTable transactions={transactions} />
          <Pagination
            currentPage={oDataParams.page}
            totalItems={total}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default MyPurchases; 