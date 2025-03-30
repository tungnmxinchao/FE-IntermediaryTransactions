import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
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

            <Link to="/transaction-history" className="dashboard-card transaction-history">
              <h2>Lịch sử giao dịch</h2>
              <div className="card-content">
                <p>Xem lịch sử các giao dịch của bạn</p>
                <button className="action-button">Xem lịch sử</button>
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
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/home', { replace: true });
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
              <div className="dropdown" ref={dropdownRef}>
                <button 
                  className="dropdown-toggle"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Quản lý <FaChevronDown />
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/my-sales">Đơn bán của tôi</Link>
                    <Link to="/my-purchases">Đơn mua của tôi</Link>
                    <Link to="/transaction-history">Lịch sử giao dịch</Link>
                  </div>
                )}
              </div>
              <Link to="/profile">Tài khoản ({userInfo?.userName})</Link>
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
            <div>Profile Page</div>
          </ProtectedRoute>
        } />
        <Route path="/transaction/:id" element={
          <ProtectedRoute>
            <TransactionDetail />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
