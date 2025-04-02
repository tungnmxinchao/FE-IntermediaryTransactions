import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TINYMCE_API_KEY, DEFAULT_EDITOR_CONFIG, COMPACT_EDITOR_CONFIG } from '../../config/editor';
import './AddTransactionModal.css';

const AddTransactionModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    topic: '',
    price: '',
    feeBearer: 'buyer',
    description: '',
    contact: '',
    hiddenContent: '',
    isPublic: true
  });

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

  const handleEditorChange = (name) => (content) => {
    setFormData(prev => ({
      ...prev,
      [name]: content
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Thêm giao dịch mới</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-transaction-form">
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
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
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
                Hiện công khai (ai cũng xem được)
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={!formData.isPublic}
                  onChange={handleChange}
                />
                Ẩn (chỉ có ai có link mới xem được)
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Đóng
            </button>
            <button type="submit" className="submit-button">
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal; 