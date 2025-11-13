import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaDumbbell, FaChartLine, FaBullseye, FaFire, FaPlay, FaArrowRight } from 'react-icons/fa';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{
      textAlign: 'center',
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Hero Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        marginBottom: '80px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 20px'
      }}>
        {/* Background glow effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          filter: 'blur(60px)',
          zIndex: -1,
          opacity: 0.2,
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
          animation: 'pulse 3s ease-in-out infinite'
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '24px',
            color: '#FFFFFF'
          }}>
            <FaFire style={{ color: '#FF6B35', animation: 'pulse 2s infinite', fontSize: '16px' }} />
            <span style={{ color: '#FFFFFF', fontWeight: 500 }}>Tập luyện hiệu quả tại nhà</span>
          </div>
          
          {/* Main Heading */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            marginBottom: '24px',
            lineHeight: 1.1,
            fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            letterSpacing: '-0.02em'
          }}>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              letterSpacing: '-0.02em'
            }}>Biến đổi cơ thể với</span>
            <span style={{
              display: 'block',
              marginTop: '8px',
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              letterSpacing: '-0.02em'
            }}>
              Home Workout
            </span>
          </h1>
          
          {/* Description */}
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            color: '#E5E7EB',
            marginBottom: '32px',
            maxWidth: '800px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
            padding: '0 16px'
          }}>
            Khám phá hàng trăm bài tập chuyên nghiệp, theo dõi tiến độ và đạt được 
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}> mục tiêu sức khỏe mơ ước</span> của bạn ngay tại nhà.
          </p>
          
          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {isAuthenticated ? (
              <>
                <Link
                  to="/exercises"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
                    color: '#FFFFFF',
                    padding: '16px 40px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.3)';
                  }}
                >
                  <FaPlay style={{ fontSize: '14px' }} />
                  <span>Khám phá bài tập</span>
                  <FaArrowRight style={{ fontSize: '14px', opacity: 0 }} />
                </Link>
                <Link
                  to="/dashboard"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFFFFF',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    padding: '16px 40px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
                    color: '#FFFFFF',
                    padding: '16px 40px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.3)';
                  }}
                >
                  <FaFire style={{ fontSize: '14px' }} />
                  <span>Bắt đầu ngay</span>
                  <FaArrowRight style={{ fontSize: '14px', opacity: 0 }} />
                </Link>
                <Link
                  to="/exercises"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFFFFF',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    padding: '16px 40px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Xem bài tập
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        marginTop: '64px',
        paddingBottom: '32px',
        padding: '0 20px'
      }}>
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '16px',
            textAlign: 'center',
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '-0.01em'
          }}>
            Tại sao chọn <span style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800
            }}>Home Workout</span>?
          </h2>
          <p style={{
            color: '#D1D5DB',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            lineHeight: 1.6
          }}>
            Nền tảng tập luyện tại nhà toàn diện với mọi thứ bạn cần
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Feature 1 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
                boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)'
              }}>
                <FaDumbbell style={{ color: '#FFFFFF', fontSize: '32px' }} />
              </div>
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '16px',
              textAlign: 'center',
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '-0.01em'
            }}>Đa dạng bài tập</h3>
            <p style={{
              color: '#D1D5DB',
              lineHeight: 1.6,
              fontSize: '16px',
              textAlign: 'left',
              flexGrow: 1
            }}>
              Hàng trăm bài tập cho mọi nhóm cơ và mức độ từ cơ bản đến nâng cao, được hướng dẫn chi tiết
            </p>
          </div>
          
          {/* Feature 2 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                background: '#2563EB',
                boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)'
              }}>
                <FaChartLine style={{ color: '#FFFFFF', fontSize: '32px' }} />
              </div>
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '16px',
              textAlign: 'center',
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '-0.01em'
            }}>Theo dõi tiến độ</h3>
            <p style={{
              color: '#D1D5DB',
              lineHeight: 1.6,
              fontSize: '16px',
              textAlign: 'left',
              flexGrow: 1
            }}>
              Ghi nhận và theo dõi quá trình tập luyện của bạn một cách chi tiết với biểu đồ và thống kê trực quan
            </p>
          </div>
          
          {/* Feature 3 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                background: '#10B981',
                boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)'
              }}>
                <FaBullseye style={{ color: '#FFFFFF', fontSize: '32px' }} />
              </div>
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '16px',
              textAlign: 'center',
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '-0.01em'
            }}>Chương trình cá nhân</h3>
            <p style={{
              color: '#D1D5DB',
              lineHeight: 1.6,
              fontSize: '16px',
              textAlign: 'left',
              flexGrow: 1
            }}>
              Tạo chương trình tập luyện phù hợp với mục tiêu, thời gian và thể trạng của bạn
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
