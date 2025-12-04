import React from 'react';
import './Refund.css';

const Refund = () => {
  return (
    <div className="refund-page">
      <div className="refund-container">
        <div className="refund-header">
          <h1>Chính sách hoàn tiền</h1>
          <p className="refund-subtitle">
            Cam kết bảo vệ quyền lợi người dùng
          </p>
          <p className="last-updated">Cập nhật lần cuối: 01 tháng 12, 2024</p>
        </div>

        <div className="refund-content">
          <section className="refund-section">
            <h2>1. Nguyên tắc chung</h2>
            <div className="section-content">
              <p>
                Trung Gian cam kết bảo vệ quyền lợi của người dùng thông qua chính sách
                hoàn tiền công bằng và minh bạch. Chúng tôi hiểu rằng giao dịch trực tuyến
                có thể gặp rủi ro, vì vậy chúng tôi thiết lập quy trình hoàn tiền rõ ràng
                để xử lý các trường hợp phát sinh.
              </p>
            </div>
          </section>

          <section className="refund-section">
            <h2>2. Trường hợp được hoàn tiền</h2>
            <div className="section-content">
              <h3>2.1 Lỗi từ phía nền tảng</h3>
              <ul>
                <li>Giao dịch bị lỗi kỹ thuật dẫn đến thất bại</li>
                <li>Sai sót trong quá trình xử lý thanh toán</li>
                <li>Hệ thống bị hack hoặc mất an ninh</li>
                <li>Lỗi trong tính toán phí giao dịch</li>
              </ul>

              <h3>2.2 Vi phạm thỏa thuận</h3>
              <ul>
                <li>Người bán không giao hàng/dịch vụ như cam kết</li>
                <li>Hàng hóa/dịch vụ không đúng mô tả</li>
                <li>Giao dịch bị hủy do lỗi của cả hai bên</li>
                <li>Vi phạm chính sách của nền tảng</li>
              </ul>

              <h3>2.3 Yêu cầu của người dùng</h3>
              <ul>
                <li>Giao dịch chưa hoàn thành trong thời hạn quy định</li>
                <li>Đồng thuận hủy giao dịch của cả hai bên</li>
                <li>Người mua phát hiện vấn đề trước khi xác nhận</li>
              </ul>
            </div>
          </section>

          <section className="refund-section">
            <h2>3. Quy trình yêu cầu hoàn tiền</h2>
            <div className="section-content">
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Gửi yêu cầu</h4>
                    <p>Liên hệ bộ phận hỗ trợ với thông tin chi tiết về giao dịch và lý do hoàn tiền</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Xác minh</h4>
                    <p>Đội ngũ của chúng tôi sẽ xem xét và xác minh thông tin trong vòng 24-48 giờ</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Duyệt yêu cầu</h4>
                    <p>Nếu hợp lệ, yêu cầu sẽ được phê duyệt và chuyển sang xử lý</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Hoàn tiền</h4>
                    <p>Tiền sẽ được hoàn về phương thức thanh toán gốc trong 3-7 ngày làm việc</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="refund-section">
            <h2>4. Thời hạn yêu cầu</h2>
            <div className="section-content">
              <ul>
                <li><strong>Giao dịch thất bại:</strong> Trong vòng 7 ngày kể từ ngày giao dịch</li>
                <li><strong>Hàng hóa có vấn đề:</strong> Trong vòng 48 giờ sau khi nhận hàng</li>
                <li><strong>Dịch vụ không đúng:</strong> Trong vòng 7 ngày sau khi hoàn thành</li>
                <li><strong>Lỗi hệ thống:</strong> Trong vòng 30 ngày kể từ ngày phát hiện</li>
              </ul>
              <p className="note">
                ⚠️ <strong>Lưu ý:</strong> Quá thời hạn trên, chúng tôi có quyền từ chối yêu cầu hoàn tiền.
              </p>
            </div>
          </section>

          <section className="refund-section">
            <h2>5. Phí hoàn tiền</h2>
            <div className="section-content">
              <ul>
                <li><strong>Hoàn tiền do lỗi hệ thống:</strong> Miễn phí hoàn toàn</li>
                <li><strong>Hoàn tiền do lỗi người bán:</strong> Miễn phí</li>
                <li><strong>Hoàn tiền theo yêu cầu người mua:</strong> Có thể áp dụng phí xử lý 5%</li>
                <li><strong>Hoàn tiền qua thẻ tín dụng:</strong> Có thể mất 3-5 ngày làm việc</li>
              </ul>
            </div>
          </section>

          <section className="refund-section">
            <h2>6. Trường hợp không được hoàn tiền</h2>
            <div className="section-content">
              <p>Yêu cầu hoàn tiền sẽ bị từ chối trong các trường hợp sau:</p>
              <ul>
                <li>Giao dịch đã được xác nhận thành công và người mua hài lòng</li>
                <li>Yêu cầu hoàn tiền sau thời hạn quy định</li>
                <li>Không cung cấp đủ bằng chứng cho yêu cầu</li>
                <li>Vi phạm điều khoản sử dụng nền tảng</li>
                <li>Giao dịch liên quan đến hoạt động bất hợp pháp</li>
                <li>Người mua cố tình hủy giao dịch sau khi người bán đã thực hiện</li>
              </ul>
            </div>
          </section>

          <section className="refund-section">
            <h2>7. Phương thức hoàn tiền</h2>
            <div className="section-content">
              <p>Tiền sẽ được hoàn về phương thức thanh toán ban đầu:</p>
              <ul>
                <li><strong>Ví điện tử:</strong> Tức thời đến 24 giờ</li>
                <li><strong>Thẻ tín dụng/ghi nợ:</strong> 3-7 ngày làm việc</li>
                <li><strong>Chuyển khoản ngân hàng:</strong> 3-5 ngày làm việc</li>
                <li><strong>Tiền mặt:</strong> Thông qua điểm giao dịch (có phí)</li>
              </ul>
            </div>
          </section>

          <section className="refund-section">
            <h2>8. Khiếu nại và giải quyết</h2>
            <div className="section-content">
              <p>
                Nếu bạn không hài lòng với quyết định hoàn tiền, bạn có quyền khiếu nại
                trong vòng 30 ngày. Chúng tôi sẽ xem xét lại trường hợp và có thể mời
                cả hai bên tham gia hòa giải. Quyết định cuối cùng thuộc về Trung Gian.
              </p>
            </div>
          </section>

          <section className="refund-section">
            <h2>9. Liên hệ hỗ trợ</h2>
            <div className="section-content">
              <p>Để yêu cầu hoàn tiền hoặc có thắc mắc, vui lòng liên hệ:</p>
              <div className="contact-info">
                <p><strong>Email hỗ trợ:</strong> refund@trunggian.vn</p>
                <p><strong>Hotline:</strong> 1900 XXX XXX (24/7)</p>
                <p><strong>Chat trực tuyến:</strong> <a href="/support">trunggian.vn/support</a></p>
                <p><strong>Thời gian xử lý:</strong> 24-48 giờ làm việc</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Refund;
