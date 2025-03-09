import React from 'react';
import { Link } from 'react-router-dom';
import { OrderService } from '../../services/order.service';
import { useODataQuery } from '../../hooks/useODataQuery';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import Pagination from '../common/Pagination';
import './PublicMarket.css';

const ITEMS_PER_PAGE = 9;

const PublicMarket = () => {
    const {
        data: orders,
        loading,
        error,
        total,
        params,
        updateParams
    } = useODataQuery(OrderService.getOrders, {
        top: ITEMS_PER_PAGE,
        skip: 0,
        filter: 'IsPublic eq true AND Updateable eq true',
        orderby: 'CreatedAt desc'
    });

    const formatDate = (dateString) => {
        try {
            return format(parseISO(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
        } catch (error) {
            return dateString;
        }
    };

    const handlePageChange = (pageNumber) => {
        updateParams({ skip: (pageNumber - 1) * ITEMS_PER_PAGE });
    };

    const currentPage = Math.floor(params.skip / ITEMS_PER_PAGE) + 1;

    if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="public-market">
            <h1>Chợ Công Khai</h1>
            
            <div className="orders-grid">
                {orders.map(order => (
                    <div key={order.Id} className="order-card">
                        <div className="order-header">
                            <h2>{order.Title}</h2>
                            <span className="price">{order.MoneyValue.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                        
                        <div className="order-content">
                            <p>{order.Description}</p>
                            <div className="order-details">
                                <span>Phí giao dịch: {order.FeeOnSuccess.toLocaleString('vi-VN')} VNĐ</span>
                                <span>Người bán nhận: {order.SellerReceivedOnSuccess.toLocaleString('vi-VN')} VNĐ</span>
                            </div>
                            
                            <div className="order-footer">
                                <div className="seller-info">
                                    <span>Người bán: {order.CreatedByUser.Username}</span>
                                    <span>Ngày tạo: {formatDate(order.CreatedAt)}</span>
                                </div>
                                <Link to={`/transaction/${order.Id}`} className="view-detail-btn">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalItems={total}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PublicMarket; 