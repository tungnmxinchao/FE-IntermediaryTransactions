import React, { useState } from 'react';
import { FaSearch, FaEye, FaFilter, FaTimes, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [status, setStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Sample data - replace with actual API data
  const transactions = [
    {
      id: 'TRX001',
      amount: 15000000,
      status: 'pending',
      type: 'subtract',
      note: 'Thanh toán đơn hàng #1234 - Đơn hàng mua sắm trực tuyến từ cửa hàng Thời trang ABC với các sản phẩm: Áo thun nam, Quần jean, Giày thể thao. Đơn hàng được giao đến địa chỉ: 123 Nguyễn Văn A, Quận 1, TP.HCM',
      createdAt: '2024-03-07 10:30',
      updatedAt: '2024-03-07 10:30',
      transactionStatus: 'success',
      message: 'Giao dịch đang được xử lý',
      orderId: '1234'
    },
    {
      id: 'TRX002',
      amount: 25000000,
      status: 'completed',
      type: 'add',
      note: 'Hoàn tiền đơn hàng #5678 - Đơn hàng bị hủy do khách hàng thay đổi địa chỉ giao hàng. Số tiền hoàn trả bao gồm: Giá trị đơn hàng: 23.000.000đ, Phí vận chuyển: 2.000.000đ. Thời gian hoàn tiền dự kiến: 3-5 ngày làm việc',
      createdAt: '2024-03-07 09:15',
      updatedAt: '2024-03-07 09:30',
      transactionStatus: 'success',
      message: 'Giao dịch hoàn tất',
      orderId: '5678'
    },
    {
      id: 'TRX003',
      amount: 8000000,
      status: 'pending',
      type: 'subtract',
      note: 'Thanh toán đơn hàng #9012 - Đơn hàng mua sắm từ cửa hàng Điện tử XYZ với các sản phẩm: Tai nghe Bluetooth, Sạc dự phòng 10000mAh. Đơn hàng được giao đến địa chỉ: 456 Lê Văn B, Quận 3, TP.HCM. Phương thức thanh toán: Thẻ tín dụng',
      createdAt: '2024-03-07 08:45',
      updatedAt: '2024-03-07 08:45',
      transactionStatus: 'failed',
      message: 'Giao dịch thất bại do lỗi kết nối',
      orderId: '9012'
    },
    {
      id: 'TRX004',
      amount: 12000000,
      status: 'completed',
      type: 'add',
      note: 'Hoàn tiền đơn hàng #3456 - Đơn hàng bị trả lại do sản phẩm không đúng thông số kỹ thuật. Chi tiết hoàn tiền: Giá trị sản phẩm: 10.000.000đ, Phí vận chuyển: 1.000.000đ, Bồi thường: 1.000.000đ. Thời gian hoàn tiền: 2 ngày làm việc',
      createdAt: '2024-03-07 07:30',
      updatedAt: '2024-03-07 07:45',
      transactionStatus: 'success',
      message: 'Giao dịch hoàn tất',
      orderId: '3456'
    },
    {
      id: 'TRX005',
      amount: 30000000,
      status: 'pending',
      type: 'subtract',
      note: 'Thanh toán đơn hàng #7890 - Đơn hàng mua sắm từ cửa hàng Nội thất DEF với các sản phẩm: Bộ bàn ăn 6 ghế, Tủ quần áo 3 cánh, Đèn chùm phòng khách. Đơn hàng được giao đến địa chỉ: 789 Trần Văn C, Quận 7, TP.HCM. Phương thức thanh toán: Chuyển khoản ngân hàng',
      createdAt: '2024-03-07 06:15',
      updatedAt: '2024-03-07 06:15',
      transactionStatus: 'success',
      message: 'Giao dịch đang được xử lý',
      orderId: '7890'
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
  };

  const handleReset = () => {
    setSearchTerm('');
    setMinAmount('');
    setMaxAmount('');
    setStatus('all');
    setStartDate('');
    setEndDate('');
    setIsSearching(false);
  };

  const handleViewDetails = (transaction) => {
    console.log('Viewing details for transaction:', transaction); // Debug log
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  const handleViewOrder = () => {
    if (selectedTransaction?.orderId) {
      navigate(`/transaction/${selectedTransaction.orderId}`);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (!isSearching) return true;

    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.note.toLowerCase().includes(searchTerm.toLowerCase());
    
    const amount = transaction.amount;
    const matchesAmount = (!minAmount || amount >= Number(minAmount)) &&
                         (!maxAmount || amount <= Number(maxAmount));
    
    const matchesStatus = status === 'all' || transaction.status === status;
    
    const transactionDate = new Date(transaction.createdAt);
    const matchesDate = (!startDate || transactionDate >= new Date(startDate)) &&
                       (!endDate || transactionDate <= new Date(endDate));
    
    return matchesSearch && matchesAmount && matchesStatus && matchesDate;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="transaction-history">
      <div className="header-content">
        <h1>Lịch sử giao dịch</h1>
        <p>Xem và quản lý lịch sử các giao dịch của bạn</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã giao dịch hoặc ghi chú..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div className="filter-item">
            <label>Số tiền từ:</label>
            <input
              type="number"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="filter-item">
            <label>Đến:</label>
            <input
              type="number"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="filter-item">
            <label>Trạng thái:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="pending">Chưa xử lý</option>
              <option value="completed">Đã xử lý</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Từ ngày:</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <label>Đến ngày:</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-actions">
          <button className="search-btn" onClick={handleSearch}>
            <FaSearch /> Tìm kiếm
          </button>
          <button className="reset-btn" onClick={handleReset}>
            <FaFilter /> Đặt lại
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Mã giao dịch</th>
              <th>Số tiền</th>
              <th>Xử lý</th>
              <th>Ghi chú giao dịch</th>
              <th>Thời gian tạo</th>
              <th>Cập nhật cuối</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td title={transaction.id}>{transaction.id}</td>
                <td title={formatCurrency(transaction.amount)}>{formatCurrency(transaction.amount)}</td>
                <td>
                  <span className={`status-badge ${transaction.status}`}>
                    {transaction.status === 'pending' ? 'Chưa xử lý' : 'Đã xử lý'}
                  </span>
                </td>
                <td title={transaction.note}>{transaction.note}</td>
                <td title={formatDate(transaction.createdAt)}>{formatDate(transaction.createdAt)}</td>
                <td title={formatDate(transaction.updatedAt)}>{formatDate(transaction.updatedAt)}</td>
                <td>
                  <button 
                    className="view-details-btn" 
                    onClick={() => handleViewDetails(transaction)}
                  >
                    <FaEye /> Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTransaction && (
        <div className="transaction-modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chi tiết giao dịch</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-item">
                <label>Số tiền:</label>
                <span className={`amount ${selectedTransaction.type}`}>
                  {selectedTransaction.type === 'add' ? '+' : '-'} {formatCurrency(selectedTransaction.amount)}
                </span>
              </div>
              <div className="detail-item">
                <label>Loại giao dịch:</label>
                <span className={`transaction-type ${selectedTransaction.type}`}>
                  {selectedTransaction.type === 'add' ? 'Cộng' : 'Trừ'}
                </span>
              </div>
              <div className="detail-item">
                <label>Xử lý:</label>
                <span className={`status-badge ${selectedTransaction.status}`}>
                  {selectedTransaction.status === 'pending' ? 'Chưa xử lý' : 'Đã xử lý'}
                </span>
              </div>
              <div className="detail-item">
                <label>Ghi chú:</label>
                <span>{selectedTransaction.note}</span>
              </div>
              <div className="detail-item">
                <label>Trạng thái giao dịch:</label>
                <span className={`transaction-status ${selectedTransaction.transactionStatus}`}>
                  {selectedTransaction.transactionStatus === 'success' ? 'Thành công' : 'Thất bại'}
                </span>
              </div>
              <div className="detail-item">
                <label>Thông điệp:</label>
                <span>{selectedTransaction.message}</span>
              </div>
              <div className="detail-item">
                <label>Thời gian tạo:</label>
                <span>{formatDate(selectedTransaction.createdAt)}</span>
              </div>
              <div className="detail-item">
                <label>Cập nhật cuối:</label>
                <span>{formatDate(selectedTransaction.updatedAt)}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="view-order-btn" onClick={handleViewOrder}>
                <FaArrowRight /> Xem nguồn giao dịch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory; 