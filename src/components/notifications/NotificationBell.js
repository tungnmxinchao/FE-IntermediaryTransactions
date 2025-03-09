import React, { useState } from 'react';
import { FaBell, FaSearch, FaEye, FaEyeSlash, FaCheck, FaTimes, FaTimesCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './NotificationBell.css';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewFilter, setViewFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample data - replace with actual data from API
  const notifications = [
    {
      id: 1,
      title: 'Đơn hàng mới #1234 - Thanh toán đã được xác nhận và đang trong quá trình xử lý vận chuyển',
      content: 'Đơn hàng #1234 của bạn đã được thanh toán thành công. Chúng tôi đang xử lý vận chuyển và sẽ cập nhật trạng thái sớm nhất có thể.',
      viewed: true,
      read: true,
      date: '2024-03-07 10:30',
      orderId: '1234'
    },
    {
      id: 2,
      title: 'Thanh toán đã hoàn tất #5678 - Số tiền 15,000,000 VND đã được chuyển vào tài khoản của bạn',
      content: 'Số tiền 15,000,000 VND từ đơn hàng #5678 đã được chuyển vào tài khoản của bạn. Vui lòng kiểm tra số dư.',
      viewed: false,
      read: false,
      date: '2024-03-07 09:15',
      orderId: '5678'
    },
    {
      id: 3,
      title: 'Yêu cầu hủy đơn #9012 - Khách hàng đã yêu cầu hủy đơn hàng và đang chờ xác nhận từ phía bạn',
      content: 'Khách hàng đã yêu cầu hủy đơn hàng #9012. Vui lòng xem xét và phản hồi yêu cầu này trong vòng 24h.',
      viewed: true,
      read: false,
      date: '2024-03-07 08:45',
      orderId: '9012'
    },
    {
      id: 4,
      title: 'Đánh giá mới #3456 - Khách hàng đã để lại đánh giá 5 sao cho đơn hàng của bạn',
      content: 'Khách hàng đã để lại đánh giá 5 sao cho đơn hàng #3456 của bạn. Cảm ơn bạn đã cung cấp dịch vụ chất lượng.',
      viewed: false,
      read: true,
      date: '2024-03-07 07:30',
      orderId: '3456'
    },
    {
      id: 5,
      title: 'Cập nhật trạng thái đơn hàng #7890 - Đơn hàng đã được giao thành công và đang chờ xác nhận từ người nhận',
      content: 'Đơn hàng #7890 đã được giao thành công. Đang chờ xác nhận từ người nhận. Vui lòng theo dõi trạng thái đơn hàng.',
      viewed: false,
      read: false,
      date: '2024-03-07 06:15',
      orderId: '7890'
    },
    {
      id: 6,
      title: 'Thông báo mới về chính sách bảo hành - Cập nhật quy trình bảo hành sản phẩm',
      content: 'Chúng tôi đã cập nhật quy trình bảo hành sản phẩm. Vui lòng xem chi tiết trong phần chính sách.',
      viewed: false,
      read: false,
      date: '2024-03-07 05:30',
      orderId: null
    },
    {
      id: 7,
      title: 'Đơn hàng #1111 - Yêu cầu hoàn tiền đã được chấp nhận',
      content: 'Yêu cầu hoàn tiền cho đơn hàng #1111 đã được chấp nhận. Số tiền sẽ được chuyển vào tài khoản của bạn trong vòng 24h.',
      viewed: true,
      read: true,
      date: '2024-03-07 04:45',
      orderId: '1111'
    },
    {
      id: 8,
      title: 'Cập nhật thông tin cá nhân - Vui lòng kiểm tra và cập nhật thông tin của bạn',
      content: 'Chúng tôi cần bạn cập nhật một số thông tin cá nhân để đảm bảo quá trình giao dịch được suôn sẻ.',
      viewed: false,
      read: false,
      date: '2024-03-07 03:15',
      orderId: null
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesView = viewFilter === 'all' || 
      (viewFilter === 'viewed' && notification.viewed) ||
      (viewFilter === 'unviewed' && !notification.viewed);
    const matchesRead = readFilter === 'all' ||
      (readFilter === 'read' && notification.read) ||
      (readFilter === 'unread' && !notification.read);
    
    return matchesSearch && matchesView && matchesRead;
  });

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetails = (notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  const handleViewOrder = () => {
    if (selectedNotification.orderId) {
      window.location.href = `/transaction/${selectedNotification.orderId}`;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="notification-bell">
      <div className="notification-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaBell size={24} />
        <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
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
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                />
              </div>
              <div className="filter-buttons">
                <select 
                  value={viewFilter} 
                  onChange={(e) => {
                    setViewFilter(e.target.value);
                    setCurrentPage(1); // Reset to first page when filtering
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
                    setCurrentPage(1); // Reset to first page when filtering
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
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tiêu đề</th>
                  <th>Đã xem</th>
                  <th>Đã đọc</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {paginatedNotifications.map(notification => (
                  <tr key={notification.id}>
                    <td>#{notification.id}</td>
                    <td>{notification.title}</td>
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
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`page-button ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button 
                className="page-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      )}

      {selectedNotification && (
        <div className="notification-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Chi tiết thông báo</h2>
              <button className="close-button" onClick={handleCloseModal}>
                <FaTimesCircle />
              </button>
            </div>
            <div className="modal-body">
              <div className="notification-detail">
                <h3>Tiêu đề</h3>
                <p>{selectedNotification.title}</p>
              </div>
              <div className="notification-detail">
                <h3>Nội dung</h3>
                <p>{selectedNotification.content}</p>
              </div>
              <div className="notification-detail">
                <h3>Thời gian</h3>
                <p>{selectedNotification.date}</p>
              </div>
            </div>
            <div className="modal-footer">
              {selectedNotification.orderId && (
                <button className="view-order-btn" onClick={handleViewOrder}>
                  Xem chi tiết đơn hàng #{selectedNotification.orderId}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell; 