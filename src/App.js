import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaChevronDown, FaUser, FaWallet, FaEye } from 'react-icons/fa';
import PublicMarket from './components/public-market/PublicMarket';
import MySales from './components/my-sales/MySales';
import MyPurchases from './components/my-purchases/MyPurchases';
import TransactionDetail from './components/transaction/TransactionDetail';
import Footer from './components/footer/Footer';
import NotificationBell from './components/notifications/NotificationBell';
import TransactionHistory from './components/transaction-history/TransactionHistory';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/profile/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  return (
    <main className="main-content">
      <section className="hero-section">
        <h1>Chào mừng đến với nền tảng giao dịch trung gian</h1>
        <p>Kết nối người mua và người bán một cách an toàn và hiệu quả</p>
      </section>

      <div className="dashboard-grid">
        <Link to="/public-market" className="dashboard-card public-market">
          <h2>Chợ công khai</h2>
          <div className="card-content">
            <p>Xem và tham gia các giao dịch công khai</p>
            <button className="action-button">Xem chợ</button>
          </div>
        </Link>

        {isAuthenticated && (
          <>
            <Link to="/my-sales" className="dashboard-card my-sales">
              <h2>Đơn bán của tôi</h2>
              <div className="card-content">
                <p>Quản lý các đơn hàng bán của bạn</p>
                <button className="action-button">Xem đơn bán</button>
              </div>
            </Link>

            <Link to="/my-purchases" className="dashboard-card my-purchases">
              <h2>Đơn mua của tôi</h2>
              <div className="card-content">
                <p>Quản lý các đơn hàng mua của bạn</p>
                <button className="action-button">Xem đơn mua</button>
              </div>
            </Link>

          </>
        )}
      </div>
    </main>
  );
};

const AppContent = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userInfo, logout } = useAuth();
  const [showManagementDropdown, setShowManagementDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [userMoney, setUserMoney] = useState(null);
  const dropdownRef = useRef(null);

  const fetchUserMoney = async () => {
    if (isAuthenticated) {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`https://localhost:7054/api/Users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.code === 200) {
            setUserMoney(data.data.money);
          }
        }
      } catch (error) {
        console.error('Error fetching user money:', error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowManagementDropdown(false);
        setShowAccountDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAccountDropdownToggle = () => {
    if (!showAccountDropdown) {
      fetchUserMoney();
    }
    setShowAccountDropdown(!showAccountDropdown);
    setShowManagementDropdown(false);
  };

  const handleManagementDropdownToggle = () => {
    setShowManagementDropdown(!showManagementDropdown);
    setShowAccountDropdown(false);
  };

  const handleLogout = () => {
    logout();
    setShowAccountDropdown(false);
    navigate('/login', { replace: true });
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">Intermediary Transactions</div>
        <div className="nav-links">
          <Link to="/home">Trang chủ</Link>
          <Link to="/public-market">Chợ công khai</Link>
          {isAuthenticated ? (
            <>
              {userInfo?.userRole === 'Admin' && (
                <Link to="/dashboard" className="admin-link">Dashboard</Link>
              )}
              <div className="dropdown" ref={dropdownRef}>
                <button 
                  className="dropdown-toggle"
                  onClick={handleManagementDropdownToggle}
                >
                  Quản lý <FaChevronDown />
                </button>
                {showManagementDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/my-sales">Đơn bán của tôi</Link>
                    <Link to="/my-purchases">Đơn mua của tôi</Link>
                    <Link to="/transaction-history">Lịch sử giao dịch</Link>
                  </div>
                )}
              </div>
              <div className="user-account-dropdown">
                <button 
                  className="user-account-toggle"
                  onClick={handleAccountDropdownToggle}
                >
                  <FaUser /> {userInfo?.userName} <FaChevronDown />
                </button>
                {showAccountDropdown && (
                  <div className="user-account-menu">
                    <div className="user-info">
                      <FaUser className="user-icon" />
                      <div className="user-details">
                        <span className="username">{userInfo?.userName}</span>
                        <span className="user-email">{userInfo?.email}</span>
                      </div>
                    </div>
                    <div className="user-balance">
                      <FaWallet className="wallet-icon" />
                      <span className="balance">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(userMoney || 0)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <Link to="/profile" className="nav-links a">
                <FaEye /> Xem hồ sơ
              </Link>
              <NotificationBell />
              <button onClick={handleLogout} className="auth-button">
                <FaSignOutAlt /> Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">Đăng nhập</Link>
              <Link to="/register" className="auth-link">Đăng ký</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/public-market" element={<PublicMarket />} />
        <Route path="/my-sales" element={
          <ProtectedRoute>
            <MySales />
          </ProtectedRoute>
        } />
        <Route path="/my-purchases" element={
          <ProtectedRoute>
            <MyPurchases />
          </ProtectedRoute>
        } />
        <Route path="/transaction-history" element={
          <ProtectedRoute>
            <TransactionHistory />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/transaction/:id" element={
          <ProtectedRoute>
            <TransactionDetail />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
