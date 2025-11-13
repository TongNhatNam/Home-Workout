import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaFire, FaDumbbell, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import ExerciseVideoPlayer from '../components/exercise/ExerciseVideoPlayer';
import { trackExerciseView } from '../utils/workoutStorage';

interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  duration: number;
  calories: number;
  description: string;
  videoUrl: string;
  targetMuscles: string[];
  steps: string[];
  tips: string[];
  commonMistakes: string[];
}

const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    category: 'Ngực',
    difficulty: 'Trung bình',
    duration: 30,
    calories: 50,
    description: 'Bài tập cơ bản cho cơ ngực và cánh tay, giúp tăng cường sức mạnh phần thân trên.',
    videoUrl: '/videos/exercises/pushups.mp4',
    targetMuscles: ['Ngực', 'Vai', 'Tay sau'],
    steps: [
      'Nằm sấp, đặt hai tay xuống sàn rộng hơn vai một chút, ngón tay hướng về phía trước',
      'Duỗi thẳng cánh tay để nâng cơ thể lên, giữ thẳng từ đầu đến gót chân',
      'Hạ thấp cơ thể bằng cách uốn cùi chỏ cho đến khi ngực gần chạm sàn',
      'Đẩy mạnh để trở về vị trí ban đầu, giữ cơ bụng và mông luôn căng',
      'Lặp lại động tác với nhịp thở đều đặn'
    ],
    tips: [
      'Giữ cơ thể thẳng như một đường thẳng, không để mông nhô lên hoặc lưng võng xuống',
      'Hít vào khi hạ xuống, thở ra khi đẩy lên',
      'Nếu quá khó, có thể bắt đầu với push-up quỳ gối',
      'Tập trung vào chất lượng động tác hơn là số lượng'
    ],
    commonMistakes: [
      'Để mông nhô cao hoặc lưng võng xuống',
      'Không hạ thấp đủ (ngực phải gần chạm sàn)',
      'Cùi chỏ quá rộng ra ngoài (nên giữ góc 45 độ)',
      'Nín thở trong khi tập'
    ]
  },
  {
    id: '2',
    name: 'Squats',
    category: 'Chân',
    difficulty: 'Dễ',
    duration: 45,
    calories: 60,
    description: 'Bài tập cơ bản cho cơ đùi và mông, giúp tăng cường sức mạnh chân và cải thiện thăng bằng.',
    videoUrl: '/videos/exercises/squats.mp4',
    targetMuscles: ['Đùi trước', 'Mông', 'Bắp chân'],
    steps: [
      'Đứng thẳng, hai chân rộng bằng vai, mũi chân hơi xoay ra ngoài',
      'Giữ ngực thẳng, vai thả lỏng, tay có thể đưa ra trước để giữ thăng bằng',
      'Hạ thấp cơ thể bằng cách uốn gối và đẩy hông ra sau như đang ngồi xuống ghế',
      'Hạ xuống cho đến khi đùi song song với sàn (hoặc thấp hơn nếu có thể)',
      'Đẩy gót chân xuống sàn để đứng lên về vị trí ban đầu'
    ],
    tips: [
      'Giữ đầu gối luôn hướng theo mũi chân, không để gối xẹp vào trong',
      'Trọng lượng cơ thể đặt ở gót chân, không phải mũi chân',
      'Giữ lưng thẳng trong suốt động tác',
      'Hít vào khi hạ xuống, thở ra khi đứng lên'
    ],
    commonMistakes: [
      'Đầu gối vượt quá mũi chân quá nhiều',
      'Gót chân nhấc lên khỏi sàn',
      'Lưng cong tròn hoặc nghiêng về phía trước quá nhiều',
      'Không hạ thấp đủ (đùi không song song với sàn)'
    ]
  },
  {
    id: '3',
    name: 'Plank',
    category: 'Bụng',
    difficulty: 'Trung bình',
    duration: 60,
    calories: 40,
    description: 'Bài tập tăng cường cơ core, giúp cải thiện tư thế và ổn định cột sống.',
    videoUrl: '/videos/exercises/plank.mp4',
    targetMuscles: ['Bụng', 'Lưng', 'Vai'],
    steps: [
      'Nằm sấp, đặt khuỷu tay xuống sàn ngay dưới vai, cẳng tay song song với nhau',
      'Nâng cơ thể lên bằng cách chống lên mũi chân và cẳng tay',
      'Giữ cơ thể thẳng từ đầu đến gót chân, tạo thành một đường thẳng',
      'Căng cơ bụng, mông và đùi để duy trì tư thế',
      'Giữ nguyên tư thế trong khoảng thời gian mong muốn'
    ],
    tips: [
      'Nhìn xuống sàn để giữ cổ ở tư thế trung tính',
      'Thở đều đặn, không nín thở',
      'Nếu quá khó, có thể bắt đầu với plank quỳ gối',
      'Tăng dần thời gian giữ tư thế theo từng tuần'
    ],
    commonMistakes: [
      'Để mông nhô cao lên hoặc sụp xuống',
      'Vai không thẳng hàng với khuỷu tay',
      'Đầu ngẩng lên hoặc cúi xuống quá nhiều',
      'Nín thở thay vì thở đều'
    ]
  }
];

const ExerciseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const foundExercise = mockExercises.find(ex => ex.id === id);
    if (foundExercise) {
      setExercise(foundExercise);
      trackExerciseView(foundExercise.id, foundExercise.name);
    }
  }, [id]);

  const getRelatedExercises = () => {
    if (!exercise) return [];
    return mockExercises.filter(ex => 
      ex.id !== exercise.id && 
      (ex.category === exercise.category || 
       ex.targetMuscles.some(muscle => exercise.targetMuscles.includes(muscle)))
    ).slice(0, 3);
  };

  if (!exercise) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#FFFFFF' }}>
        <p>Không tìm thấy bài tập</p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return '#10B981';
      case 'Trung bình': return '#F59E0B';
      case 'Khó': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/exercises')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          padding: '10px 16px',
          color: '#FFFFFF',
          cursor: 'pointer',
          marginBottom: '24px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        }}
      >
        <FaArrowLeft />
        <span>Quay lại</span>
      </button>

      {/* Video Player */}
      <ExerciseVideoPlayer videoUrl={exercise.videoUrl} title={exercise.name} />

      {/* Exercise Info */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '8px'
            }}>
              {exercise.name}
            </h1>
            <span style={{
              background: getDifficultyColor(exercise.difficulty),
              color: '#FFFFFF',
              padding: '6px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600
            }}>
              {exercise.difficulty}
            </span>
          </div>
        </div>

        <p style={{
          color: '#D1D5DB',
          fontSize: '16px',
          lineHeight: 1.6,
          marginBottom: '20px'
        }}>
          {exercise.description}
        </p>

        <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaClock style={{ color: '#9CA3AF', fontSize: '18px' }} />
            <span style={{ color: '#FFFFFF', fontSize: '16px' }}>{exercise.duration}s</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaFire style={{ color: '#FF6B35', fontSize: '18px' }} />
            <span style={{ color: '#FFFFFF', fontSize: '16px' }}>{exercise.calories} cal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaDumbbell style={{ color: '#9CA3AF', fontSize: '18px' }} />
            <span style={{ color: '#FFFFFF', fontSize: '16px' }}>{exercise.category}</span>
          </div>
        </div>

        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            marginBottom: '12px'
          }}>
            Nhóm cơ:
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {exercise.targetMuscles.map(muscle => (
              <span
                key={muscle}
                style={{
                  background: 'rgba(255, 107, 53, 0.2)',
                  color: '#FF6B35',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <FaCheckCircle style={{ color: '#10B981' }} />
          Hướng dẫn từng bước
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {exercise.steps.map((step, index) => (
            <div key={index} style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                minWidth: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px'
              }}>
                {index + 1}
              </div>
              <p style={{
                color: '#D1D5DB',
                fontSize: '16px',
                lineHeight: 1.6,
                margin: 0,
                paddingTop: '4px'
              }}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          💡 Mẹo & Lưu ý
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {exercise.tips.map((tip, index) => (
            <li key={index} style={{
              color: '#D1D5DB',
              fontSize: '16px',
              lineHeight: 1.6,
              paddingLeft: '24px',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: '#10B981',
                fontWeight: 700
              }}>✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Common Mistakes */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <FaExclamationTriangle style={{ color: '#F59E0B' }} />
          Sai lầm thường gặp
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {exercise.commonMistakes.map((mistake, index) => (
            <li key={index} style={{
              color: '#D1D5DB',
              fontSize: '16px',
              lineHeight: 1.6,
              paddingLeft: '24px',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: '#EF4444',
                fontWeight: 700
              }}>✗</span>
              {mistake}
            </li>
          ))}
        </ul>
      </div>

      {/* Related Exercises */}
      {getRelatedExercises().length > 0 && (
        <div style={{
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '20px'
          }}>
            Bài tập liên quan
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {getRelatedExercises().map(relatedEx => (
              <div
                key={relatedEx.id}
                onClick={() => navigate(`/exercises/${relatedEx.id}`)}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    margin: 0
                  }}>
                    {relatedEx.name}
                  </h3>
                  <span style={{
                    background: getDifficultyColor(relatedEx.difficulty),
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 600
                  }}>
                    {relatedEx.difficulty}
                  </span>
                </div>
                <p style={{
                  color: '#D1D5DB',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  marginBottom: '12px'
                }}>
                  {relatedEx.description}
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaClock style={{ color: '#9CA3AF', fontSize: '12px' }} />
                    <span style={{ color: '#9CA3AF', fontSize: '13px' }}>{relatedEx.duration}s</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaFire style={{ color: '#FF6B35', fontSize: '12px' }} />
                    <span style={{ color: '#9CA3AF', fontSize: '13px' }}>{relatedEx.calories} cal</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add to Workout Button */}
      <button
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
          color: '#FFFFFF',
          padding: '16px',
          borderRadius: '12px',
          border: 'none',
          fontSize: '18px',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.3)';
        }}
        onClick={() => navigate('/workout')}
      >
        Thêm vào Workout
      </button>
    </div>
  );
};

export default ExerciseDetail;
