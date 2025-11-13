import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaDumbbell, FaFire, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}>
            <div style={{
              padding: '10px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(12deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
            >
              <FaDumbbell style={{ color: '#FFFFFF', fontSize: '20px' }} />
            </div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Poppins', sans-serif",
              margin: 0
            }}>
              HomeWorkout
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px'
          }}
          className="desktop-nav"
          >
            <Link
              to="/exercises"
              style={{
                color: '#D1D5DB',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#D1D5DB';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <FaFire style={{ fontSize: '14px', color: '#FF6B35' }} />
              <span>Bài tập</span>
            </Link>
            <Link
              to="/workout"
              style={{
                color: '#D1D5DB',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#D1D5DB';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Workout
            </Link>
            {isAuthenticated && (
              <Link
                to="/profile"
                style={{
                  color: '#D1D5DB',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#D1D5DB';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Profile
              </Link>
            )}
          </nav>

          {/* Desktop Auth buttons */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '12px'
          }}
          className="desktop-auth"
          >
            {isAuthenticated ? (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)'
                  }}>
                    <FaUser style={{ color: '#FFFFFF', fontSize: '12px' }} />
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#FFFFFF'
                  }}>{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: '#FCA5A5',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                    e.currentTarget.style.color = '#F87171';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                    e.currentTarget.style.color = '#FCA5A5';
                  }}
                >
                  <FaSignOutAlt style={{ fontSize: '12px' }} />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    color: '#D1D5DB',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#D1D5DB';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
                    color: '#FFFFFF',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 600,
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
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'block',
              padding: '8px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="mobile-menu-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            {mobileMenuOpen ? (
              <FaTimes style={{ color: '#FFFFFF', fontSize: '20px' }} />
            ) : (
              <FaBars style={{ color: '#FFFFFF', fontSize: '20px' }} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{
            paddingTop: '16px',
            paddingBottom: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <Link
                to="/exercises"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: '#D1D5DB',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#D1D5DB';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <FaFire style={{ fontSize: '14px', color: '#FF6B35' }} />
                Bài tập
              </Link>
              <Link
                to="/workout"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: '#D1D5DB',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#D1D5DB';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Workout
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: '#D1D5DB',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#D1D5DB';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Profile
                </Link>
              )}
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                marginTop: '8px'
              }}>
                {isAuthenticated ? (
                  <>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)'
                      }}>
                        <FaUser style={{ color: '#FFFFFF', fontSize: '12px' }} />
                      </div>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#FFFFFF'
                      }}>{user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#FCA5A5',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                        e.currentTarget.style.color = '#F87171';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                        e.currentTarget.style.color = '#FCA5A5';
                      }}
                    >
                      <FaSignOutAlt style={{ fontSize: '12px' }} />
                      <span>Đăng xuất</span>
                    </button>
                  </>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        color: '#D1D5DB',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: 500,
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#D1D5DB';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
                        color: '#FFFFFF',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: 600,
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Đăng ký
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav,
          .desktop-auth {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
