import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEdit, FaHistory, FaCog, FaSignOutAlt, FaEnvelope, FaWeight, FaRulerVertical, FaBullseye, FaTrophy } from 'react-icons/fa';

const ProfileDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '8px'
        }}>
          Hồ sơ cá nhân
        </h1>
        <p style={{
          color: '#D1D5DB',
          fontSize: '18px'
        }}>
          Quản lý thông tin và hoạt động của bạn
        </p>
      </div>

      {/* User Info Card */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        marginBottom: '24px'
      }}>
        {/* Avatar & Name */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(255, 107, 53, 0.4)'
          }}>
            <FaUser style={{ color: '#FFFFFF', fontSize: '32px' }} />
          </div>
          <div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '4px'
            }}>
              {user?.name || 'User'}
            </h2>
            <p style={{
              color: '#D1D5DB',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FaEnvelope style={{ fontSize: '14px' }} />
              {user?.email || 'email@example.com'}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <FaUser style={{ color: '#FF6B35', fontSize: '20px' }} />
              <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Tuổi</span>
            </div>
            <p style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#FFFFFF'
            }}>
              {user?.profile?.age || '--'} tuổi
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <FaWeight style={{ color: '#FF6B35', fontSize: '20px' }} />
              <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Cân nặng</span>
            </div>
            <p style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#FFFFFF'
            }}>
              {user?.profile?.weight || '--'} kg
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <FaRulerVertical style={{ color: '#FF6B35', fontSize: '20px' }} />
              <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Chiều cao</span>
            </div>
            <p style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#FFFFFF'
            }}>
              {user?.profile?.height || '--'} cm
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <FaBullseye style={{ color: '#FF6B35', fontSize: '20px' }} />
              <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Mục tiêu</span>
            </div>
            <p style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#FFFFFF'
            }}>
              {user?.profile?.fitnessGoal || 'Chưa đặt'}
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <FaTrophy style={{ color: '#FF6B35', fontSize: '20px' }} />
              <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Trình độ</span>
            </div>
            <p style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#FFFFFF'
            }}>
              {user?.profile?.fitnessLevel || 'Chưa đặt'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px'
      }}>
        <button
          onClick={() => navigate('/profile/edit')}
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
            color: '#FFFFFF',
            padding: '20px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '16px',
            fontWeight: 600
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 107, 53, 0.6), 0 0 60px rgba(255, 107, 53, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          }}
        >
          <FaEdit style={{ fontSize: '20px' }} />
          Chỉnh sửa thông tin
        </button>

        <button
          onClick={() => navigate('/profile/history')}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '20px',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '16px',
            fontWeight: 600
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <FaHistory style={{ fontSize: '20px' }} />
          Lịch sử tập luyện
        </button>

        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            color: '#FCA5A5',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '20px',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '16px',
            fontWeight: 600
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
            e.currentTarget.style.color = '#F87171';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.color = '#FCA5A5';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <FaSignOutAlt style={{ fontSize: '20px' }} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default ProfileDashboard;