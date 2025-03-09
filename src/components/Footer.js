import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Về chúng tôi</h3>
          <ul>
            <li><Link to="/about">Giới thiệu</Link></li>
            <li><Link to="/team">Đội ngũ</Link></li>
            <li><Link to="/careers">Tuyển dụng</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Dịch vụ</h3>
          <ul>
            <li><Link to="/marketplace">Chợ công khai</Link></li>
            <li><Link to="/my-sales">Đơn bán của tôi</Link></li>
            <li><Link to="/my-purchases">Đơn mua của tôi</Link></li>
            <li><Link to="/support">Hỗ trợ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Chính sách</h3>
          <ul>
            <li><Link to="/privacy">Chính sách bảo mật</Link></li>
            <li><Link to="/terms">Điều khoản sử dụng</Link></li>
            <li><Link to="/refund">Chính sách hoàn tiền</Link></li>
            <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Kết nối</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Trung Gian. Tất cả các quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer; 