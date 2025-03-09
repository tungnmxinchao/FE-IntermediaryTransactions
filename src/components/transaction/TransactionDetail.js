import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import { TINYMCE_API_KEY, DEFAULT_EDITOR_CONFIG } from '../../config/editor';
import './TransactionDetail.css';

const TransactionDetail = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({
    id: 1,
    code: "TRX001",
    seller: "Nguyễn Văn A",
    status: "Đang chờ người mua",
    topic: "Mua bán xe máy Honda Wave Alpha 2023 - Xe nhập khẩu chính hãng",
    price: 25000000,
    feeBearer: "buyer",
    fee: 250000,
    totalBuyerPay: 25250000,
    sellerReceive: 25000000,
    description: "<p>Xe máy Honda Wave Alpha 2023 mới 100%</p><ul><li>Màu: Đỏ</li><li>Xuất xứ: Nhập khẩu chính hãng</li><li>Bảo hành: 12 tháng</li></ul>",
    contactMethod: "Zalo: 0123456789",
    hiddenContent: "<p>Địa chỉ giao dịch: 123 Đường ABC, Quận XYZ</p>",
    isPublic: true,
    createdAt: "2024-03-07T10:30:00",
    updatedAt: "2024-03-07T10:30:00",
    shareLink: "https://example.com/transaction/TRX001"
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'radio') {
      if (name === 'feeBearer') {
        setTransaction(prev => ({
          ...prev,
          feeBearer: value,
          fee: prev.price * 0.01, // 1% of price
          totalBuyerPay: value === 'buyer' ? prev.price + (prev.price * 0.01) : prev.price,
          sellerReceive: value === 'seller' ? prev.price - (prev.price * 0.01) : prev.price
        }));
      } else if (name === 'visibility') {
        setTransaction(prev => ({
          ...prev,
          isPublic: value === 'public'
        }));
      }
    } else if (name === 'price') {
      const newPrice = parseFloat(value);
      const newFee = newPrice * 0.01;
      setTransaction(prev => ({
        ...prev,
        price: newPrice,
        fee: newFee,
        totalBuyerPay: prev.feeBearer === 'buyer' ? newPrice + newFee : newPrice,
        sellerReceive: prev.feeBearer === 'seller' ? newPrice - newFee : newPrice
      }));
    } else {
      setTransaction(prev => ({
        ...prev,
        [name]: value,
        updatedAt: new Date().toISOString()
      }));
    }
  };

  const handleEditorChange = (content, editor) => {
    const fieldName = editor.id;
    setTransaction(prev => ({
      ...prev,
      [fieldName]: content,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleUpdate = () => {
    // Giả lập cập nhật thành công
    alert('Cập nhật thành công!');
    console.log('Updated transaction:', transaction);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(transaction.shareLink);
    alert('Đã sao chép link chia sẻ!');
  };

  return (
    <div className="transaction-detail">
      <div className="detail-header">
        <div className="header-content">
          <h1>Chi tiết giao dịch</h1>
          <div className="transaction-status">
            <span className={`status-badge ${transaction.status.toLowerCase().replace(/\s+/g, '-')}`}>
              {transaction.status}
            </span>
          </div>
        </div>
        <button className="update-button" onClick={handleUpdate}>
          Cập nhật
        </button>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <div className="detail-row">
            <div className="detail-label">Mã trung gian</div>
            <div className="detail-value editable">
              <input
                type="text"
                name="code"
                value={transaction.code}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="detail-row">
            <div className="detail-label">Người bán</div>
            <div className="detail-value">{transaction.seller}</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Chủ đề trung gian</div>
            <div className="detail-value editable">
              <input
                type="text"
                name="topic"
                value={transaction.topic}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Giá tiền</div>
            <div className="detail-value editable">
              <input
                type="number"
                name="price"
                value={transaction.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Bên chịu phí</div>
            <div className="detail-value editable">
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="feeBearer"
                    value="buyer"
                    checked={transaction.feeBearer === 'buyer'}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">Người mua</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="feeBearer"
                    value="seller"
                    checked={transaction.feeBearer === 'seller'}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">Người bán</span>
                </label>
              </div>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Phí trung gian</div>
            <div className="detail-value read-only">
              {transaction.fee.toLocaleString('vi-VN')} VNĐ
            </div>
          </div>

          <div className="detail-row highlight">
            <div className="detail-label">Tổng tiền bên mua thanh toán</div>
            <div className="detail-value read-only">
              {transaction.totalBuyerPay.toLocaleString('vi-VN')} VNĐ
            </div>
          </div>

          <div className="detail-row highlight">
            <div className="detail-label">Tiền bên bán thực nhận</div>
            <div className="detail-value read-only">
              {transaction.sellerReceive.toLocaleString('vi-VN')} VNĐ
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Hiện công khai</div>
            <div className="detail-value editable">
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={transaction.isPublic}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">Hiện công khai</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={!transaction.isPublic}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">Riêng tư</span>
                </label>
              </div>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Thời gian tạo</div>
            <div className="detail-value read-only">
              {new Date(transaction.createdAt).toLocaleString('vi-VN')}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Cập nhật cuối</div>
            <div className="detail-value read-only">
              {new Date(transaction.updatedAt).toLocaleString('vi-VN')}
            </div>
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-row full-width">
            <div className="detail-label">Mô tả</div>
            <div className="detail-value rich-text editable">
              <Editor
                id="description"
                apiKey={TINYMCE_API_KEY}
                init={DEFAULT_EDITOR_CONFIG}
                initialValue={transaction.description}
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Phương thức liên hệ</div>
            <div className="detail-value">{transaction.contactMethod}</div>
          </div>

          <div className="detail-row full-width">
            <div className="detail-label">Nội dung ẩn</div>
            <div className="detail-value rich-text editable">
              <Editor
                id="hiddenContent"
                apiKey={TINYMCE_API_KEY}
                init={DEFAULT_EDITOR_CONFIG}
                initialValue={transaction.hiddenContent}
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>
        </div>

        <div className="share-link-section">
          <div className="detail-row">
            <div className="detail-label">Link chia sẻ</div>
            <div className="share-link">
              <input type="text" value={transaction.shareLink} readOnly />
              <button onClick={handleCopyShareLink}>
                Sao chép
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail; 