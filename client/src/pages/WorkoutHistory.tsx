import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDumbbell, FaFire, FaEye, FaBolt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { getWorkoutHistory, getExerciseViews, getWorkoutStats, WorkoutRecord, ExerciseView } from '../utils/workoutStorage';

const WorkoutHistory: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<WorkoutRecord[]>([]);
  const [views, setViews] = useState<ExerciseView[]>([]);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    totalExerciseViews: 0,
    currentStreak: 0
  });

  useEffect(() => {
    setHistory(getWorkoutHistory());
    setViews(getExerciseViews());
    setStats(getWorkoutStats());
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hôm nay';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hôm qua';
    } else {
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} phút`;
  };

  // Get last 7 days for chart
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const getWorkoutsForDay = (date: Date) => {
    return history.filter(w => {
      const workoutDate = new Date(w.date);
      return workoutDate.toDateString() === date.toDateString();
    }).length;
  };

  const last7Days = getLast7Days();
  const maxWorkouts = Math.max(...last7Days.map(d => getWorkoutsForDay(d)), 1);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
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
          Lịch sử tập luyện
        </h1>
        <p style={{
          color: '#D1D5DB',
          fontSize: '18px'
        }}>
          Theo dõi tiến độ và thành tích của bạn
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaDumbbell style={{ color: '#FFFFFF', fontSize: '20px' }} />
            </div>
            <span style={{ color: '#D1D5DB', fontSize: '14px' }}>Tổng workouts</span>
          </div>
          <p style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#FFFFFF'
          }}>
            {stats.totalWorkouts}
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              background: '#EF4444',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaFire style={{ color: '#FFFFFF', fontSize: '20px' }} />
            </div>
            <span style={{ color: '#D1D5DB', fontSize: '14px' }}>Tổng calories</span>
          </div>
          <p style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#FFFFFF'
          }}>
            {stats.totalCalories}
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              background: '#3B82F6',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaEye style={{ color: '#FFFFFF', fontSize: '20px' }} />
            </div>
            <span style={{ color: '#D1D5DB', fontSize: '14px' }}>Bài tập đã xem</span>
          </div>
          <p style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#FFFFFF'
          }}>
            {stats.totalExerciseViews}
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              background: '#10B981',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaBolt style={{ color: '#FFFFFF', fontSize: '20px' }} />
            </div>
            <span style={{ color: '#D1D5DB', fontSize: '14px' }}>Streak hiện tại</span>
          </div>
          <p style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#FFFFFF'
          }}>
            {stats.currentStreak} ngày
          </p>
        </div>
      </div>

      {/* 7 Days Chart */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        marginBottom: '32px'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '20px'
        }}>
          7 ngày gần nhất
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          gap: '12px',
          height: '200px'
        }}>
          {last7Days.map((day, index) => {
            const count = getWorkoutsForDay(day);
            const height = maxWorkouts > 0 ? (count / maxWorkouts) * 100 : 0;
            
            return (
              <div key={index} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '100%',
                  height: `${Math.max(height, 5)}%`,
                  background: count > 0 
                    ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px 8px 0 0',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}>
                  {count > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-24px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      {count}
                    </span>
                  )}
                </div>
                <span style={{
                  color: '#9CA3AF',
                  fontSize: '12px',
                  fontWeight: 500
                }}>
                  {day.toLocaleDateString('vi-VN', { weekday: 'short' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workout History List */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '20px'
        }}>
          Lịch sử workout
        </h3>

        {history.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#9CA3AF'
          }}>
            <FaDumbbell style={{ fontSize: '48px', marginBottom: '16px' }} />
            <p>Chưa có workout nào. Bắt đầu tập luyện ngay!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[...history].reverse().map((workout) => (
              <div
                key={workout.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
                    borderRadius: '8px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FaCalendarAlt style={{ color: '#FFFFFF', fontSize: '16px' }} />
                  </div>
                  <div>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      marginBottom: '4px'
                    }}>
                      {formatDate(workout.date)}
                    </p>
                    <p style={{
                      color: '#9CA3AF',
                      fontSize: '14px'
                    }}>
                      {workout.exercises.length} bài tập
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#9CA3AF'
                  }}>
                    <FaClock style={{ fontSize: '14px' }} />
                    <span style={{ fontSize: '14px' }}>{formatTime(workout.duration)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#FF6B35'
                  }}>
                    <FaFire style={{ fontSize: '14px' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{workout.totalCalories} cal</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Exercises */}
      {views.length > 0 && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '20px'
          }}>
            Bài tập được xem nhiều nhất
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[...views]
              .sort((a, b) => b.viewCount - a.viewCount)
              .slice(0, 5)
              .map((view, index) => (
                <div
                  key={view.exerciseId}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      background: index < 3 
                        ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)'
                        : 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: '#FFFFFF'
                    }}>
                      {index + 1}
                    </div>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: 600
                    }}>
                      {view.exerciseName}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#9CA3AF'
                  }}>
                    <FaEye style={{ fontSize: '14px' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{view.viewCount} lần</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;