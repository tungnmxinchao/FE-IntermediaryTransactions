import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Menu } from 'antd';
import { 
  UserOutlined, 
  ShoppingCartOutlined, 
  TransactionOutlined,
  DashboardOutlined,
  TeamOutlined,
  OrderedListOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import UserManagementPage from './UserManagementPage';
import OrderManagementPage from './OrderManagementPage';
import TransactionHistoryPage from './TransactionHistoryPage';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('overview');

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

  const Overview = () => (
    <>
      <h1 className="dashboard-title">Dashboard Overview</h1>
      
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="statistics-row">
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Orders"
              value={93}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Transactions"
              value={256}
              prefix={<TransactionOutlined />}
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