import React, { useState, useEffect } from 'react';
import SearchBar from '../common/SearchBar';
import MySalesTable from './MySalesTable';
import AddTransactionModal from './AddTransactionModal';
import './MySales.css';

const MySales = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample data
  const sampleTransactions = [
    {
      id: 1,
      code: "TRX001",
      topic: "Mua bán xe máy Honda Wave Alpha 2023 - Xe nhập khẩu chính hãng",
      buyer: "Nguyễn Văn X",
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
      buyer: "Trần Thị Y",
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
      buyer: "Lê Văn Z",
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
      const response = await fetch('/api/my-sales', {
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
        const matchesBuyer = !searchParams.buyer || transaction.buyer.toLowerCase().includes(searchParams.buyer.toLowerCase());
        const matchesFeeBearer = !searchParams.feeBearer || transaction.feeBearer === searchParams.feeBearer;
        const matchesCreatedAt = !searchParams.createdAt || new Date(transaction.createdAt).toLocaleDateString() === new Date(searchParams.createdAt).toLocaleDateString();
        
        // Price range check
        const matchesMinPrice = !searchParams.minPrice || transaction.price >= Number(searchParams.minPrice);
        const matchesMaxPrice = !searchParams.maxPrice || transaction.price <= Number(searchParams.maxPrice);

        return matchesCode && matchesTopic && matchesBuyer && matchesFeeBearer && 
               matchesCreatedAt && matchesMinPrice && matchesMaxPrice;
      });
      setTransactions(filteredData);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleSubmitTransaction = async (formData) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Refresh the transactions list
        const newTransaction = await response.json();
        setTransactions(prev => [newTransaction, ...prev]);
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      // For demo purposes, add a mock transaction
      const mockTransaction = {
        id: Date.now(),
        code: `TRX${Math.floor(Math.random() * 1000)}`,
        topic: formData.topic,
        buyer: "Chưa có người mua",
        method: formData.contactMethod,
        price: Number(formData.price),
        feeBearer: formData.feeBearer === 'buyer' ? 'Người mua' : 'Người bán',
        fee: Number(formData.price) * 0.01, // 1% fee
        createdAt: new Date().toISOString()
      };
      setTransactions(prev => [mockTransaction, ...prev]);
      setShowAddModal(false);
    }
  };

  return (
    <div className="my-sales">
      <div className="my-sales-header">
        <div className="header-content">
          <h1>Đơn bán của tôi</h1>
          <p>Quản lý các giao dịch bán hàng của bạn</p>
        </div>
        <button className="add-new-button" onClick={handleAddNew}>
          + Thêm mới
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <MySalesTable transactions={transactions} />
      )}

      {showAddModal && (
        <AddTransactionModal
          onClose={handleCloseModal}
          onSubmit={handleSubmitTransaction}
        />
      )}
    </div>
  );
};

export default MySales; 