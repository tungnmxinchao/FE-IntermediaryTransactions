import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Menu } from 'antd';
import { 
  UserOutlined, 
  ShoppingCartOutlined, 
  TransactionOutlined,
  DashboardOutlined,
  TeamOutlined,
  OrderedListOutlined,
  HistoryOutlined,
  DollarOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserManagementPage from './UserManagementPage';
import OrderManagementPage from './OrderManagementPage';
import TransactionHistoryPage from './TransactionHistoryPage';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('overview');
  const [profitData, setProfitData] = useState({
    totalOrder: 0,
    profitOfCreateOrder: 0,
    profitOfFeeOrder: 0
  });

  useEffect(() => {
    const fetchProfitData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('https://localhost:7054/Admin/get-profit', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfitData(data);
        } else {
          toast.error('Không thể tải dữ liệu lợi nhuận');
        }
      } catch (error) {
        console.error('Error fetching profit data:', error);
        toast.error('Đã xảy ra lỗi khi tải dữ liệu');
      }
    };

    fetchProfitData();
  }, []);

  const menuItems = [
    {
      key: 'overview',
      icon: <DashboardOutlined />,
      label: 'Overview',
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: 'User Management',
    },
    {
      key: 'orders',
      icon: <OrderedListOutlined />,
      label: 'Order Management',
    },
    {
      key: 'transactions',
      icon: <HistoryOutlined />,
      label: 'Transaction History',
    },
  ];

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(`/dashboard/${key}`);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const Overview = () => (
    <>
      <h1 className="dashboard-title">Dashboard Overview</h1>
      
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="statistics-row">
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Tổng số đơn hàng"
              value={profitData.totalOrder}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Lợi nhuận từ tạo đơn"
              value={profitData.profitOfCreateOrder}
              prefix={<DollarOutlined />}
              formatter={(value) => formatCurrency(value)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Lợi nhuận từ phí giao dịch"
              value={profitData.profitOfFeeOrder}
              prefix={<WalletOutlined />}
              formatter={(value) => formatCurrency(value)}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row gutter={[16, 16]} className="content-row">
        <Col xs={24} lg={8}>
          <Card 
            title="Quick Actions" 
            className="dashboard-card"
            onClick={() => navigate('/dashboard/users')}
          >
            <div className="quick-action">
              <TeamOutlined className="action-icon" />
              <div className="action-content">
                <h3>Manage Users</h3>
                <p>View and manage user accounts</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title="Quick Actions" 
            className="dashboard-card"
            onClick={() => navigate('/dashboard/orders')}
          >
            <div className="quick-action">
              <OrderedListOutlined className="action-icon" />
              <div className="action-content">
                <h3>Manage Orders</h3>
                <p>View and process orders</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title="Quick Actions" 
            className="dashboard-card"
            onClick={() => navigate('/dashboard/transactions')}
          >
            <div className="quick-action">
              <HistoryOutlined className="action-icon" />
              <div className="action-content">
                <h3>Transaction History</h3>
                <p>View transaction records</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );

  return (
    <div className="dashboard-layout">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
          className="dashboard-menu"
        />
      </div>
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/orders" element={<OrderManagementPage />} />
          <Route path="/transactions" element={<TransactionHistoryPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard; 