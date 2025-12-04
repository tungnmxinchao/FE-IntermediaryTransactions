import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      details: ["support@trunggian.vn", "business@trunggian.vn"],
      description: "Phản hồi trong 24 giờ"
    },
    {
      icon: "📞",
      title: "Điện thoại",
      details: ["+84 123 456 789", "+84 987 654 321"],
      description: "Hỗ trợ 24/7"
    },
    {
      icon: "🏢",
      title: "Văn phòng",
      details: ["Tầng 10, Tòa nhà ABC", "123 Đường DEF, Quận GHI", "Hà Nội, Việt Nam"],
      description: "Giờ làm việc: 8:00 - 18:00"
    },
    {
      icon: "💬",
      title: "Chat trực tuyến",
      details: ["trunggian.vn/chat"],
      description: "Hỗ trợ tức thời"
    }
  ];

  const faqs = [
    {
      question: "Làm thế nào để đăng ký tài khoản?",
      answer: "Bạn có thể đăng ký tài khoản bằng cách nhấp vào nút 'Đăng ký' trên trang chủ và điền đầy đủ thông tin cần thiết."
    },
    {
      question: "Tôi quên mật khẩu, phải làm sao?",
      answer: "Nhấp vào 'Quên mật khẩu' trên trang đăng nhập và làm theo hướng dẫn để đặt lại mật khẩu."
    },
    {
      question: "Giao dịch của tôi mất bao lâu để hoàn thành?",
      answer: "Thời gian xử lý giao dịch thường từ 5-15 phút, tùy thuộc vào loại giao dịch và xác minh bảo mật."
    },
    {
      question: "Tôi có thể liên hệ hỗ trợ bằng cách nào?",
      answer: "Bạn có thể liên hệ qua email, điện thoại, chat trực tuyến hoặc gửi form liên hệ trên trang này."
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Liên hệ với chúng tôi</h1>
          <p className="contact-subtitle">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-section">
            <h2>Gửi tin nhắn cho chúng tôi</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Họ và tên *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">Danh mục</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="general">Tổng quan</option>
                  <option value="technical">Hỗ trợ kỹ thuật</option>
                  <option value="billing">Thanh toán</option>
                  <option value="partnership">Hợp tác kinh doanh</option>
                  <option value="complaint">Khiếu nại</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Tiêu đề *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Tiêu đề tin nhắn"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Nội dung tin nhắn *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Mô tả chi tiết vấn đề của bạn..."
                  rows="6"
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </button>

              {submitMessage && (
                <div className="submit-message">
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          <div className="contact-info-section">
            <h2>Thông tin liên hệ</h2>
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-item">
                  <div className="contact-info-icon">{info.icon}</div>
                  <div className="contact-info-content">
                    <h3>{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx}>{detail}</p>
                    ))}
                    <span className="contact-description">{info.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="faq-section">
          <h2>Câu hỏi thường gặp</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="faq-link">
            <a href="/faq">Xem thêm câu hỏi thường gặp →</a>
          </div>
        </section>

        <section className="map-section">
          <h2>Vị trí văn phòng</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <div className="map-icon">📍</div>
              <h3>Trung Gian Headquarters</h3>
              <p>Tầng 10, Tòa nhà ABC<br />123 Đường DEF, Quận GHI<br />Hà Nội, Việt Nam</p>
              <p className="map-note">* Bản đồ sẽ được tích hợp khi hệ thống hoàn thiện</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
