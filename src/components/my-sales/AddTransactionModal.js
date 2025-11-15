import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TINYMCE_API_KEY, DEFAULT_EDITOR_CONFIG, COMPACT_EDITOR_CONFIG } from '../../config/editor';
import ConfirmModal from '../common/ConfirmModal';
import './AddTransactionModal.css';

// Hàm format VND
const formatCurrency = (amount) => {
  if (amount === '' || amount === null) return '';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

// Parse giá từ string format về number
const parseCurrency = (formatted) => {
  if (!formatted) return 0;
  return Number(formatted.replace(/[^0-9]/g, ''));
};

const AddTransactionModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    topic: '',
    price: '', // lưu dạng number
    feeBearer: 'buyer',
    description: '',
    contact: '',
    hiddenContent: '',
    isPublic: true
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      if (name === 'visibility') {
        setFormData(prev => ({
          ...prev,
          isPublic: value === 'public'
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Xử lý input price format VND
  const handlePriceChange = (e) => {
    const value = e.target.value;
    const numberValue = parseCurrency(value);
    setFormData(prev => ({
      ...prev,
      price: numberValue
    }));
  };

  const handleEditorChange = (name) => (content) => {
    setFormData(prev => ({
      ...prev,
      [name]: content
    }));
  };

  // Khi bấm "Thêm mới", mở modal xác nhận
  const handleAddClick = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    onSubmit(formData);
    setShowConfirmModal(false);
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Thêm giao dịch mới</h2>
            <button className="close-button" onClick={onClose}>&times;</button>
          </div>

          <form className="add-transaction-form">
            <div className="form-group">
              <label htmlFor="topic">Chủ đề trung gian *</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Giá tiền *</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price !== '' ? formatCurrency(formData.price) : ''}
                onChange={handlePriceChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Bên chịu phí trung gian *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="feeBearer"
                    value="buyer"
                    checked={formData.feeBearer === 'buyer'}
                    onChange={handleChange}
                  />
                  Bên mua
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="feeBearer"
                    value="seller"
                    checked={formData.feeBearer === 'seller'}
                    onChange={handleChange}
                  />
                  Bên bán
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Mô tả *</label>
              <Editor
                apiKey={TINYMCE_API_KEY}
                init={DEFAULT_EDITOR_CONFIG}
                onEditorChange={handleEditorChange('description')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Phương thức liên hệ *</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hiddenContent">Nội dung ẩn</label>
              <Editor
                apiKey={TINYMCE_API_KEY}
                init={COMPACT_EDITOR_CONFIG}
                onEditorChange={handleEditorChange('hiddenContent')}
              />
            </div>

            <div className="form-group">
              <label>Hiện công khai *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={formData.isPublic}
                    onChange={handleChange}
                  />
                  Hiện công khai
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={!formData.isPublic}
                    onChange={handleChange}
                  />
                  Ẩn
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={onClose}>
                Đóng
              </button>
              <button type="button" className="submit-button" onClick={handleAddClick}>
                Thêm mới
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal xác nhận */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
        title="Xác nhận tạo giao dịch"
        message={`Phí tạo đơn là 5,000 VND trên 1 đơn.\nPhí sàn: 5% đơn (bên ${formData.feeBearer === 'buyer' ? 'mua' : 'bán'} chịu)`}
      />
    </>
  );
};

export default AddTransactionModal;
