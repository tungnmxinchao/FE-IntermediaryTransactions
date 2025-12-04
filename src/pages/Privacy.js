import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <div className="privacy-header">
          <h1>Chính sách bảo mật</h1>
          <p className="privacy-subtitle">
            Cam kết bảo vệ thông tin cá nhân của bạn
          </p>
          <p className="last-updated">Cập nhật lần cuối: 01 tháng 12, 2024</p>
        </div>

        <div className="privacy-content">
        <section className="privacy-section">
          <h2>1. Thông tin chúng tôi thu thập</h2>
          <div className="section-content">
            <h3>1.1 Thông tin bạn cung cấp</h3>
            <ul>
              <li>Thông tin đăng ký tài khoản (tên, email, số điện thoại)</li>
              <li>Thông tin xác thực danh tính cho giao dịch sản phẩm số</li>
              <li>Thông tin giao dịch tài khoản game và lịch sử sử dụng</li>
              <li>Thông tin liên hệ khi bạn gửi yêu cầu hỗ trợ</li>
            </ul>

              <h3>1.2 Thông tin chúng tôi tự động thu thập</h3>
              <ul>
                <li>Địa chỉ IP và thông tin thiết bị</li>
                <li>Dữ liệu về cách bạn sử dụng nền tảng</li>
                <li>Cookies và công nghệ theo dõi tương tự</li>
                <li>Thông tin vị trí (nếu bạn cho phép)</li>
              </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2>2. Cách chúng tôi sử dụng thông tin</h2>
            <div className="section-content">
            <ul>
              <li><strong>Cung cấp dịch vụ:</strong> Xử lý giao dịch tài khoản game và sản phẩm số</li>
              <li><strong>Bảo mật:</strong> Ngăn chặn gian lận và bảo vệ giao dịch sản phẩm số</li>
              <li><strong>Hỗ trợ khách hàng:</strong> Giải quyết vấn đề về tài khoản game và giao dịch</li>
              <li><strong>Tương tác:</strong> Gửi thông báo quan trọng về tài khoản game và giao dịch</li>
              <li><strong>Cải thiện:</strong> Phân tích xu hướng gaming và nâng cao trải nghiệm người dùng</li>
            </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2>3. Chia sẻ thông tin</h2>
            <div className="section-content">
              <p>Chúng tôi cam kết không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. Thông tin chỉ được chia sẻ trong các trường hợp sau:</p>
              <ul>
                <li>Với sự đồng ý rõ ràng của bạn</li>
                <li>Để tuân thủ yêu cầu pháp lý</li>
                <li>Để bảo vệ quyền lợi và an toàn của người dùng</li>
                <li>Với các nhà cung cấp dịch vụ đáng tin cậy (đã ký thỏa thuận bảo mật)</li>
              </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2>4. Bảo mật thông tin</h2>
            <div className="section-content">
              <p>Chúng tôi áp dụng các biện pháp bảo mật tiên tiến để bảo vệ thông tin của bạn:</p>
              <ul>
                <li>Mã hóa dữ liệu trong quá trình truyền tải và lưu trữ</li>
                <li>Hệ thống giám sát bảo mật 24/7</li>
                <li>Kiểm soát truy cập nghiêm ngặt</li>
                <li>Đào tạo nhân viên về bảo mật thông tin</li>
                <li>Sao lưu dữ liệu thường xuyên</li>
              </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2>5. Quyền của bạn</h2>
            <div className="section-content">
              <p>Bạn có các quyền sau đối với thông tin cá nhân của mình:</p>
              <ul>
                <li><strong>Truy cập:</strong> Yêu cầu biết thông tin nào đang được lưu trữ</li>
                <li><strong>Sửa đổi:</strong> Cập nhật thông tin cá nhân của bạn</li>
                <li><strong>Xóa:</strong> Yêu cầu xóa thông tin cá nhân (theo quy định pháp luật)</li>
                <li><strong>Hạn chế:</strong> Hạn chế việc xử lý thông tin trong một số trường hợp</li>
                <li><strong>Phản đối:</strong> Phản đối việc xử lý thông tin cho mục đích marketing</li>
              </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2>6. Cookies và công nghệ theo dõi</h2>
            <div className="section-content">
              <p>Chúng tôi sử dụng cookies để cải thiện trải nghiệm người dùng:</p>
              <ul>
                <li><strong>Cookies cần thiết:</strong> Để nền tảng hoạt động bình thường</li>
                <li><strong>Cookies phân tích:</strong> Để hiểu cách bạn sử dụng dịch vụ</li>
                <li><strong>Cookies marketing:</strong> Để hiển thị quảng cáo phù hợp</li>
              </ul>
              <p>Bạn có thể quản lý cài đặt cookies thông qua trình duyệt của mình.</p>
            </div>
          </section>

          <section className="privacy-section">
            <h2>7. Thời gian lưu trữ</h2>
            <div className="section-content">
              <p>Chúng tôi chỉ lưu trữ thông tin cá nhân trong thời gian cần thiết:</p>
              <ul>
                <li>Thông tin tài khoản: Trong suốt thời gian bạn sử dụng dịch vụ</li>
                <li>Thông tin giao dịch: 7 năm theo quy định pháp luật</li>
                <li>Thông tin liên hệ: 3 năm sau lần tương tác cuối cùng</li>
              </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2>8. Thay đổi chính sách</h2>
            <div className="section-content">
              <p>Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Khi có thay đổi quan trọng, chúng tôi sẽ:</p>
              <ul>
                <li>Thông báo qua email hoặc thông qua nền tảng</li>
                <li>Đưa ra thời gian hợp lý để bạn xem xét thay đổi</li>
                <li>Yêu cầu sự đồng ý nếu cần thiết</li>
              </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2>9. Liên hệ với chúng tôi</h2>
            <div className="section-content">
              <p>Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng liên hệ:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> privacy@trunggian.vn</p>
                <p><strong>Điện thoại:</strong> +84 123 456 789</p>
                <p><strong>Địa chỉ:</strong> Tầng 10, Tòa nhà ABC, 123 Đường DEF, Hà Nội</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

