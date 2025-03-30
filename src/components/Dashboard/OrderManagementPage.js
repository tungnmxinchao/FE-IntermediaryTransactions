import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Input, Modal, Form, message, Select, Row, Col } from 'antd';
import { EyeOutlined, CheckCircleOutlined, CloseCircleOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Dashboard.css';

const OrderManagementPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    id: '',
    title: '',
    isPublic: 'all',
    status: '7', // Mặc định là status 7
    contact: '',
    sellerUsername: '',
    buyerUsername: '',
  });

  const getStatusText = (statusId) => {
    switch (statusId) {
      case 1: return "Đơn hàng đã sẵn sàng giao dịch";
      case 2: return "Đơn hàng đã bị hủy";
      case 3: return "Bên mua đang kiểm tra hàng";
      case 4: return "Đơn hàng đã hoàn thành";
      case 5: return "Bên mua khiếu nại sản phẩm";
      case 6: return "Bên bán đánh dấu khiếu nại không đúng";
      case 7: return "Yêu cầu quản trị viên trung gian";
      case 8: return "Chờ bên mua xác nhận khiếu nại không đúng";
      default: return "Không xác định";
    }
  };

  const getStatusColor = (statusId) => {
    switch (statusId) {
      case 1: return 'blue';
      case 2: return 'red';
      case 3: return 'orange';
      case 4: return 'green';
      case 5: return 'red';
      case 6: return 'orange';
      case 7: return 'purple';
      case 8: return 'orange';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'Id',
      key: 'Id',
      sorter: true,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: 'Người bán',
      dataIndex: ['CreatedByUser', 'Username'],
      key: 'SellerUsername',
    },
    {
      title: 'Người mua',
      dataIndex: ['Customer', 'Username'],
      key: 'BuyerUsername',
      render: (text) => text || 'Chưa có người mua',
    },
    {
      title: 'Giá trị',
      dataIndex: 'MoneyValue',
      key: 'MoneyValue',
      render: (money) => new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(money),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'StatusId',
      key: 'StatusId',
      render: (statusId) => (
        <Tag color={getStatusColor(statusId)}>
          {getStatusText(statusId)}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link"
            href={record.ShareLink}
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
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  const buildFilterString = () => {
    const filterConditions = [];
    
    if (filters.id) {
      filterConditions.push(`Id eq '${filters.id}'`);
    }
    if (filters.title) {
      filterConditions.push(`contains(Title,'${filters.title}')`);
    }
    if (filters.isPublic !== 'all') {
      filterConditions.push(`IsPublic eq ${filters.isPublic === 'true'}`);
    }
    if (filters.status) {
      filterConditions.push(`StatusId eq ${filters.status}`);
    }
    if (filters.contact) {
      filterConditions.push(`contains(Contact,'${filters.contact}')`);
    }
    if (filters.sellerUsername) {
      filterConditions.push(`contains(CreatedByUser/Username,'${filters.sellerUsername}')`);
    }
    if (filters.buyerUsername) {
      filterConditions.push(`contains(Customer/Username,'${filters.buyerUsername}')`);
    }

    return filterConditions.length > 0 ? filterConditions.join(' and ') : undefined;
  };

  const fetchOrders = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const filterString = buildFilterString();
      const response = await axios.get('https://localhost:7054/odata/AdminViewOrders', {
        params: {
          $expand: 'CreatedByUser,Customer',
          $filter: filterString,
          $skip: (page - 1) * pageSize,
          $top: pageSize,
          $count: true,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      
      // Kiểm tra nếu đang filter theo status 7 và không có kết quả
      if (filters.status === '7' && response.data.value.length === 0) {
        // Reset filter status và fetch lại
        setFilters(prev => ({
          ...prev,
          status: undefined
        }));
        return;
      }

      setOrders(response.data.value);
      setTotal(response.data['@odata.count']);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
      toast.error('Không thể tải danh sách đơn hàng!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const handleTableChange = (pagination, filters, sorter) => {
    fetchOrders(pagination.current, pagination.pageSize);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      id: '',
      title: '',
      isPublic: 'all',
      status: undefined, // Thay đổi từ '7' thành undefined
      contact: '',
      sellerUsername: '',
      buyerUsername: '',
    });
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Quản lý đơn hàng</h1>
      </div>

      <div className="content-card">
        <Row gutter={[16, 16]} className="filter-row">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tìm theo ID"
              value={filters.id}
              onChange={(e) => handleFilterChange('id', e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tìm theo tiêu đề"
              value={filters.title}
              onChange={(e) => handleFilterChange('title', e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Trạng thái công khai"
              style={{ width: '100%' }}
              value={filters.isPublic}
              onChange={(value) => handleFilterChange('isPublic', value)}
              allowClear
            >
              <Select.Option value="all">Tất cả</Select.Option>
              <Select.Option value="true">Công khai</Select.Option>
              <Select.Option value="false">Không công khai</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Trạng thái đơn hàng"
              style={{ width: '100%' }}
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
              allowClear
            >
              <Select.Option value="1">Đơn hàng đã sẵn sàng giao dịch</Select.Option>
              <Select.Option value="2">Đơn hàng đã bị hủy</Select.Option>
              <Select.Option value="3">Bên mua đang kiểm tra hàng</Select.Option>
              <Select.Option value="4">Đơn hàng đã hoàn thành</Select.Option>
              <Select.Option value="5">Bên mua khiếu nại sản phẩm</Select.Option>
              <Select.Option value="6">Bên bán đánh dấu khiếu nại không đúng</Select.Option>
              <Select.Option value="7">Yêu cầu quản trị viên trung gian</Select.Option>
              <Select.Option value="8">Chờ bên mua xác nhận khiếu nại không đúng</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tìm theo số điện thoại"
              value={filters.contact}
              onChange={(e) => handleFilterChange('contact', e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tìm theo tên người bán"
              value={filters.sellerUsername}
              onChange={(e) => handleFilterChange('sellerUsername', e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tìm theo tên người mua"
              value={filters.buyerUsername}
              onChange={(e) => handleFilterChange('buyerUsername', e.target.value)}
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
          dataSource={orders}
          rowKey="Id"
          loading={loading}
          onChange={handleTableChange}
          pagination={{ 
            total,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Tổng số ${total} đơn hàng`
          }}
        />
      </div>
    </div>
  );
};

export default OrderManagementPage; 