import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Modal, DatePicker, Select } from 'antd';
import { EyeOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import './Dashboard.css';

const { RangePicker } = DatePicker;

const TransactionHistoryPage = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const typeColors = {
          'Deposit': 'green',
          'Withdrawal': 'red',
          'Transfer': 'blue',
          'Payment': 'purple',
        };
        return (
          <Tag color={typeColors[type]}>
            {type}
          </Tag>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => {
        const sign = record.type === 'Withdrawal' ? '-' : '+';
        const color = record.type === 'Withdrawal' ? 'red' : 'green';
        return (
          <span style={{ color, fontWeight: 'bold' }}>
            {sign}${Math.abs(amount).toFixed(2)}
          </span>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusColors = {
          'Completed': 'green',
          'Pending': 'orange',
          'Failed': 'red',
        };
        return (
          <Tag color={statusColors[status]}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
        >
          Details
        </Button>
      ),
    },
  ];

  const data = [
    {
      id: 'TRX001',
      type: 'Deposit',
      amount: 1000.00,
      status: 'Completed',
      date: '2024-03-30 14:30',
    },
    {
      id: 'TRX002',
      type: 'Withdrawal',
      amount: 500.00,
      status: 'Pending',
      date: '2024-03-30 13:15',
    },
    {
      id: 'TRX003',
      type: 'Transfer',
      amount: 750.00,
      status: 'Completed',
      date: '2024-03-29 16:45',
    },
  ];

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Transaction History</h1>
        <div className="header-actions">
          <Space>
            <Input
              placeholder="Search transactions..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              style={{ width: 250 }}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 150 }}
              placeholder="Status"
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="failed">Failed</Select.Option>
            </Select>
            <Select
              value={typeFilter}
              onChange={setTypeFilter}
              style={{ width: 150 }}
              placeholder="Type"
            >
              <Select.Option value="all">All Types</Select.Option>
              <Select.Option value="deposit">Deposit</Select.Option>
              <Select.Option value="withdrawal">Withdrawal</Select.Option>
              <Select.Option value="transfer">Transfer</Select.Option>
              <Select.Option value="payment">Payment</Select.Option>
            </Select>
          </Space>
        </div>
      </div>

      <div className="content-card">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} transactions`
          }}
        />
      </div>

      <Modal
        title="Transaction Details"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedTransaction(null);
        }}
        footer={null}
        width={800}
      >
        {selectedTransaction && (
          <div className="transaction-details">
            <div className="detail-row">
              <span className="label">Transaction ID:</span>
              <span className="value">{selectedTransaction.id}</span>
            </div>
            <div className="detail-row">
              <span className="label">Type:</span>
              <span className="value">
                <Tag color={
                  selectedTransaction.type === 'Deposit' ? 'green' :
                  selectedTransaction.type === 'Withdrawal' ? 'red' :
                  selectedTransaction.type === 'Transfer' ? 'blue' : 'purple'
                }>
                  {selectedTransaction.type}
                </Tag>
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Amount:</span>
              <span className="value" style={{
                color: selectedTransaction.type === 'Withdrawal' ? 'red' : 'green',
                fontWeight: 'bold'
              }}>
                {selectedTransaction.type === 'Withdrawal' ? '-' : '+'}
                ${Math.abs(selectedTransaction.amount).toFixed(2)}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className="value">
                <Tag color={
                  selectedTransaction.status === 'Completed' ? 'green' :
                  selectedTransaction.status === 'Pending' ? 'orange' : 'red'
                }>
                  {selectedTransaction.status}
                </Tag>
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Date:</span>
              <span className="value">{selectedTransaction.date}</span>
            </div>
            {/* Add more transaction details as needed */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TransactionHistoryPage; 