import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OrderService } from '../../services/order.service';
import { usePublicODataQuery } from '../../hooks/useODataQuery';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import Pagination from '../common/Pagination';
import './PublicMarket.css';
import { API_CONFIG } from '../../config/api.config';

const ITEMS_PER_PAGE = 9;

const PublicMarket = () => {
    const {
        data: orders,
        loading,
        error,
        total,
        params,
        updateParams
    } = usePublicODataQuery(OrderService.getPublicOrders, {
        top: ITEMS_PER_PAGE,
        skip: 0,
        filter: 'IsPublic eq true AND Updateable eq true',
        orderby: 'CreatedAt desc'
    });

    const [searchName, setSearchName] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    // Load category tree
    useEffect(() => {
        fetch(`${API_CONFIG.BASE_URL}/api/Category/tree`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    // Filter orders based on search, price, category
    useEffect(() => {
        if (!orders) return;

        const min = priceMin ? Number(priceMin) : 0;
        const max = priceMax ? Number(priceMax) : Infinity;

        const filtered = orders.filter(order => {
            const matchName = order.Title.toLowerCase().includes(searchName.toLowerCase());
            const matchPrice = order.MoneyValue >= min && order.MoneyValue <= max;
            const matchCategory = selectedCategoryId
                ? order.CategoryId === Number(selectedCategoryId)
                : true;

            return matchName && matchPrice && matchCategory;
        });

        setFilteredOrders(filtered);
    }, [orders, searchName, priceMin, priceMax, selectedCategoryId]);

    // Format date
    const formatDate = (dateString) => {
        try {
            return format(parseISO(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
        } catch (error) {
            return dateString;
        }
    };

    // Handle pagination
    const handlePageChange = (pageNumber) => {
        updateParams({ skip: (pageNumber - 1) * ITEMS_PER_PAGE });
    };

    const currentPage = Math.floor(params.skip / ITEMS_PER_PAGE) + 1;

    // Render category dropdown recursively
    // Level 0 (cha) luôn in đậm, disabled
    const renderCategoryOptions = (categories, level = 0) => {
        return categories.flatMap(cat => {
            const indent = '\u00A0'.repeat(level * 4);
            const isParent = level === 0; // mọi category cấp 0 coi là cha

            const option = (
                <option key={cat.id} value={isParent ? '' : cat.id} disabled={isParent}>
                    {isParent ? `* ${cat.name}` : `${indent}${cat.name}`}
                </option>
            );

            const childrenOptions = cat.children?.length
                ? renderCategoryOptions(cat.children, level + 1)
                : [];

            return [option, ...childrenOptions];
        });
    };

    if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="public-market">
            <h1>Chợ Công Khai</h1>

            {/* Search & Filters */}
            <div className="search-filters">
                <input
                    type="text"
                    placeholder="Tìm theo tên..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Giá từ"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    min="0"
                />
                <input
                    type="number"
                    placeholder="Giá đến"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    min="0"
                />
                <select
                    value={selectedCategoryId || ''}
                    onChange={(e) => setSelectedCategoryId(e.target.value || null)}
                >
                    <option value="">Chọn danh mục</option>
                    {renderCategoryOptions(categories)}
                </select>
            </div>

            {/* Orders Grid */}
            <div className="orders-grid">
                {filteredOrders.length === 0 && <p>Không có giao dịch nào phù hợp.</p>}
                {filteredOrders.map(order => (
                    <div key={order.Id} className="order-card">
                        <div className="order-header">
                            <h2>{order.Title}</h2>
                            <span className="price">{order.MoneyValue.toLocaleString('vi-VN')} VNĐ</span>
                        </div>

                        <div className="order-content">
                            <p>Bên chịu phí: {order.IsSellerChargeFee ? 'Người bán' : 'Người mua'}</p>
                            <div className="order-details">
                                <span>Phí giao dịch: {order.FeeOnSuccess.toLocaleString('vi-VN')} VNĐ</span>
                                <span>Người bán nhận: {order.SellerReceivedOnSuccess.toLocaleString('vi-VN')} VNĐ</span>
                            </div>

                            <div className="order-footer">
                                <div className="seller-info">
                                    <span>Người bán: {order.CreatedByUser?.Username || 'Chưa có người bán'}</span>
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

            {/* Pagination */}
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
