import React, { useState, useEffect } from 'react';
import SearchBar from '../common/SearchBar';
import MyPurchasesTable from './MyPurchasesTable';
import './MyPurchases.css';

const MyPurchases = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample data
  const sampleTransactions = [
    {
      id: 1,
      code: "TRX001",
      topic: "Mua bán xe máy Honda Wave Alpha 2023 - Xe nhập khẩu chính hãng",
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
      topic: "Mua bán điện thoại iPhone 15 Pro Max 256GB - Hàng chính hãng",
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
      topic: "Mua bán laptop Dell XPS 15 9520 - Core i7 12700H",
      seller: "Lê Văn C",
      method: "Chuyển khoản",
      price: 35000000,
      feeBearer: "Người mua",
      fee: 350000,
      createdAt: "2024-03-07T08:45:00"
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
      const response = await fetch('/api/my-purchases', {
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
    <div className="my-purchases">
      <div className="my-purchases-header">
        <div className="header-content">
          <h1>Đơn mua của tôi</h1>
          <p>Quản lý các giao dịch mua hàng của bạn</p>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <MyPurchasesTable transactions={transactions} />
      )}
    </div>
  );
};

export default MyPurchases; 