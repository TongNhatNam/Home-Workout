import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaWeight, FaRulerVertical, FaBullseye, FaSave, FaArrowLeft } from 'react-icons/fa';

const ProfileEdit: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.profile?.age || '',
    weight: user?.profile?.weight || '',
    height: user?.profile?.height || '',
    fitnessGoal: user?.profile?.fitnessGoal || 'Duy trì sức khỏe',
    fitnessLevel: user?.profile?.fitnessLevel || 'Mới bắt đầu'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const updatedUser = {
        ...user!,
        name: formData.name,
        email: formData.email,
        profile: {
          age: formData.age ? Number(formData.age) : undefined,
          weight: formData.weight ? Number(formData.weight) : undefined,
          height: formData.height ? Number(formData.height) : undefined,
          fitnessGoal: formData.fitnessGoal,
          fitnessLevel: formData.fitnessLevel
        }
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fitnessGoals = ['Giảm cân', 'Tăng cơ', 'Duy trì sức khỏe', 'Tăng sức bền', 'Cải thiện thể hình'];
  const fitnessLevels = ['Mới bắt đầu', 'Trung bình', 'Nâng cao', 'Chuyên nghiệp'];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/profile')}
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
          fontSize: '14px',
          fontWeight: 500
        }}
      >
        <FaArrowLeft /> Quay lại
      </button>

      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '8px'
        }}>
          Chỉnh sửa thông tin
        </h1>
        <p style={{
          color: '#D1D5DB',
          fontSize: '18px'
        }}>
          Cập nhật thông tin cá nhân của bạn
        </p>
      </div>

      {success && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.2)',
          color: '#6EE7B7',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '24px',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          ✓ Cập nhật thành công! Đang chuyển hướng...
        </div>
      )}

      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FaUser style={{ color: '#FF6B35' }} />
              Thông tin cơ bản
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Physical Info */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FaWeight style={{ color: '#FF6B35' }} />
              Thông số cơ thể
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Tuổi
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="10"
                  max="100"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Cân nặng (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="30"
                  max="200"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Chiều cao (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  min="100"
                  max="250"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Fitness Goals */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FaBullseye style={{ color: '#FF6B35' }} />
              Mục tiêu tập luyện
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Mục tiêu
                </label>
                <select
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  {fitnessGoals.map(goal => (
                    <option key={goal} value={goal} style={{ background: '#1F2937' }}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Trình độ
                </label>
                <select
                  name="fitnessLevel"
                  value={formData.fitnessLevel}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  {fitnessLevels.map(level => (
                    <option key={level} value={level} style={{ background: '#1F2937' }}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#6B7280' : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
              color: '#FFFFFF',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 107, 53, 0.6), 0 0 60px rgba(255, 107, 53, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }
            }}
          >
            <FaSave style={{ fontSize: '16px' }} />
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;