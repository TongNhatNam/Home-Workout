import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e40af 100%)'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {/* Gradient orbs */}
        <div style={{
          position: 'absolute',
          top: '-160px',
          right: '-160px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          filter: 'blur(80px)',
          backgroundColor: 'rgba(255, 107, 53, 0.15)',
          animation: 'pulse 3s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-160px',
          left: '-160px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          filter: 'blur(80px)',
          backgroundColor: 'rgba(37, 99, 235, 0.15)',
          animation: 'pulse 3s ease-in-out infinite',
          animationDelay: '1s'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '384px',
          height: '384px',
          borderRadius: '50%',
          filter: 'blur(80px)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          animation: 'pulse 3s ease-in-out infinite',
          animationDelay: '2s'
        }}></div>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Header />
        <main style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '24px 16px',
          minHeight: 'calc(100vh - 80px)'
        }}>
          {children}
        </main>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
