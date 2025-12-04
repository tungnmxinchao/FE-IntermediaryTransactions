import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const faqCategories = {
    general: {
      title: 'Câu hỏi chung',
      icon: '❓',
      questions: [
        {
          id: 'what-is-trunggian',
          question: 'Trung Gian là gì?',
          answer: 'Trung Gian là nền tảng giao dịch trung gian trực tuyến giúp kết nối người mua và người bán một cách an toàn, minh bạch. Chúng tôi cung cấp dịch vụ escrow để bảo vệ quyền lợi của cả hai bên trong giao dịch.'
        },
        {
          id: 'how-to-register',
          question: 'Làm thế nào để đăng ký tài khoản?',
          answer: 'Để đăng ký tài khoản, bạn nhấp vào nút "Đăng ký" trên trang chủ, điền đầy đủ thông tin cá nhân bao gồm tên, email, số điện thoại, và xác nhận email. Quá trình đăng ký mất khoảng 5 phút.'
        },
        {
          id: 'is-safe',
          question: 'Giao dịch trên Trung Gian có an toàn không?',
          answer: 'Có, chúng tôi áp dụng nhiều lớp bảo mật tiên tiến bao gồm mã hóa SSL, xác thực 2 yếu tố, và hệ thống escrow. Tỷ lệ thành công của giao dịch trên nền tảng đạt 99.9%.'
        },
        {
          id: 'fees',
          question: 'Phí dịch vụ của Trung Gian là bao nhiêu?',
          answer: 'Phí giao dịch dao động từ 1-2% tùy theo loại giao dịch. Phí nạp tiền thường miễn phí, phí rút tiền phụ thuộc vào phương thức bạn chọn. Chi tiết phí được hiển thị rõ ràng trước khi thực hiện giao dịch.'
        }
      ]
    },
    account: {
      title: 'Tài khoản & Bảo mật',
      icon: '🔐',
      questions: [
        {
          id: 'forgot-password',
          question: 'Tôi quên mật khẩu, phải làm sao?',
          answer: 'Nhấp vào "Quên mật khẩu" trên trang đăng nhập, nhập email đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu vào email của bạn trong vòng 5 phút.'
        },
        {
          id: 'change-email',
          question: 'Làm thế nào để thay đổi email đăng ký?',
          answer: 'Vào phần "Cài đặt tài khoản" trong profile, chọn "Thay đổi email" và làm theo hướng dẫn. Bạn cần xác nhận cả email cũ và email mới.'
        },
        {
          id: '2fa',
          question: 'Xác thực 2 yếu tố (2FA) có bắt buộc không?',
          answer: 'Không bắt buộc nhưng chúng tôi khuyến nghị bật 2FA để tăng cường bảo mật. Bạn có thể bật tính năng này trong phần "Bảo mật" của tài khoản.'
        },
        {
          id: 'account-suspended',
          question: 'Tài khoản của tôi bị tạm ngừng, lý do gì?',
          answer: 'Tài khoản có thể bị tạm ngừng do vi phạm chính sách, nghi ngờ hoạt động bất thường, hoặc yêu cầu xác minh bổ sung. Liên hệ hỗ trợ để được giải đáp cụ thể.'
        }
      ]
    },
    transactions: {
      title: 'Giao dịch',
      icon: '💱',
      questions: [
        {
          id: 'how-transaction-works',
          question: 'Quy trình giao dịch như thế nào?',
          answer: '1) Người bán đăng tin. 2) Người mua liên hệ thỏa thuận. 3) Người mua chuyển tiền vào escrow. 4) Người bán giao hàng. 5) Người mua xác nhận và tiền được giải phóng. Toàn bộ quá trình được giám sát bởi hệ thống.'
        },
        {
          id: 'escrow-what',
          question: 'Escrow là gì và tại sao cần thiết?',
          answer: 'Escrow là tài khoản trung gian giữ tiền của người mua cho đến khi giao dịch hoàn thành thành công. Điều này bảo vệ cả hai bên: người mua chắc chắn nhận được hàng, người bán chắc chắn nhận được tiền.'
        },
        {
          id: 'transaction-time',
          question: 'Giao dịch mất bao lâu để hoàn thành?',
          answer: 'Thời gian phụ thuộc vào loại giao dịch: giao dịch số thường 5-15 phút, giao dịch vật lý 1-7 ngày. Người bán có 48 giờ để giao hàng sau khi nhận tiền escrow.'
        },
        {
          id: 'cancel-transaction',
          question: 'Làm thế nào để hủy giao dịch?',
          answer: 'Giao dịch chỉ có thể hủy khi cả hai bên đồng thuận hoặc có tranh chấp. Liên hệ hỗ trợ để được hướng dẫn. Nếu hủy sau khi người bán đã giao hàng, có thể áp dụng phí.'
        }
      ]
    },
    payments: {
      title: 'Thanh toán',
      icon: '💳',
      questions: [
        {
          id: 'payment-methods',
          question: 'Trung Gian hỗ trợ những phương thức thanh toán nào?',
          answer: 'Chúng tôi hỗ trợ nhiều phương thức: chuyển khoản ngân hàng, ví điện tử (Momo, ZaloPay, ViettelPay), thẻ tín dụng/ghi nợ, và tiền mặt tại điểm giao dịch.'
        },
        {
          id: 'deposit-money',
          question: 'Làm thế nào để nạp tiền vào tài khoản?',
          answer: 'Vào phần "Nạp tiền" trong menu quản lý, chọn phương thức thanh toán, nhập số tiền và làm theo hướng dẫn. Tiền sẽ có trong tài khoản sau 5-30 phút tùy phương thức.'
        },
        {
          id: 'withdraw-money',
          question: 'Rút tiền có mất thời gian bao lâu?',
          answer: 'Thời gian xử lý: ví điện tử (tức thời), chuyển khoản (1-3 ngày), thẻ tín dụng (3-7 ngày). Phí rút tiền phụ thuộc vào phương thức và số tiền.'
        },
        {
          id: 'refund-process',
          question: 'Quy trình hoàn tiền như thế nào?',
          answer: 'Hoàn tiền được xử lý trong vòng 24-48 giờ sau khi yêu cầu được phê duyệt. Tiền sẽ được hoàn về phương thức thanh toán ban đầu. Chi tiết xem tại Chính sách hoàn tiền.'
        }
      ]
    },
    disputes: {
      title: 'Tranh chấp',
      icon: '⚖️',
      questions: [
        {
          id: 'dispute-what',
          question: 'Tranh chấp là gì và khi nào xảy ra?',
          answer: 'Tranh chấp xảy ra khi hai bên không thỏa thuận được về việc giao dịch. Điều này có thể do hàng không đúng mô tả, giao hàng trễ, hoặc vấn đề chất lượng.'
        },
        {
          id: 'how-report-dispute',
          question: 'Làm thế nào để báo tranh chấp?',
          answer: 'Trong trang chi tiết giao dịch, nhấp "Báo tranh chấp" và mô tả vấn đề chi tiết với bằng chứng. Đội ngũ hỗ trợ sẽ can thiệp và đưa ra quyết định công bằng.'
        },
        {
          id: 'dispute-resolution',
          question: 'Tranh chấp được giải quyết như thế nào?',
          answer: 'Chúng tôi xem xét bằng chứng từ cả hai bên, có thể yêu cầu thêm thông tin. Quyết định cuối cùng dựa trên chính sách và bằng chứng, thường trong vòng 3-7 ngày.'
        },
        {
          id: 'appeal-decision',
          question: 'Tôi không đồng ý với quyết định, có thể khiếu nại không?',
          answer: 'Có, bạn có thể khiếu nại trong vòng 30 ngày với bằng chứng mới. Chúng tôi sẽ xem xét lại và có thể mời cả hai bên tham gia hòa giải.'
        }
      ]
    }
  };

  const currentCategory = faqCategories[activeCategory];

  return (
    <div className="faq-page">
      <div className="faq-container">
        <div className="faq-header">
          <h1>Câu hỏi thường gặp</h1>
          <p className="faq-subtitle">
            Tìm câu trả lời nhanh cho những thắc mắc phổ biến
          </p>
        </div>

        <div className="faq-categories">
          {Object.entries(faqCategories).map(([key, category]) => (
            <button
              key={key}
              className={`category-button ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-title">{category.title}</span>
            </button>
          ))}
        </div>

        <div className="faq-content">
          <h2>{currentCategory.title}</h2>
          <div className="faq-list">
            {currentCategory.questions.map((item) => (
              <div key={item.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleItem(item.id)}
                >
                  <span>{item.question}</span>
                  <span className={`faq-toggle ${openItems.has(item.id) ? 'open' : ''}`}>
                    ▼
                  </span>
                </button>
                {openItems.has(item.id) && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="faq-help">
          <h3>Vẫn chưa tìm thấy câu trả lời?</h3>
          <p>
            Nếu bạn không tìm thấy câu trả lời cho câu hỏi của mình,
            đừng ngần ngại liên hệ với đội ngũ hỗ trợ của chúng tôi.
          </p>
          <div className="help-options">
            <a href="/contact" className="help-button">Liên hệ hỗ trợ</a>
            <a href="/support" className="help-button secondary">Trung tâm hỗ trợ</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
