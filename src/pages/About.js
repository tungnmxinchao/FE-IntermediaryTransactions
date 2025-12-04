import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>Về Green Transfer</h1>
          <p className="about-subtitle">Nền tảng giao dịch trung gian xanh và đáng tin cậy</p>
        </div>

        <section className="about-section">
          <div className="about-content">
            <h2>Sứ mệnh của chúng tôi</h2>
            <p>
              Green Transfer được thành lập với sứ mệnh tạo ra một nền tảng giao dịch trung gian
              an toàn, minh bạch và hiệu quả cho các sản phẩm số. Chúng tôi kết nối người mua
              và người bán các tài khoản game, mạng xã hội, và các sản phẩm số khác trên toàn cầu.
              Chúng tôi cam kết bảo vệ quyền lợi của tất cả các bên tham gia, đảm bảo mọi giao dịch
              được thực hiện một cách công bằng, bảo mật và đáng tin cậy.
            </p>
          </div>
          <div className="about-image">
            <div className="mission-icon">🎮</div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-image">
            <div className="vision-icon">🌐</div>
          </div>
          <div className="about-content">
            <h2>Tầm nhìn</h2>
            <p>
              Trở thành nền tảng giao dịch trung gian hàng đầu châu Á cho các sản phẩm số,
              được cộng đồng game thủ và người dùng kỹ thuật số tin tưởng và lựa chọn.
              Chúng tôi hướng tới việc số hóa hoàn toàn quy trình giao dịch tài khoản game,
              mạng xã hội và các sản phẩm số, tạo ra trải nghiệm liền mạch và an toàn
              cho hàng triệu người dùng trên toàn cầu.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="about-content">
            <h2>Giá trị cốt lõi</h2>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">🎮</div>
                <h3>Chuyên sản phẩm số</h3>
                <p>Chuyên sâu về giao dịch tài khoản game, mạng xã hội và sản phẩm số</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🔒</div>
                <h3>An toàn</h3>
                <p>Đảm bảo mọi giao dịch được bảo vệ bởi hệ thống bảo mật tiên tiến</p>
              </div>
              <div className="value-item">
                <div className="value-icon">⚡</div>
                <h3>Hiệu quả</h3>
                <p>Quy trình giao dịch nhanh chóng, tiết kiệm thời gian và chi phí</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🤝</div>
                <h3>Tin cậy</h3>
                <p>Xây dựng lòng tin qua việc minh bạch và công bằng trong mọi giao dịch</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-content">
            <h2>Lịch sử phát triển</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date">2023</div>
                <div className="timeline-content">
                  <h4>Khởi nghiệp</h4>
                  <p>Ý tưởng về nền tảng giao dịch trung gian cho sản phẩm số ra đời</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2024</div>
                <div className="timeline-content">
                  <h4>Ra mắt Beta</h4>
                  <p>Phiên bản thử nghiệm với 1,000+ game thủ và người dùng đầu tiên</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2025</div>
                <div className="timeline-content">
                  <h4>Phiên bản chính thức</h4>
                  <p>Hệ thống hoàn thiện với đầy đủ tính năng giao dịch sản phẩm số và bảo mật cao</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-content">
            <h2>Thống kê</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Người dùng</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50,000+</div>
                <div className="stat-label">Giao dịch thành công</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Tỷ lệ thành công</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Hỗ trợ khách hàng</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
