import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaWallet, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { STORAGE_KEYS } from '../../constants/storage.constants';
import './Profile.css';

const Profile = () => {
  const { userInfo } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!userId || !token) {
          toast.error('Không tìm thấy thông tin xác thực');
          return;
        }

        const response = await fetch(`https://localhost:7054/api/Users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.code === 200) {
            setProfileData(data.data);
          } else {
            toast.error(data.message || 'Không thể tải thông tin hồ sơ');
          }
        } else if (response.status === 401) {
          toast.error('Phiên đăng nhập đã hết hạn');
          // Có thể thêm logic để refresh token hoặc logout ở đây
        } else {
          toast.error('Lỗi khi tải thông tin hồ sơ');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Đã xảy ra lỗi khi tải thông tin hồ sơ');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="loading">Đang tải...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser className="avatar-icon" />
          </div>
          <div className="profile-title">
            <h1>Hồ sơ người dùng</h1>
            <p>Thông tin chi tiết về tài khoản của bạn</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Thông tin cơ bản</h2>
            <div className="info-grid">
              <div className="info-item">
                <FaUser className="info-icon" />
                <div className="info-details">
                  <label>Tên đăng nhập</label>
                  <span>{profileData?.username || userInfo?.userName}</span>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div className="info-details">
                  <label>Email</label>
                  <span>{profileData?.email || 'Chưa cập nhật'}</span>
                </div>
              </div>
              <div className="info-item">
                <FaPhone className="info-icon" />
                <div className="info-details">
                  <label>Số điện thoại</label>
                  <span>{profileData?.phoneNumber || 'Chưa cập nhật'}</span>
                </div>
              </div>
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div className="info-details">
                  <label>Địa chỉ</label>
                  <span>{profileData?.address || 'Chưa cập nhật'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Thông tin tài chính</h2>
            <div className="info-grid">
              <div className="info-item">
                <FaWallet className="info-icon" />
                <div className="info-details">
                  <label>Số dư</label>
                  <span className="balance">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(profileData?.money || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 