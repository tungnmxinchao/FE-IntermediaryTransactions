import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PublicMarket from './components/public-market/PublicMarket';
import MySales from './components/my-sales/MySales';
import MyPurchases from './components/my-purchases/MyPurchases';
import TransactionDetail from './components/transaction/TransactionDetail';
import Footer from './components/footer/Footer';
import NotificationBell from './components/notifications/NotificationBell';
import TransactionHistory from './components/transaction-history/TransactionHistory';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">Intermediary Transactions</div>
          <div className="nav-links">
            <Link to="/">Trang chủ</Link>
            <Link to="/public-market">Chợ công khai</Link>
            <Link to="/my-sales">Đơn bán của tôi</Link>
            <Link to="/my-purchases">Đơn mua của tôi</Link>
            <Link to="/transaction-history">Lịch sử giao dịch</Link>
            <Link to="/profile">Tài khoản</Link>
            <NotificationBell />
            <Link to="/login" className="auth-link">Đăng nhập</Link>
            <Link to="/register" className="auth-link">Đăng ký</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
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
              </div>
            </main>
          } />
          <Route path="/public-market" element={<PublicMarket />} />
          <Route path="/my-sales" element={<MySales />} />
          <Route path="/my-purchases" element={<MyPurchases />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
