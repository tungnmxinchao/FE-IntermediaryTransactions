import React, { useState, useEffect } from 'react';
import SearchBar from '../common/SearchBar';
import PublicMarketTable from './PublicMarketTable';
import './PublicMarket.css';

const PublicMarket = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample data with longer descriptions
  const sampleTransactions = [
    {
      id: 1,
      code: "TRX001",
      topic: "Mua bán xe máy Honda Wave Alpha 2023 - Xe nhập khẩu chính hãng, đăng ký biển số, giấy tờ đầy đủ, bảo hành 1 năm",
      seller: "Nguyễn Văn A",
      method: "Chuyển khoản",
      price: 25000000,
      feeBearer: "Người mua",
      fee: 250000,
      createdAt: "2024-03-07T10:30:00"
    },
    {
      id: 2,
      code: "TRX002",
      topic: "Mua bán điện thoại iPhone 15 Pro Max 256GB - Hàng chính hãng VN/A, bảo hành 1 năm",
      seller: "Trần Thị B",
      method: "Tiền mặt",
      price: 15000000,
      feeBearer: "Người bán",
      fee: 150000,
      createdAt: "2024-03-07T09:15:00"
    },
    {
      id: 3,
      code: "TRX003",
      topic: "Mua bán laptop Dell XPS 15 9520 - Core i7 12700H, RAM 16GB, SSD 512GB",
      seller: "Lê Văn C",
      method: "Chuyển khoản",
      price: 35000000,
      feeBearer: "Người mua",
      fee: 350000,
      createdAt: "2024-03-07T08:45:00"
    },
    {
      id: 4,
      code: "TRX004",
      topic: "Mua bán căn hộ chung cư The Sun Avenue - Quận 1, TP.HCM - Diện tích 65m2",
      seller: "Phạm Thị D",
      method: "Chuyển khoản",
      price: 2500000000,
      feeBearer: "Người mua",
      fee: 25000000,
      createdAt: "2024-03-07T11:20:00"
    },
    {
      id: 5,
      code: "TRX005",
      topic: "Mua bán xe ô tô Toyota Camry 2.5G 2023 - Xe nhập khẩu Thái Lan",
      seller: "Hoàng Văn E",
      method: "Chuyển khoản",
      price: 850000000,
      feeBearer: "Người mua",
      fee: 8500000,
      createdAt: "2024-03-07T13:15:00"
    }
  ];

  useEffect(() => {
    // Load sample data when component mounts
    setTransactions(sampleTransactions);
  }, []);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // For demo purposes, filter the sample data based on search params
      const filteredData = sampleTransactions.filter(transaction => {
        const matchesCode = !searchParams.code || transaction.code.toLowerCase().includes(searchParams.code.toLowerCase());
        const matchesTopic = !searchParams.topic || transaction.topic.toLowerCase().includes(searchParams.topic.toLowerCase());
        const matchesSeller = !searchParams.seller || transaction.seller.toLowerCase().includes(searchParams.seller.toLowerCase());
        const matchesFeeBearer = !searchParams.feeBearer || transaction.feeBearer === searchParams.feeBearer;
        const matchesCreatedAt = !searchParams.createdAt || new Date(transaction.createdAt).toLocaleDateString() === new Date(searchParams.createdAt).toLocaleDateString();
        
        // Price range check
        const matchesMinPrice = !searchParams.minPrice || transaction.price >= Number(searchParams.minPrice);
        const matchesMaxPrice = !searchParams.maxPrice || transaction.price <= Number(searchParams.maxPrice);

        return matchesCode && matchesTopic && matchesSeller && matchesFeeBearer && 
               matchesCreatedAt && matchesMinPrice && matchesMaxPrice;
      });
      setTransactions(filteredData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="public-market">
      <div className="public-market-header">
        <h1>Chợ công khai</h1>
        <p>Xem và tham gia các giao dịch trung gian công khai</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <PublicMarketTable transactions={transactions} />
      )}
    </div>
  );
};

export default PublicMarket; 