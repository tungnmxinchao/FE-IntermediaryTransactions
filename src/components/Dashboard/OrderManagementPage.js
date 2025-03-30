import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Modal, Form, message, Select } from 'antd';
import { EyeOutlined, CheckCircleOutlined, CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';
import './Dashboard.css';

const OrderManagementPage = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusColors = {
          'Pending': 'orange',
          'Processing': 'blue',
          'Completed': 'green',
          'Cancelled': 'red',
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
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            View
          </Button>
          {record.status === 'Pending' && (
            <>
              <Button 
                type="primary" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleApprove(record)}
              >
                Approve
              </Button>
              <Button 
                danger 
                icon={<CloseCircleOutlined />}
                onClick={() => handleReject(record)}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const data = [
    {
      id: 'ORD001',
      customer: 'John Doe',
      amount: 299.99,
      status: 'Pending',
      date: '2024-03-30',
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      amount: 199.99,
      status: 'Processing',
      date: '2024-03-29',
    },
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleApprove = (order) => {
    Modal.confirm({
      title: 'Approve Order',
      content: `Are you sure you want to approve order ${order.id}?`,
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      onOk() {
        message.success('Order approved successfully');
      },
    });
  };

  const handleReject = (order) => {
    Modal.confirm({
      title: 'Reject Order',
      content: `Are you sure you want to reject order ${order.id}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        message.success('Order rejected successfully');
      },
    });
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Order Management</h1>
        <div className="header-actions">
          <Input
            placeholder="Search orders..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
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
            showTotal: (total) => `Total ${total} orders`
          }}
        />
      </div>

      <Modal
        title="Order Details"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedOrder(null);
        }}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <div className="order-details">
            <div className="detail-row">
              <span className="label">Order ID:</span>
              <span className="value">{selectedOrder.id}</span>
            </div>
            <div className="detail-row">
              <span className="label">Customer:</span>
              <span className="value">{selectedOrder.customer}</span>
            </div>
            <div className="detail-row">
              <span className="label">Amount:</span>
              <span className="value">${selectedOrder.amount.toFixed(2)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className="value">
                <Tag color={
                  selectedOrder.status === 'Pending' ? 'orange' :
                  selectedOrder.status === 'Processing' ? 'blue' :
                  selectedOrder.status === 'Completed' ? 'green' : 'red'
                }>
                  {selectedOrder.status}
                </Tag>
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Date:</span>
              <span className="value">{selectedOrder.date}</span>
            </div>
            {/* Add more order details as needed */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagementPage; 