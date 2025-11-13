import React from 'react';

interface ExerciseVideoPlayerProps {
  videoUrl: string;
  title: string;
}

const ExerciseVideoPlayer: React.FC<ExerciseVideoPlayerProps> = ({ videoUrl, title }) => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      marginBottom: '32px'
    }}>
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 ratio
        height: 0,
        overflow: 'hidden',
        borderRadius: '16px',
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <video
          key={videoUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            objectFit: 'cover'
          }}
          controls
          preload="metadata"
          title={title}
        >
          <source src={videoUrl} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>
    </div>
  );
};

export default ExerciseVideoPlayer;
