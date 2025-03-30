import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams, useNavigate } from 'react-router-dom';
import { TINYMCE_API_KEY, DEFAULT_EDITOR_CONFIG } from '../../config/editor';
import { API_CONFIG } from '../../config/api.config';
import { toast } from 'react-toastify';
import './TransactionDetail.css';
import ConfirmModal from '../common/ConfirmModal';

const getStatusText = (statusId) => {
  switch (statusId) {
    case 1:
      return "Đơn hàng đã sẵn sàng giao dịch";
    case 2:
      return "Đơn hàng đã bị hủy";
    case 3:
      return "Bên mua đang kiểm tra hàng";
    case 4:
      return "Đơn hàng đã hoàn thành";
    case 5:
      return "Bên mua khiếu nại sản phẩm";
    case 6:
      return "Bên bán đánh dấu khiếu nại không đúng";
    case 7:
      return "Yêu cầu quản trị viên trung gian";
    case 8:
      return "Chờ bên mua xác nhận khiếu nại không đúng";
    default:
      return "Không xác định";
  }
};

const TransactionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const currentUserId = localStorage.getItem('userId');
        if (!token) {
          localStorage.clear();
          navigate('/login');
          return;
        }

        const response = await fetch(`${API_CONFIG.BASE_URL}/api/Order/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.clear();
          toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch transaction details');
        }

        const result = await response.json();
        if (result.code === 200) {
          const currentUserId = parseInt(localStorage.getItem('userId'));
          const isCreator = result.data.createdByUser.id === currentUserId;
          setTransaction({
            ...result.data,
            statusText: getStatusText(result.data.statusId),
            updateable: result.data.updateable && isCreator,
            isCreator: isCreator
          });
        } else {
          throw new Error(result.message || 'Failed to fetch transaction details');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (!transaction.updateable) return;

    if (type === 'radio') {
      if (name === 'feeBearer') {
        setTransaction(prev => ({
          ...prev,
          isSellerChargeFee: value === 'seller',
          feeOnSuccess: prev.moneyValue * 0.05,
          totalMoneyForBuyer: value === 'buyer' ? prev.moneyValue + (prev.moneyValue * 0.05) : prev.moneyValue,
          sellerReceivedOnSuccess: value === 'seller' ? prev.moneyValue - (prev.moneyValue * 0.05) : prev.moneyValue
        }));
      } else if (name === 'visibility') {
        setTransaction(prev => ({
          ...prev,
          isPublic: value === 'public'
        }));
      }
    } else if (name === 'moneyValue') {
      const newPrice = parseFloat(value);
      const newFee = newPrice * 0.05;
      setTransaction(prev => ({
        ...prev,
        moneyValue: newPrice,
        feeOnSuccess: newFee,
        totalMoneyForBuyer: prev.isSellerChargeFee ? newPrice : newPrice + newFee,
        sellerReceivedOnSuccess: prev.isSellerChargeFee ? newPrice - newFee : newPrice
      }));
    } else {
      setTransaction(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEditorChange = (content, editor) => {
    if (!transaction.updateable) return;
    
    const fieldName = editor.id;
    setTransaction(prev => ({
      ...prev,
      [fieldName]: content
    }));
  };

  const handleUpdate = async () => {
    if (!transaction.updateable) return;
    
    if (!window.confirm('Bạn đã quyết định cập nhật thông tin đơn hàng?')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('Bạn chưa đăng nhập');
        return;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/Order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          contact: transaction.contact,
          title: transaction.title,
          description: transaction.description,
          isPublic: transaction.isPublic,
          hiddenValue: transaction.hiddenValue,
          moneyValue: transaction.moneyValue,
          isSellerChargeFee: transaction.isSellerChargeFee,
          orderId: transaction.id
        })
      });

      if (response.status === 401) {
        toast.error('Phiên đăng nhập đã hết hạn');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      const result = await response.json();
      if (result.code === 200) {
        toast.success('Cập nhật thành công!');
        // Update the transaction state with new data
        setTransaction(prev => ({
          ...prev,
          contact: transaction.contact,
          title: transaction.title,
          description: transaction.description,
          isPublic: transaction.isPublic,
          hiddenValue: transaction.hiddenValue,
          moneyValue: transaction.moneyValue,
          isSellerChargeFee: transaction.isSellerChargeFee,
          updatedAt: new Date().toISOString()
        }));
      } else {
        throw new Error(result.message || 'Failed to update transaction');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null
    });
  };

  const showConfirmModal = (title, message, onConfirm) => {
    setModalConfig({
      isOpen: true,
      title,
      message,
      onConfirm
    });
  };

  const handleCompleteOrder = async () => {
    showConfirmModal(
      'Xác nhận hoàn thành',
      'Bạn có chắc chắn muốn xác nhận hoàn thành đơn hàng này?',
      async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            toast.error('Bạn chưa đăng nhập');
            return;
          }

          const response = await fetch(`${API_CONFIG.BASE_URL}/api/Order/${transaction.id}/complete`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });

          if (response.status === 401) {
            toast.error('Không thể thực hiện thao tác.');
            return;
          }

          if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || 'Có lỗi xảy ra');
            return;
          }

          toast.success('Đã hoàn thành đơn hàng!');
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } catch (error) {
          toast.error('Có lỗi xảy ra');
        } finally {
          closeModal();
        }
      }
    );
  };

  const handleComplain = async () => {
    showConfirmModal(
      'Xác nhận khiếu nại',
      'Bạn có chắc chắn muốn khiếu nại đơn hàng này?',
      async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            toast.error('Bạn chưa đăng nhập');
            return;
          }

          const response = await fetch(`${API_CONFIG.BASE_URL}/api/Order/${transaction.id}/complain`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });

          if (response.status === 401) {
            toast.error('Không thể thực hiện thao tác.');
            return;
          }

          if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || 'Có lỗi xảy ra');
            return;
          }

          toast.success('Đã gửi khiếu nại!');
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } catch (error) {
          toast.error('Có lỗi xảy ra');
        } finally {
          closeModal();
        }
      }
    );
  };

  const handleRequestAdmin = async () => {
    showConfirmModal(
      'Xác nhận yêu cầu admin',
      'Admin sẽ liện hệ 2 bêm để khải quyết, hệ thống sẽ phạt 50k đối với bên nào sai, hãy kiểm tra tài khoản của của bạn còn 50k không nhé!',
      async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            toast.error('Bạn chưa đăng nhập');
            return;
          }

          const response = await fetch(`${API_CONFIG.BASE_URL}/api/Order/${transaction.id}/call-admin`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });

          if (response.status === 401) {
            toast.error('Không thể thực hiện thao tác.');
            return;
          }

          if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || 'Có lỗi xảy ra');
            return;
          }

          toast.success('Đã gửi yêu cầu đến admin!');
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } catch (error) {
          toast.error('Có lỗi xảy ra');
        } finally {
          closeModal();
        }
      }
    );
  };

  const handleBuyOrder = async () => {
    showConfirmModal(
      'Xác nhận mua',
      'Bạn có chắc chắn muốn mua đơn hàng này?',
      async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            toast.error('Bạn chưa đăng nhập');
            return;
          }

          const response = await fetch(`${API_CONFIG.BASE_URL}/api/Order/buy-order`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              orderId: transaction.id
            })
          });

          if (response.status === 401) {
            toast.error('Không thể thực hiện thao tác.');
            return;
          }

          if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || 'Có lỗi xảy ra');
            return;
          }

          toast.success('Đã mua đơn hàng thành công!');
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } catch (error) {
          toast.error('Có lỗi xảy ra');
        } finally {
          closeModal();
        }
      }
    );
  };

  const handleCancelOrder = async () => {
    showConfirmModal(
      'Xác nhận hủy đơn hàng',
      'Bạn có chắc chắn muốn hủy đơn hàng do sản phẩm lỗi?',
      async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            toast.error('Bạn chưa đăng nhập');
            return;
          }

          const response = await fetch(`${API_CONFIG.BASE_URL}/api/Order/${transaction.id}/cancel-order`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });

          if (response.status === 401) {
            toast.error('Không thể thực hiện thao tác');
            return;
          }

          if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || 'Có lỗi xảy ra');
            return;
          }

          toast.success('Đã hủy đơn hàng do sản phẩm lỗi!');
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } catch (error) {
          toast.error('Có lỗi xảy ra');
        } finally {
          closeModal();
        }
      }
    );
  };

  const handleRequestReturn = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('Bạn chưa đăng nhập');
        return;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/Order/${transaction.id}/request-return`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.status === 401) {
        toast.error('Không thể thực hiện thao tác');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to request return');
      }

      const result = await response.json();
      if (result.code === 200) {
        toast.success('Đã yêu cầu khách hàng trả lại sản phẩm!');
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        throw new Error(result.message || 'Failed to request return');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRequestBuyerCheck = async () => {
    showConfirmModal(
      'Xác nhận yêu cầu kiểm tra',
      'Bạn có chắc chắn muốn yêu cầu khách hàng kiểm tra lại?',
      async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            toast.error('Bạn chưa đăng nhập');
            return;
          }

          const response = await fetch(`${API_CONFIG.BASE_URL}/api/Order/${transaction.id}/requestBuyer-checkOrder`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });

          if (response.status === 401) {
            toast.error('Không thể thực hiện thao tác');
            return;
          }

          if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || 'Có lỗi xảy ra');
            return;
          }

          toast.success('Đã yêu cầu khách hàng kiểm tra lại!');
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } catch (error) {
          toast.error('Có lỗi xảy ra');
        } finally {
          closeModal();
        }
      }
    );
  };

  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  if (!transaction) {
    return <div className="error">Không tìm thấy thông tin giao dịch</div>;
  }

  return (
    <div className="transaction-detail">
      <div className="detail-header">
        <div className="header-content">
          <h1>Chi tiết giao dịch</h1>
          <div className="transaction-status">
            <span className={`status-badge status-${transaction.statusId}`}>
              {transaction.statusText}
            </span>
          </div>
        </div>
        {transaction.updateable && transaction.isCreator && (
          <button className="update-button" onClick={handleUpdate}>
            Cập nhật
          </button>
        )}
        {!transaction.isCreator && transaction.statusId === 1 && (
          <button className="buy-button" onClick={handleBuyOrder}>
            Mua hàng
          </button>
        )}
        {!transaction.isCreator && transaction.statusId === 3 && (
          <div className="button-group">
            <button className="complete-button" onClick={handleCompleteOrder}>
              Hoàn thành
            </button>
            <button className="complain-button" onClick={handleComplain}>
              Khiếu nại
            </button>
          </div>
        )}
        {transaction.isCreator && transaction.statusId === 5 && (
          <div className="button-group">
            <button className="admin-button" onClick={handleRequestAdmin}>
              Yêu cầu admin xử lý
            </button>
            <button className="cancel-button" onClick={handleCancelOrder}>
              Hủy đơn do sản phẩm lỗi
            </button>
            <button className="return-button" onClick={handleRequestBuyerCheck}>
              Yêu cầu khách kiểm tra lại
            </button>
          </div>
        )}
        {!transaction.isCreator && transaction.statusId === 8 && (
          <div className="button-group">
            <button className="complete-button" onClick={handleCompleteOrder}>
              Hoàn thành
            </button>
            <button className="admin-button" onClick={handleRequestAdmin}>
              Yêu cầu admin xử lý
            </button>
          </div>
        )}
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <div className="detail-row">
            <div className="detail-label">Mã trung gian</div>
            <div className="detail-value">
              {transaction.id}
            </div>
          </div>
          
          <div className="detail-row">
            <div className="detail-label">Người bán</div>
            <div className="detail-value">{transaction.createdByUser.username}</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Thông tin liên hệ</div>
            <div className="detail-value editable">
              <input
                type="text"
                name="contact"
                value={transaction.contact}
                onChange={handleChange}
                disabled={!transaction.updateable}
              />
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Chủ đề trung gian</div>
            <div className="detail-value editable">
              <input
                type="text"
                name="title"
                value={transaction.title}
                onChange={handleChange}
                disabled={!transaction.updateable}
              />
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Giá tiền</div>
            <div className="detail-value editable">
              <input
                type="number"
                name="moneyValue"
                value={transaction.moneyValue}
                onChange={handleChange}
                disabled={!transaction.updateable}
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
                    checked={!transaction.isSellerChargeFee}
                    onChange={handleChange}
                    disabled={!transaction.updateable}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">Người mua</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="feeBearer"
                    value="seller"
                    checked={transaction.isSellerChargeFee}
                    onChange={handleChange}
                    disabled={!transaction.updateable}
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
              {transaction.feeOnSuccess.toLocaleString('vi-VN')} VNĐ
            </div>
          </div>

          <div className="detail-row highlight">
            <div className="detail-label">Tổng tiền bên mua thanh toán</div>
            <div className="detail-value read-only">
              {transaction.totalMoneyForBuyer.toLocaleString('vi-VN')} VNĐ
            </div>
          </div>

          <div className="detail-row highlight">
            <div className="detail-label">Tiền bên bán thực nhận</div>
            <div className="detail-value read-only">
              {transaction.sellerReceivedOnSuccess.toLocaleString('vi-VN')} VNĐ
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
                    disabled={!transaction.updateable}
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
                    disabled={!transaction.updateable}
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
              {transaction.updatedAt ? new Date(transaction.updatedAt).toLocaleString('vi-VN') : 'Chưa cập nhật'}
            </div>
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-row full-width">
            <div className="detail-label">Mô tả</div>
            <div className="detail-value rich-text editable">
              {(transaction.isCreator && transaction.updateable) ? (
                <Editor
                  id="description"
                  apiKey={TINYMCE_API_KEY}
                  init={DEFAULT_EDITOR_CONFIG}
                  value={transaction.description}
                  onEditorChange={handleEditorChange}
                  disabled={!transaction.updateable}
                />
              ) : (
                <div className="description-content" 
                  dangerouslySetInnerHTML={{ __html: transaction.description }} 
                />
              )}
            </div>
          </div>

          {(transaction.hiddenValue && transaction.hiddenValue.trim() !== '') && (
            <div className="detail-row full-width">
              <div className="detail-label">Nội dung ẩn</div>
              <div className="detail-value rich-text editable">
                {(transaction.isCreator && transaction.updateable) ? (
                  <Editor
                    id="hiddenValue"
                    apiKey={TINYMCE_API_KEY}
                    init={DEFAULT_EDITOR_CONFIG}
                    value={transaction.hiddenValue}
                    onEditorChange={handleEditorChange}
                    disabled={!transaction.updateable}
                  />
                ) : (
                  <div className="description-content" 
                    dangerouslySetInnerHTML={{ __html: transaction.hiddenValue }} 
                  />
                )}
              </div>
            </div>
          )}

          <div className="share-link-section">
            <div className="detail-row">
              <div className="detail-label">Link chia sẻ</div>
              <div className="share-link">
                <input 
                  type="text" 
                  value={`${transaction.shareLink}`} 
                  readOnly 
                />
                <button onClick={() => {
                  navigator.clipboard.writeText(`${transaction.shareLink}`);
                  toast.success('Đã sao chép link chia sẻ!');
                }}>
                  Sao chép
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </div>
  );
};

export default TransactionDetail; 