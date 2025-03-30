import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Input, Modal, Form, message, Select, Row, Col, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, UserAddOutlined, ReloadOutlined } from '@ant-design/icons';
import { userService } from '../../services/userService';
import { toast } from 'react-toastify';
import './Dashboard.css';

const { RangePicker } = DatePicker;

const UserManagementPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filters, setFilters] = useState({
    id: '',
    username: '',
    email: '',
    isActive: 'all',
    role: 'all',
    createdAt: null,
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'Id',
      key: 'Id',
      sorter: true,
    },
    {
      title: 'Username',
      dataIndex: 'Username',
      key: 'Username',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Money',
      dataIndex: 'Money',
      key: 'Money',
      render: (money) => new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(money),
    },
    {
      title: 'Role',
      dataIndex: ['role', 'RoleName'],
      key: 'RoleName',
      render: (role) => (
        <Tag color={role === 'Admin' ? 'blue' : 'green'}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'IsActive',
      key: 'IsActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const buildFilterString = () => {
    const filterConditions = [];
    
    if (filters.id) {
      filterConditions.push(`Id eq ${filters.id}`);
    }
    if (filters.username) {
      filterConditions.push(`contains(Username,'${filters.username}')`);
    }
    if (filters.email) {
      filterConditions.push(`contains(Email,'${filters.email}')`);
    }
    if (filters.isActive !== 'all') {
      filterConditions.push(`IsActive eq ${filters.isActive === 'true'}`);
    }
    if (filters.role !== 'all') {
      filterConditions.push(`RoleId eq ${filters.role}`);
    }
    if (filters.createdAt) {
      const [startDate, endDate] = filters.createdAt;
      if (startDate && endDate) {
        filterConditions.push(`CreatedAt ge ${startDate.toISOString()} and CreatedAt le ${endDate.toISOString()}`);
      }
    }

    return filterConditions.length > 0 ? filterConditions.join(' and ') : undefined;
  };

  const fetchUsers = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const filterString = buildFilterString();
      const response = await userService.getUsers({
        filter: filterString,
        skip: (page - 1) * pageSize,
        top: pageSize,
      });
      setUsers(response.value);
      setTotal(response['@odata.count']);
    } catch (error) {
      toast.error('Failed to fetch users!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleTableChange = (pagination, filters, sorter) => {
    fetchUsers(pagination.current, pagination.pageSize);
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
      username: '',
      email: '',
      isActive: 'all',
      role: 'all',
      createdAt: null,
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (user) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: `This will permanently delete ${user.Username}'s account.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        toast.success('User deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
    });
  };

  const handleAddNew = () => {
    setIsCreating(true);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (isCreating) {
        // Create new user
        await userService.createUser({
          username: values.Username,
          passwordHash: values.Password,
          email: values.Email,
        });
        toast.success('User created successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Update existing user
        console.log('Form values:', values);
        toast.success('User updated successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      
      setIsModalVisible(false);
      form.resetFields();
      fetchUsers(); // Refresh the user list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setIsCreating(false);
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>User Management</h1>
        <div className="header-actions">
          <Button 
            type="primary" 
            icon={<UserAddOutlined />}
            onClick={handleAddNew}
          >
            Add New User
          </Button>
        </div>
      </div>

      <div className="content-card">
        <Row gutter={[16, 16]} className="filter-row">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search by ID"
              value={filters.id}
              onChange={(e) => handleFilterChange('id', e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search by Username"
              value={filters.username}
              onChange={(e) => handleFilterChange('username', e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search by Email"
              value={filters.email}
              onChange={(e) => handleFilterChange('email', e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Status"
              style={{ width: '100%' }}
              value={filters.isActive}
              onChange={(value) => handleFilterChange('isActive', value)}
              allowClear
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="true">Active</Select.Option>
              <Select.Option value="false">Inactive</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Role"
              style={{ width: '100%' }}
              value={filters.role}
              onChange={(value) => handleFilterChange('role', value)}
              allowClear
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="1">Admin</Select.Option>
              <Select.Option value="2">Customer</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <RangePicker
              style={{ width: '100%' }}
              value={filters.createdAt}
              onChange={(dates) => handleFilterChange('createdAt', dates)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button 
              icon={<ReloadOutlined />}
              onClick={handleResetFilters}
              style={{ width: '100%' }}
            >
              Reset Filters
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="Id"
          loading={loading}
          onChange={handleTableChange}
          pagination={{ 
            total,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} users`
          }}
        />
      </div>

      <Modal
        title={isCreating ? "Add New User" : "Edit User"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="Username"
            label="Username"
            rules={[{ required: true, message: 'Please input username!' }]}
          >
            <Input />
          </Form.Item>
          {isCreating && (
            <Form.Item
              name="Password"
              label="Password"
              rules={[{ required: true, message: 'Please input password!' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item
            name="Email"
            label="Email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please input valid email!' }
            ]}
          >
            <Input />
          </Form.Item>
          {!isCreating && (
            <>
              <Form.Item
                name="RoleId"
                label="Role"
                rules={[{ required: true, message: 'Please select role!' }]}
              >
                <Select>
                  <Select.Option value={1}>Admin</Select.Option>
                  <Select.Option value={2}>Customer</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="IsActive"
                label="Status"
                rules={[{ required: true, message: 'Please select status!' }]}
              >
                <Select>
                  <Select.Option value={true}>Active</Select.Option>
                  <Select.Option value={false}>Inactive</Select.Option>
                </Select>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagementPage; 