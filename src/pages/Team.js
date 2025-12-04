import React from 'react';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      name: "Nguyễn Văn A",
      position: "Giám đốc điều hành",
      bio: "Với hơn 10 năm kinh nghiệm trong lĩnh vực game và sản phẩm số, ông Nguyễn dẫn dắt đội ngũ phát triển nền tảng giao dịch an toàn và hiệu quả cho cộng đồng game thủ.",
      image: "👨‍💼",
      experience: "10+ năm",
      expertise: "Quản lý sản phẩm số, Chiến lược gaming"
    },
    {
      name: "Trần Thị B",
      position: "Giám đốc công nghệ",
      bio: "Chuyên gia công nghệ với nền tảng vững chắc về bảo mật thông tin và kiến trúc hệ thống phân tán cho giao dịch tài khoản game và sản phẩm số.",
      image: "👩‍💻",
      experience: "8+ năm",
      expertise: "Bảo mật sản phẩm số, Kiến trúc hệ thống"
    },
    {
      name: "Lê Văn C",
      position: "Trưởng phòng phát triển",
      bio: "Lãnh đạo đội ngũ kỹ thuật, đảm bảo chất lượng code và hiệu suất hệ thống luôn đạt tiêu chuẩn cao nhất cho giao dịch sản phẩm số.",
      image: "👨‍💻",
      experience: "7+ năm",
      expertise: "Full-stack Development, DevOps gaming"
    },
    {
      name: "Phạm Thị D",
      position: "Trưởng phòng kinh doanh",
      bio: "Chuyên gia marketing và kinh doanh với kinh nghiệm mở rộng thị trường game và phát triển đối tác chiến lược trong lĩnh vực sản phẩm số.",
      image: "👩‍💼",
      experience: "6+ năm",
      expertise: "Marketing gaming, Quan hệ đối tác số"
    },
    {
      name: "Hoàng Văn E",
      position: "Trưởng phòng bảo mật",
      bio: "Chuyên gia an ninh mạng, đảm bảo hệ thống luôn được bảo vệ trước các mối đe dọa tiềm ẩn trong giao dịch tài khoản game và sản phẩm số.",
      image: "👨‍⚖️",
      experience: "9+ năm",
      expertise: "Cybersecurity, Compliance sản phẩm số"
    },
    {
      name: "Đỗ Thị F",
      position: "Trưởng phòng chăm sóc khách hàng",
      bio: "Đảm bảo trải nghiệm người dùng tuyệt vời thông qua dịch vụ chăm sóc khách hàng chuyên nghiệp 24/7 cho cộng đồng game thủ và người dùng sản phẩm số.",
      image: "👩‍💼",
      experience: "5+ năm",
      expertise: "Customer Experience gaming, Support số"
    }
  ];

  const advisors = [
    {
      name: "PGS.TS Nguyễn Văn G",
      position: "Cố vấn kỹ thuật",
      bio: "Giảng viên Đại học Công nghệ, chuyên gia về trí tuệ nhân tạo và bảo mật thông tin.",
      image: "👨‍🏫",
      organization: "Đại học Công nghệ Quốc gia"
    },
    {
      name: "TS. Trần Thị H",
      position: "Cố vấn kinh doanh",
      bio: "Chuyên gia tư vấn chiến lược kinh doanh với kinh nghiệm tại các công ty fintech hàng đầu.",
      image: "👩‍💼",
      organization: "Tập đoàn FinTech Việt Nam"
    }
  ];

  return (
    <div className="team-page">
      <div className="team-container">
        <div className="team-header">
          <h1>Đội ngũ của chúng tôi</h1>
          <p className="team-subtitle">
            Những con người đằng sau sự thành công của Green Transfer
          </p>
        </div>

        <section className="team-section">
          <h2>Ban lãnh đạo</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-avatar">
                  {member.image}
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-details">
                    <div className="detail-item">
                      <span className="detail-label">Kinh nghiệm:</span>
                      <span className="detail-value">{member.experience}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Chuyên môn:</span>
                      <span className="detail-value">{member.expertise}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="team-section">
          <h2>Ban cố vấn</h2>
          <div className="advisors-grid">
            {advisors.map((advisor, index) => (
              <div key={index} className="advisor-card">
                <div className="advisor-avatar">
                  {advisor.image}
                </div>
                <div className="advisor-info">
                  <h3>{advisor.name}</h3>
                  <p className="advisor-position">{advisor.position}</p>
                  <p className="advisor-organization">{advisor.organization}</p>
                  <p className="advisor-bio">{advisor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="team-section">
          <h2>Văn hóa làm việc số</h2>
          <div className="culture-grid">
            <div className="culture-item">
              <div className="culture-icon">🎮</div>
              <h3>Game First</h3>
              <p>Đội ngũ chúng tôi luôn hướng tới mục tiêu tạo ra giá trị thực sự cho cộng đồng game thủ</p>
            </div>
            <div className="culture-item">
              <div className="culture-icon">🤝</div>
              <h3>Hợp tác</h3>
              <p>Môi trường làm việc đề cao tinh thần hợp tác và hỗ trợ lẫn nhau cho cộng đồng số</p>
            </div>
            <div className="culture-item">
              <div className="culture-icon">🚀</div>
              <h3>Đổi mới số</h3>
              <p>Khuyến khích sáng tạo và áp dụng công nghệ mới vào sản phẩm số</p>
            </div>
            <div className="culture-item">
              <div className="culture-icon">📈</div>
              <h3>Phát triển kỹ năng</h3>
              <p>Cam kết đầu tư vào việc học tập và phát triển kỹ năng số của nhân viên</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="join-team">
            <h2>Tham gia cùng chúng tôi</h2>
            <p>
              Chúng tôi luôn tìm kiếm những tài năng mới để cùng xây dựng tương lai của nền tảng giao dịch.
              Nếu bạn đam mê công nghệ và muốn tạo ra sự khác biệt, hãy tham gia đội ngũ của chúng tôi.
            </p>
            <a href="/careers" className="join-button">Xem cơ hội việc làm</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;

