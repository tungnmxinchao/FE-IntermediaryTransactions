import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaFilter, FaTimes, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { TransactionHistoryService } from '../../services/transaction-history.service';
import Pagination from '../common/Pagination';
import { PAGINATION_CONFIG } from '../../config/pagination.config';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [status, setStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ value: [], '@odata.count': 0 });
  const pageSize = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE;

  const buildQueryParams = () => {
    const filter = TransactionHistoryService.buildFilterQuery({
      searchTerm,
      minAmount,
      maxAmount,
      status,
      startDate,
      endDate
    });

    return {
      skip: (currentPage - 1) * pageSize,
      top: pageSize,
      filter,
      orderby: 'CreatedAt desc'
    };
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await TransactionHistoryService.getTransactionHistory(buildQueryParams());
      setData(result);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, minAmount, maxAmount, status, startDate, endDate]);

  const transactions = data?.value || [];
  const totalCount = parseInt(data?.['@odata.count']) || 0;

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchTerm('');
    setMinAmount('');
    setMaxAmount('');
    setStatus('all');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  const handleViewOrder = () => {
    if (selectedTransaction?.OnDoneLink) {
      window.location.href = selectedTransaction.OnDoneLink;
    }
  };

  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="error">{error.message}</div>;
  }

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
              <th>Loại giao dịch</th>
              <th>Trạng thái</th>
              <th>Ghi chú</th>
              <th>Thời gian tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.Id}>
                <td>{transaction.Id}</td>
                <td>{TransactionHistoryService.formatAmount(transaction.Amount)}</td>
                <td>{TransactionHistoryService.getTransactionTypeLabel(transaction.TransactionType)}</td>
                <td>
                  <span className={`status-badge ${transaction.IsProcessed ? 'completed' : 'pending'}`}>
                    {transaction.IsProcessed ? 'Đã xử lý' : 'Chưa xử lý'}
                  </span>
                </td>
                <td title={transaction.Note}>{transaction.Note}</td>
                <td>{TransactionHistoryService.formatDate(transaction.CreatedAt)}</td>
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

      <Pagination
        currentPage={currentPage}
        totalItems={totalCount}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
      />

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
                <label>Mã giao dịch:</label>
                <span>{selectedTransaction.Id}</span>
              </div>
              <div className="detail-item">
                <label>Số tiền:</label>
                <span>{TransactionHistoryService.formatAmount(selectedTransaction.Amount)}</span>
              </div>
              <div className="detail-item">
                <label>Loại giao dịch:</label>
                <span>{TransactionHistoryService.getTransactionTypeLabel(selectedTransaction.TransactionType)}</span>
              </div>
              <div className="detail-item">
                <label>Trạng thái:</label>
                <span className={`status-badge ${selectedTransaction.IsProcessed ? 'completed' : 'pending'}`}>
                  {selectedTransaction.IsProcessed ? 'Đã xử lý' : 'Chưa xử lý'}
                </span>
              </div>
              <div className="detail-item">
                <label>Ghi chú:</label>
                <span>{selectedTransaction.Note}</span>
              </div>
              <div className="detail-item">
                <label>Kết quả:</label>
                <span>{selectedTransaction.Payload}</span>
              </div>
              <div className="detail-item">
                <label>Thời gian tạo:</label>
                <span>{TransactionHistoryService.formatDate(selectedTransaction.CreatedAt)}</span>
              </div>
              {selectedTransaction.UpdatedAt && (
                <div className="detail-item">
                  <label>Cập nhật cuối:</label>
                  <span>{TransactionHistoryService.formatDate(selectedTransaction.UpdatedAt)}</span>
                </div>
              )}
              {selectedTransaction.OnDoneLink && (
                <div className="detail-item">
                  <label>Link liên kết:</label>
                  <span>{selectedTransaction.OnDoneLink}</span>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="view-order-btn" onClick={handleViewOrder}>
                <FaArrowRight /> Xem chi tiết giao dịch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory; 