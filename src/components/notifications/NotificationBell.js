import React, { useState, useCallback } from 'react';
import { FaBell, FaSearch, FaEye, FaEyeSlash, FaCheck, FaTimes, FaTimesCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PAGINATION_CONFIG } from '../../config/pagination.config';
import { API_CONFIG } from '../../config/api.config';
import { useODataQuery } from '../../hooks/useODataQuery';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import './NotificationBell.css';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewFilter, setViewFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const buildODataQuery = useCallback((params) => {
    let query = `${API_CONFIG.BASE_URL}/odata/Message?$expand=User`;
    const filters = [];

    // Add filters based on search params
    if (searchTerm) {
      filters.push(`contains(tolower(Subject), tolower('${searchTerm}'))`);
    }
    if (viewFilter !== 'all') {
      filters.push(`Seen eq ${viewFilter === 'viewed'}`);
    }
    if (readFilter !== 'all') {
      filters.push(`Read eq ${readFilter === 'read'}`);
    }

    // Filter by logged in user's ID
    const userId = localStorage.getItem('userId');
    if (userId) {
      filters.push(`UserId eq ${userId}`);
    }
    
    // Add pagination
    query += `&$skip=${(params.page - 1) * PAGINATION_CONFIG.NOTIFICATION_PAGE_SIZE}`;
    query += `&$top=${PAGINATION_CONFIG.NOTIFICATION_PAGE_SIZE}`;
    
    // Add count
    query += '&$count=true';

    // Add filters if any
    if (filters.length > 0) {
      query += `&$filter=${filters.join(' and ')}`;
    }

    // Add ordering
    query += '&$orderby=CreatedAt desc';
    
    return query;
  }, [searchTerm, viewFilter, readFilter]);

  const fetchNotifications = useCallback(async (params, token) => {
    const response = await fetch(buildODataQuery(params), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          items: [],
          total: 0
        };
      }
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    
    return {
      items: data.value.map(notification => ({
        id: notification.Id,
        title: notification.Subject,
        content: notification.Content,
        viewed: notification.Seen,
        read: notification.Read,
        date: notification.CreatedAt,
        level: notification.Level,
        openUrl: notification.OpenUrl
      })),
      total: data['@odata.count'] || 0
    };
  }, [buildODataQuery]);

  const {
    data: notifications,
    loading,
    error,
    total,
    params,
    updateParams,
    refetch
  } = useODataQuery(fetchNotifications, { page: 1 });

  const handleViewDetails = async (notification) => {
    setSelectedNotification(notification);
    
    // Mark as viewed and read
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      await fetch(`${API_CONFIG.BASE_URL}/odata/Message(${notification.id})`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          Seen: true,
          Read: true
        })
      });
      refetch();
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  const handleViewOrder = () => {
    if (selectedNotification?.openUrl) {
      window.location.href = selectedNotification.openUrl;
    }
  };

  const handlePageChange = (page) => {
    updateParams({ ...params, page });
  };

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch (error) {
      return dateString;
    }
  };

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    // Refetch notifications when opening the dropdown  
    if (!isOpen) {
      refetch();
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="notification-bell">
      <div className="notification-icon" onClick={handleBellClick}>
        <FaBell size={24} />
        {notifications?.some(n => !n.read) && <span className="notification-badge" />}
      </div>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Thông báo</h3>
            <div className="notification-filters">
              <div className="search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    updateParams({ ...params, page: 1 });
                  }}
                />
              </div>
              <div className="filter-buttons">
                <select 
                  value={viewFilter} 
                  onChange={(e) => {
                    setViewFilter(e.target.value);
                    updateParams({ ...params, page: 1 });
                  }}
                >
                  <option value="all">Tất cả trạng thái xem</option>
                  <option value="viewed">Đã xem</option>
                  <option value="unviewed">Chưa xem</option>
                </select>
                <select 
                  value={readFilter} 
                  onChange={(e) => {
                    setReadFilter(e.target.value);
                    updateParams({ ...params, page: 1 });
                  }}
                >
                  <option value="all">Tất cả trạng thái đọc</option>
                  <option value="read">Đã đọc</option>
                  <option value="unread">Chưa đọc</option>
                </select>
              </div>
            </div>
          </div>

          <div className="notification-list">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : notifications?.length === 0 ? (
              <div className="no-notifications">
                <p>Không có thông báo nào</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Ngày tạo</th>
                    <th>Đã xem</th>
                    <th>Đã đọc</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications?.map(notification => (
                    <tr key={notification.id}>
                      <td>#{notification.id}</td>
                      <td>{notification.title}</td>
                      <td>{formatDate(notification.date)}</td>
                      <td>
                        {notification.viewed ? (
                          <FaEye className="icon-viewed" />
                        ) : (
                          <FaEyeSlash className="icon-unviewed" />
                        )}
                      </td>
                      <td>
                        {notification.read ? (
                          <FaCheck className="icon-read" />
                        ) : (
                          <FaTimes className="icon-unread" />
                        )}
                      </td>
                      <td>
                        <button 
                          className="view-details-btn"
                          onClick={() => handleViewDetails(notification)}
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {total > PAGINATION_CONFIG.NOTIFICATION_PAGE_SIZE && (
            <div className="pagination">
              <button 
                className="page-button"
                onClick={() => handlePageChange(params.page - 1)}
                disabled={params.page === 1}
              >
                <FaChevronLeft />
              </button>
              <div className="page-numbers">
                {Array.from({ length: Math.ceil(total / PAGINATION_CONFIG.NOTIFICATION_PAGE_SIZE) }, (_, i) => i + 1)
                  .filter(page => {
                    const currentPage = params.page;
                    return page === 1 || 
                           page === Math.ceil(total / PAGINATION_CONFIG.NOTIFICATION_PAGE_SIZE) ||
                           Math.abs(currentPage - page) <= 2;
                  })
                  .map(page => (
                    <button
                      key={page}
                      className={`page-button ${params.page === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
              </div>
              <button 
                className="page-button"
                onClick={() => handlePageChange(params.page + 1)}
                disabled={params.page === Math.ceil(total / PAGINATION_CONFIG.NOTIFICATION_PAGE_SIZE)}
              >
                <FaChevronRight />
              </button>
            </div>
          )}

          {selectedNotification && (
            <div className="notification-modal">
              <div className="modal-content" data-level={selectedNotification.level || 'info'}>
                <button className="close-button" onClick={handleCloseModal}>
                  <FaTimesCircle />
                </button>
                <h3>{selectedNotification.title}</h3>
                <p>{selectedNotification.content}</p>
                <div className="modal-footer">
                  <span className="date">{formatDate(selectedNotification.date)}</span>
                  {selectedNotification.openUrl && (
                    <button className="view-order-btn" onClick={handleViewOrder}>
                      Chi tiết
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell; 