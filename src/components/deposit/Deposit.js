import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { STORAGE_KEYS } from '../../constants/storage.constants';
import './Deposit.css';

const Deposit = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

      if (!userId || !token) {
        toast.error('Không tìm thấy thông tin xác thực');
        return;
      }

      const response = await fetch('https://localhost:7054/api/Deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          amount: parseInt(amount)
        })
      });

      const data = await response.json();

      if (data.result && data.result.order_url) {
        // Chuyển hướng đến URL thanh toán
        window.location.href = data.result.order_url;
      } else {
        toast.error('Không thể tạo giao dịch nạp tiền');
      }
    } catch (error) {
      console.error('Error creating deposit:', error);
      toast.error('Đã xảy ra lỗi khi tạo giao dịch nạp tiền');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-container">
      <div className="deposit-card">
        <h1>Nạp tiền</h1>
        <p className="deposit-description">
          Nhập số tiền bạn muốn nạp vào tài khoản
        </p>
        
        <form onSubmit={handleSubmit} className="deposit-form">
          <div className="form-group">
            <label htmlFor="amount">Số tiền (VND)</label>
            <div className="amount-input">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Nhập số tiền"
                min="10000"
                step="1000"
                required
              />
              <span className="currency">VND</span>
            </div>
            <small className="amount-hint">Số tiền tối thiểu: 10,000 VND</small>
          </div>

          <button 
            type="submit" 
            className="deposit-button"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Nạp tiền'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deposit; 