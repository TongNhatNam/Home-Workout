import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutTracker from '../components/workout/WorkoutTracker';
import { FaDumbbell, FaTrophy, FaHome } from 'react-icons/fa';
import { saveWorkoutRecord } from '../utils/workoutStorage';

const Workout: React.FC = () => {
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [workoutData, setWorkoutData] = useState<any>(null);
  const navigate = useNavigate();

  // Mock workout data - sẽ thay bằng API call
  const sampleWorkout = [
    { id: '1', name: 'Push-ups', duration: 30, calories: 50 },
    { id: '2', name: 'Squats', duration: 45, calories: 60 },
    { id: '3', name: 'Plank', duration: 60, calories: 40 }
  ];

  const handleStartWorkout = () => {
    setWorkoutStarted(true);
  };

  const handleWorkoutComplete = (data: any) => {
    setWorkoutData(data);
    setWorkoutCompleted(true);
    setWorkoutStarted(false);
    
    // Save workout to history
    saveWorkoutRecord({
      date: new Date().toISOString(),
      exercises: data.exercises,
      totalCalories: data.totalCalories,
      duration: data.duration
    });
  };

  const handleBackHome = () => {
    navigate('/');
  };

  if (workoutCompleted) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 0 30px rgba(255, 107, 53, 0.4)'
          }}>
            <FaTrophy style={{ color: '#FFFFFF', fontSize: '40px' }} />
          </div>

          <h2 style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '16px'
          }}>
            Chúc mừng!
          </h2>

          <p style={{
            color: '#D1D5DB',
            fontSize: '18px',
            marginBottom: '32px'
          }}>
            Bạn đã hoàn thành workout thành công!
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '8px'
              }}>
                {workoutData?.exercises?.length || 0}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#D1D5DB'
              }}>
                Bài tập hoàn thành
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#FF6B35',
                marginBottom: '8px'
              }}>
                {workoutData?.totalCalories || 0}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#D1D5DB'
              }}>
                Calories đã đốt
              </div>
            </div>
          </div>

          <button
            onClick={handleBackHome}
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
              color: '#FFFFFF',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto'
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
            <FaHome style={{ fontSize: '16px' }} />
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (workoutStarted) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        padding: '20px'
      }}>
        <WorkoutTracker
          exercises={sampleWorkout}
          onComplete={handleWorkoutComplete}
        />
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 200px)',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0 0 30px rgba(255, 107, 53, 0.4)'
        }}>
          <FaDumbbell style={{ color: '#FFFFFF', fontSize: '40px' }} />
        </div>

        <h2 style={{
          fontSize: '32px',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '16px'
        }}>
          Sẵn sàng tập luyện?
        </h2>

        <p style={{
          color: '#D1D5DB',
          fontSize: '18px',
          marginBottom: '32px'
        }}>
          Workout hôm nay gồm {sampleWorkout.length} bài tập
        </p>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px'
        }}>
          {sampleWorkout.map((exercise, index) => (
            <div
              key={exercise.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: index < sampleWorkout.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
              }}
            >
              <span style={{ color: '#FFFFFF', fontWeight: 500 }}>
                {exercise.name}
              </span>
              <span style={{ color: '#D1D5DB', fontSize: '14px' }}>
                {exercise.duration}s • {exercise.calories} cal
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleStartWorkout}
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
            color: '#FFFFFF',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)',
            width: '100%'
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
          Bắt đầu workout
        </button>
      </div>
    </div>
  );
};

export default Workout;