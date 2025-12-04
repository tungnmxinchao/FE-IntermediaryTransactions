import React, { useState } from 'react';
import './Careers.css';

const Careers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const jobOpenings = [
    {
      id: 1,
      title: "Frontend Developer",
      category: "technical",
      location: "Hà Nội",
      type: "Full-time",
      salary: "15-25 triệu VND",
      description: "Phát triển giao diện người dùng với React.js và các công nghệ frontend hiện đại",
      requirements: [
        "2+ năm kinh nghiệm với React.js",
        "Thành thạo HTML, CSS, JavaScript",
        "Kinh nghiệm với state management (Redux, Context API)",
        "Hiểu biết về responsive design"
      ],
      benefits: [
        "Lương thưởng cạnh tranh",
        "Bảo hiểm đầy đủ",
        "Môi trường làm việc năng động",
        "Cơ hội thăng tiến"
      ]
    },
    {
      id: 2,
      title: "Backend Developer",
      category: "technical",
      location: "Hà Nội",
      type: "Full-time",
      salary: "20-35 triệu VND",
      description: "Xây dựng và duy trì hệ thống backend với Node.js và .NET Core",
      requirements: [
        "3+ năm kinh nghiệm backend development",
        "Thành thạo Node.js hoặc .NET Core",
        "Kinh nghiệm với database (SQL, NoSQL)",
        "Hiểu biết về RESTful API và GraphQL"
      ],
      benefits: [
        "Lương thưởng hấp dẫn",
        "Tham gia dự án quốc tế",
        "Đào tạo chuyên môn",
        "Làm việc remote linh hoạt"
      ]
    },
    {
      id: 3,
      title: "Product Manager",
      category: "product",
      location: "Hà Nội",
      type: "Full-time",
      salary: "25-40 triệu VND",
      description: "Quản lý sản phẩm và định hướng chiến lược phát triển nền tảng",
      requirements: [
        "3+ năm kinh nghiệm Product Management",
        "Kinh nghiệm fintech/blockchain là lợi thế",
        "Kỹ năng phân tích và ra quyết định",
        "Tiếng Anh giao tiếp tốt"
      ],
      benefits: [
        "Lương thưởng theo KPI",
        "Tham gia hội đồng quản trị",
        "Cơ hội lãnh đạo team",
        "Đào tạo MBA (nếu cần)"
      ]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      category: "design",
      location: "Hà Nội",
      type: "Full-time",
      salary: "15-25 triệu VND",
      description: "Thiết kế trải nghiệm người dùng và giao diện cho sản phẩm fintech",
      requirements: [
        "2+ năm kinh nghiệm UI/UX Design",
        "Thành thạo Figma, Adobe XD",
        "Hiểu biết về design system",
        "Portfolio xuất sắc"
      ],
      benefits: [
        "Môi trường sáng tạo",
        "Thiết bị làm việc hiện đại",
        "Tham gia workshop quốc tế",
        "Làm việc với team dev chuyên nghiệp"
      ]
    },
    {
      id: 5,
      title: "Security Engineer",
      category: "technical",
      location: "Hà Nội",
      type: "Full-time",
      salary: "25-40 triệu VND",
      description: "Đảm bảo an ninh thông tin và bảo mật hệ thống giao dịch",
      requirements: [
        "3+ năm kinh nghiệm cybersecurity",
        "Chứng chỉ bảo mật (CISSP, CEH)",
        "Kinh nghiệm pentesting",
        "Hiểu biết về blockchain security"
      ],
      benefits: [
        "Lương thưởng cao",
        "Đào tạo chứng chỉ quốc tế",
        "Tham gia hội thảo bảo mật",
        "Cơ hội làm việc với Fortune 500"
      ]
    },
    {
      id: 6,
      title: "Business Development Manager",
      category: "business",
      location: "Hà Nội",
      type: "Full-time",
      salary: "20-35 triệu VND",
      description: "Mở rộng thị trường và phát triển quan hệ đối tác kinh doanh",
      requirements: [
        "2+ năm kinh nghiệm B2B sales",
        "Mạng lưới quan hệ rộng",
        "Kỹ năng đàm phán tốt",
        "Tiếng Anh thành thạo"
      ],
      benefits: [
        "Hoa hồng hấp dẫn",
        "Du lịch công tác",
        "Tham gia hội chợ quốc tế",
        "Mở rộng network cá nhân"
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả vị trí', count: jobOpenings.length },
    { id: 'technical', name: 'Kỹ thuật', count: jobOpenings.filter(job => job.category === 'technical').length },
    { id: 'product', name: 'Sản phẩm', count: jobOpenings.filter(job => job.category === 'product').length },
    { id: 'design', name: 'Thiết kế', count: jobOpenings.filter(job => job.category === 'design').length },
    { id: 'business', name: 'Kinh doanh', count: jobOpenings.filter(job => job.category === 'business').length }
  ];

  const filteredJobs = selectedCategory === 'all'
    ? jobOpenings
    : jobOpenings.filter(job => job.category === selectedCategory);

  const whyJoinUs = [
    {
      icon: "🚀",
      title: "Sự phát triển",
      description: "Cơ hội phát triển bản thân và thăng tiến nghề nghiệp"
    },
    {
      icon: "💰",
      title: "Lương thưởng cạnh tranh",
      description: "Mức lương và phúc lợi vượt trội trong ngành"
    },
    {
      icon: "🤝",
      title: "Môi trường làm việc",
      description: "Văn hóa doanh nghiệp đề cao hợp tác và sáng tạo"
    },
    {
      icon: "🌍",
      title: "Dự án quốc tế",
      description: "Tham gia vào các dự án có tầm ảnh hưởng toàn cầu"
    }
  ];

  return (
    <div className="careers-page">
      <div className="careers-container">
        <div className="careers-header">
          <h1>Tham gia cùng Trung Gian</h1>
          <p className="careers-subtitle">
            Xây dựng tương lai của nền tảng giao dịch fintech hàng đầu Việt Nam
          </p>
        </div>

        <section className="why-join-section">
          <h2>Tại sao chọn Trung Gian?</h2>
          <div className="why-join-grid">
            {whyJoinUs.map((item, index) => (
              <div key={index} className="why-join-item">
                <div className="why-join-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="jobs-section">
          <h2>Cơ hội việc làm</h2>

          <div className="job-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span className="job-location">📍 {job.location}</span>
                    <span className="job-type">💼 {job.type}</span>
                    <span className="job-salary">💰 {job.salary}</span>
                  </div>
                </div>

                <p className="job-description">{job.description}</p>

                <div className="job-details">
                  <div className="job-requirements">
                    <h4>Yêu cầu:</h4>
                    <ul>
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="job-benefits">
                    <h4>Quyền lợi:</h4>
                    <ul>
                      {job.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="apply-button">Ứng tuyển ngay</button>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <h2>Không tìm thấy vị trí phù hợp?</h2>
          <p>Gửi CV của bạn cho chúng tôi. Chúng tôi luôn tìm kiếm những tài năng mới!</p>
          <div className="contact-options">
            <div className="contact-option">
              <h3>📧 Email</h3>
              <p>hr@trunggian.vn</p>
            </div>
            <div className="contact-option">
              <h3>📞 Điện thoại</h3>
              <p>+84 123 456 789</p>
            </div>
            <div className="contact-option">
              <h3>🏢 Văn phòng</h3>
              <p>Tầng 10, Tòa nhà ABC<br />123 Đường DEF, Hà Nội</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;
