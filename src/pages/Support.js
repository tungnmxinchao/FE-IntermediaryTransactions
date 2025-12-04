import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [activeTab, setActiveTab] = useState('general');

  const supportOptions = [
    {
      id: 'general',
      title: 'Hỗ trợ tổng quan',
      icon: '🛠️',
      description: 'Hướng dẫn sử dụng nền tảng giao dịch sản phẩm số và giải đáp thắc mắc chung',
      channels: [
        { name: 'Chat trực tuyến', response: 'Tức thời', available: '24/7' },
        { name: 'Email', response: 'Trong 24h', available: '24/7' },
        { name: 'Điện thoại', response: 'Trong 1h', available: '8:00-18:00' }
      ]
    },
    {
      id: 'gaming',
      title: 'Hỗ trợ Gaming',
      icon: '🎮',
      description: 'Giải quyết vấn đề về giao dịch tài khoản game và sản phẩm số',
      channels: [
        { name: 'Chat gaming', response: 'Tức thời', available: '24/7' },
        { name: 'Ticket gaming', response: 'Trong 2h', available: '24/7' },
        { name: 'Hotline gaming', response: 'Trong 30 phút', available: '8:00-22:00' }
      ]
    },
    {
      id: 'billing',
      title: 'Hỗ trợ thanh toán',
      icon: '💳',
      description: 'Giải quyết vấn đề về thanh toán và hoàn tiền cho giao dịch sản phẩm số',
      channels: [
        { name: 'Email thanh toán', response: 'Trong 12h', available: '24/7' },
        { name: 'Chat thanh toán', response: 'Trong 30 phút', available: '8:00-18:00' },
        { name: 'Hotline thanh toán', response: 'Trong 1h', available: '8:00-18:00' }
      ]
    },
    {
      id: 'security',
      title: 'Bảo mật & An toàn',
      icon: '🔒',
      description: 'Báo cáo vấn đề bảo mật và hỗ trợ khôi phục tài khoản game',
      channels: [
        { name: 'Đường dây nóng', response: 'Tức thời', available: '24/7' },
        { name: 'Email bảo mật', response: 'Trong 2h', available: '24/7' },
        { name: 'Chat bảo mật', response: 'Trong 15 phút', available: '24/7' }
      ]
    }
  ];

  const quickGuides = [
    {
      title: 'Bắt đầu sử dụng',
      steps: [
        'Tạo tài khoản và xác thực email',
        'Nạp tiền vào ví điện tử',
        'Tìm giao dịch phù hợp trên chợ',
        'Thực hiện giao dịch an toàn'
      ]
    },
    {
      title: 'Bảo mật tài khoản',
      steps: [
        'Kích hoạt 2FA (xác thực 2 yếu tố)',
        'Sử dụng mật khẩu mạnh',
        'Không chia sẻ thông tin đăng nhập',
        'Đăng xuất sau khi sử dụng'
      ]
    },
    {
      title: 'Thực hiện giao dịch',
      steps: [
        'Kiểm tra thông tin người bán/người mua',
        'Xác nhận chi tiết giao dịch',
        'Sử dụng hệ thống escrow để bảo vệ',
        'Đánh giá sau khi hoàn thành'
      ]
    }
  ];

  const currentSupport = supportOptions.find(option => option.id === activeTab);

  return (
    <div className="support-page">
      <div className="support-container">
        <div className="support-header">
          <h1>Trung tâm hỗ trợ</h1>
          <p className="support-subtitle">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn với mọi vấn đề về giao dịch sản phẩm số
          </p>
        </div>

        <div className="support-tabs">
          {supportOptions.map(option => (
            <button
              key={option.id}
              className={`support-tab ${activeTab === option.id ? 'active' : ''}`}
              onClick={() => setActiveTab(option.id)}
            >
              <span className="tab-icon">{option.icon}</span>
              <span className="tab-title">{option.title}</span>
            </button>
          ))}
        </div>

        <div className="support-content">
          <div className="support-description">
            <h2>{currentSupport.title}</h2>
            <p>{currentSupport.description}</p>
          </div>

          <div className="support-channels">
            <h3>Kênh hỗ trợ</h3>
            <div className="channels-grid">
              {currentSupport.channels.map((channel, index) => (
                <div key={index} className="channel-card">
                  <h4>{channel.name}</h4>
                  <div className="channel-info">
                    <span className="response-time">Phản hồi: {channel.response}</span>
                    <span className="availability">Khả dụng: {channel.available}</span>
                  </div>
                  <button className="contact-button">Liên hệ ngay</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="quick-guides">
          <h2>Hướng dẫn nhanh</h2>
          <div className="guides-grid">
            {quickGuides.map((guide, index) => (
              <div key={index} className="guide-card">
                <h3>{guide.title}</h3>
                <ol>
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        <section className="support-resources">
          <h2>Tài nguyên hữu ích</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>📚 Tài liệu hướng dẫn</h3>
              <p>Cẩm nang đầy đủ về cách sử dụng nền tảng</p>
              <a href="#docs" className="resource-link">Xem tài liệu</a>
            </div>
            <div className="resource-card">
              <h3>🎥 Video hướng dẫn</h3>
              <p>Hướng dẫn từng bước qua video</p>
              <a href="#videos" className="resource-link">Xem video</a>
            </div>
            <div className="resource-card">
              <h3>❓ Câu hỏi thường gặp</h3>
              <p>Giải đáp nhanh các thắc mắc phổ biến</p>
              <a href="/faq" className="resource-link">Xem FAQ</a>
            </div>
            <div className="resource-card">
              <h3>📞 Liên hệ trực tiếp</h3>
              <p>Đội ngũ hỗ trợ chuyên nghiệp</p>
              <a href="/contact" className="resource-link">Liên hệ</a>
            </div>
          </div>
        </section>

        <section className="emergency-contact">
          <h2>Trường hợp khẩn cấp</h2>
          <div className="emergency-content">
            <div className="emergency-icon">🚨</div>
            <div className="emergency-info">
              <h3>Hỗ trợ khẩn cấp 24/7</h3>
              <p>Nếu bạn gặp vấn đề bảo mật hoặc mất tiền, hãy liên hệ ngay:</p>
              <div className="emergency-contacts">
                <div className="emergency-contact-item">
                  <strong>Đường dây nóng:</strong> +84 911
                </div>
                <div className="emergency-contact-item">
                  <strong>Email khẩn cấp:</strong> emergency@trunggian.vn
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;

