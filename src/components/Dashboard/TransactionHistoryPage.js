import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Input, Modal, DatePicker, Select, Row, Col } from 'antd';
import { EyeOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Dashboard.css';

const { RangePicker } = DatePicker;

const TransactionHistoryPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [filters, setFilters] = useState({
    username: '',
    transactionType: undefined,
    isProcessed: undefined,
    dateRange: null,
  });

  const getTransactionTypeText = (type) => {
    switch (type) {
      case 1: return "Cộng tiền";
      case 2: return "Trừ tiền";
      default: return "Không xác định";
    }
  };

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 1: return 'green';
      case 2: return 'red';
      default: return 'default';
    }
  };

  const getProcessedStatusText = (isProcessed) => {
    return isProcessed ? "Đã xử lý" : "Chưa xử lý";
  };

  const getProcessedStatusColor = (isProcessed) => {
    return isProcessed ? 'green' : 'orange';
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'Id',
      key: 'Id',
      sorter: true,
    },
    {
      title: 'Người dùng',
      dataIndex: ['User', 'Username'],
      key: 'Username',
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'TransactionType',
      key: 'TransactionType',
      render: (type) => (
        <Tag color={getTransactionTypeColor(type)}>
          {getTransactionTypeText(type)}
        </Tag>
      ),
    },
    {
      title: 'Số tiền',
      dataIndex: 'Amount',
      key: 'Amount',
      render: (amount, record) => {
        const sign = record.TransactionType === 2 ? '-' : '+';
        const color = record.TransactionType === 2 ? 'red' : 'green';
        return (
          <span style={{ color, fontWeight: 'bold' }}>
            {sign}{new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(amount)}
          </span>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'IsProcessed',
      key: 'IsProcessed',
      render: (isProcessed) => (
        <Tag color={getProcessedStatusColor(isProcessed)}>
          {getProcessedStatusText(isProcessed)}
        </Tag>
      ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'Note',
      key: 'Note',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'UpdatedAt',
      key: 'UpdatedAt',
      render: (date) => date ? new Date(date).toLocaleString() : 'Chưa có dữ liệu',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link"
            href={record.OnDoneLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1890ff',
              padding: '4px 12px',
              height: 'auto',
              borderRadius: '4px',
              border: '1px solid #1890ff',
              background: 'transparent',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1890ff';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#1890ff';
            }}
          >
            Nguồn giao dịch
          </Button>
          <Button 
            type="link"
            onClick={() => {
              setSelectedTransaction(record);
              setIsModalVisible(true);
            }}
            style={{
              color: '#52c41a',
              padding: '4px 12px',
              height: 'auto',
              borderRadius: '4px',
              border: '1px solid #52c41a',
              background: 'transparent',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#52c41a';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#52c41a';
            }}
          >
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  const buildFilterString = () => {
    const filterConditions = [];
    
    if (filters.username) {
      filterConditions.push(`contains(User/Username,'${filters.username}')`);
    }
    if (filters.transactionType) {
      filterConditions.push(`TransactionType eq ${filters.transactionType}`);
    }
    if (filters.isProcessed !== undefined) {
      filterConditions.push(`IsProcessed eq ${filters.isProcessed}`);
    }
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      const startDate = filters.dateRange[0].toISOString();
      const endDate = filters.dateRange[1].toISOString();
      filterConditions.push(`CreatedAt ge ${startDate} and CreatedAt le ${endDate}`);
    }

    return filterConditions.length > 0 ? filterConditions.join(' and ') : undefined;
  };

  const fetchTransactions = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const filterString = buildFilterString();
      const response = await axios.get('https://localhost:7054/odata/AdminViewTransactions', {
        params: {
          $expand: 'User',
          $filter: filterString,
          $skip: (page - 1) * pageSize,
          $top: pageSize,
          $count: true,
          $orderby: 'Id desc',
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      
      setTransactions(response.data.value);
      setTotal(response.data['@odata.count']);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
      toast.error('Không thể tải danh sách giao dịch!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleTableChange = (pagination, filters, sorter) => {
    fetchTransactions(pagination.current, pagination.pageSize);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      username: '',
      transactionType: undefined,
      isProcessed: undefined,
      dateRange: null,
    });
  };

  const handleUpdateStatus = async (id, isProcessed) => {
    try {
      setUpdating(true);
      await axios.put(`https://localhost:7054/api/TransactionHistory/${id}/${isProcessed}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      
      toast.success('Cập nhật trạng thái thành công!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Cập nhật lại danh sách và đóng modal
      fetchTransactions();
      setIsModalVisible(false);
      setSelectedTransaction(null);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
      toast.error('Không thể cập nhật trạng thái!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error updating transaction status:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Lịch sử giao dịch</h1>
      </div>

      <div className="content-card">
        <Row gutter={[16, 16]} className="filter-row">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tìm theo tên người dùng"
              value={filters.username}
              onChange={(e) => handleFilterChange('username', e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Loại giao dịch"
              style={{ width: '100%' }}
              value={filters.transactionType}
              onChange={(value) => handleFilterChange('transactionType', value)}
              allowClear
            >
              <Select.Option value={1}>Cộng tiền</Select.Option>
              <Select.Option value={2}>Trừ tiền</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Trạng thái xử lý"
              style={{ width: '100%' }}
              value={filters.isProcessed}
              onChange={(value) => handleFilterChange('isProcessed', value)}
              allowClear
            >
              <Select.Option value={true}>Đã xử lý</Select.Option>
              <Select.Option value={false}>Chưa xử lý</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <RangePicker
              style={{ width: '100%' }}
              value={filters.dateRange}
              onChange={(dates) => handleFilterChange('dateRange', dates)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button 
              icon={<ReloadOutlined />}
              onClick={handleResetFilters}
              style={{ width: '100%' }}
            >
              Đặt lại bộ lọc
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={transactions}
          rowKey="Id"
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: 1500 }}
          pagination={{ 
            total,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Tổng số ${total} giao dịch`
          }}
        />
      </div>

      <Modal
        title="Chi tiết giao dịch"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedTransaction(null);
        }}
        footer={[
          <Button 
            key="update" 
            type="primary"
            loading={updating}
            onClick={() => handleUpdateStatus(selectedTransaction?.Id, !selectedTransaction?.IsProcessed)}
          >
            {selectedTransaction?.IsProcessed ? 'Đánh dấu chưa xử lý' : 'Đánh dấu đã xử lý'}
          </Button>
        ]}
        width={800}
      >
        {selectedTransaction && (
          <div className="transaction-details">
            <div className="detail-row">
              <span className="label">ID:</span>
              <span className="value">{selectedTransaction.Id}</span>
            </div>
            <div className="detail-row">
              <span className="label">Người dùng:</span>
              <span className="value">{selectedTransaction.User?.Username}</span>
            </div>
            <div className="detail-row">
              <span className="label">Loại giao dịch:</span>
              <span className="value">
                <Tag color={getTransactionTypeColor(selectedTransaction.TransactionType)}>
                  {getTransactionTypeText(selectedTransaction.TransactionType)}
                </Tag>
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Số tiền:</span>
              <span className="value" style={{
                color: selectedTransaction.TransactionType === 2 ? 'red' : 'green',
                fontWeight: 'bold'
              }}>
                {selectedTransaction.TransactionType === 2 ? '-' : '+'}
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(selectedTransaction.Amount)}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Trạng thái:</span>
              <span className="value">
                <Tag color={getProcessedStatusColor(selectedTransaction.IsProcessed)}>
                  {getProcessedStatusText(selectedTransaction.IsProcessed)}
                </Tag>
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Ghi chú:</span>
              <span className="value">{selectedTransaction.Note}</span>
            </div>
            <div className="detail-row">
              <span className="label">Ngày tạo:</span>
              <span className="value">{new Date(selectedTransaction.CreatedAt).toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="label">Ngày cập nhật:</span>
              <span className="value">
                {selectedTransaction.UpdatedAt ? new Date(selectedTransaction.UpdatedAt).toLocaleString() : 'Chưa có dữ liệu'}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Nguồn giao dịch:</span>
              <span className="value">
                <a 
                  href={selectedTransaction.OnDoneLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1890ff' }}
                >
                  {selectedTransaction.OnDoneLink}
                </a>
              </span>
            </div>
            {selectedTransaction.Payload && (
              <div className="detail-row">
                <span className="label">Thông tin bổ sung:</span>
                <span className="value">{selectedTransaction.Payload}</span>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TransactionHistoryPage; 