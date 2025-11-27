import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { STORAGE_KEYS } from '../../constants/storage.constants';
import { API_CONFIG } from '../../config/api.config';

import './Withdraw.css';

const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [displayAmount, setDisplayAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!userId || !token) {
          toast.error('Không tìm thấy thông tin xác thực');
          return;
        }

        const response = await fetch(`${API_CONFIG.BASE_URL}/api/User/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData.code === 200) {
            setBalance(userData.data.money || 0);
          }
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const withdrawAmount = parseInt(amount);

    if (withdrawAmount > balance) {
      toast.error('Số dư không đủ để thực hiện giao dịch');
      setLoading(false);
      return;
    }

    try {
      const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

      if (!userId || !token) {
        toast.error('Không tìm thấy thông tin xác thực');
        return;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/Withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          amount: withdrawAmount
        })
      });

      const data = await response.json();

      if (data.code === 200) {
        toast.success('Yêu cầu rút tiền đã được gửi thành công!');
        setAmount('');
        setDisplayAmount('');
        // Refresh balance
        setBalance(prev => prev - withdrawAmount);
      } else {
        toast.error(data.message || 'Không thể tạo yêu cầu rút tiền');
      }
    } catch (error) {
      console.error('Error creating withdraw:', error);
      toast.error('Đã xảy ra lỗi khi tạo yêu cầu rút tiền');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const formatNumber = (value) => {
    // Loại bỏ tất cả ký tự không phải số
    const numericValue = value.replace(/[^\d]/g, '');
    // Format số theo định dạng Việt Nam
    return new Intl.NumberFormat('vi-VN').format(numericValue);
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^\d]/g, '');

    // Cập nhật giá trị thực (số nguyên)
    setAmount(numericValue);

    // Cập nhật giá trị hiển thị (đã format)
    setDisplayAmount(formatNumber(numericValue));
  };

  return (
    <div className="withdraw-container">
      <div className="withdraw-card">
        <h1>Rút tiền</h1>
        <p className="withdraw-description">
          Nhập số tiền bạn muốn rút từ tài khoản
        </p>

        <div className="balance-info">
          <div className="balance-display">
            <span className="balance-label">Số dư hiện tại:</span>
            <span className="balance-amount">{formatCurrency(balance)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="withdraw-form">
          <div className="form-group">
            <label htmlFor="amount">Số tiền rút (VND)</label>
            <div className="amount-input">
              <input
                type="text"
                id="amount"
                value={displayAmount}
                onChange={handleAmountChange}
                placeholder="Ví dụ: 500,000"
                required
              />
            </div>
            <small className="amount-hint">
              Số tiền tối thiểu: 50,000 VND | Số dư khả dụng: {formatCurrency(balance)}
            </small>
          </div>

          <button
            type="submit"
            className="withdraw-button"
            disabled={loading || !amount || parseInt(amount) > balance || parseInt(amount) < 50000}
          >
            {loading ? 'Đang xử lý...' : 'Yêu cầu rút tiền'}
          </button>
        </form>

        <div className="withdraw-notice">
          <h3>Lưu ý:</h3>
          <ul>
            <li>Yêu cầu rút tiền sẽ được xử lý trong vòng 1-3 ngày làm việc</li>
            <li>Số tiền rút tối thiểu là 50,000 VND</li>
            <li>Vui lòng kiểm tra thông tin tài khoản nhận tiền trước khi gửi yêu cầu</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
