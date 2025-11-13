import React, { useState } from 'react';
import { FaPlay, FaPause, FaStop, FaCheck, FaClock, FaFire } from 'react-icons/fa';

interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
}

interface WorkoutTrackerProps {
  exercises: Exercise[];
  onComplete: (workoutData: any) => void;
}

const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ exercises, onComplete }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercises[0]?.duration || 0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [totalCalories, setTotalCalories] = useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleExerciseComplete();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, timeLeft]);

  const handleExerciseComplete = () => {
    const currentExercise = exercises[currentExerciseIndex];
    const newCompletedExercises = [...completedExercises, currentExercise.id];
    const newTotalCalories = totalCalories + currentExercise.calories;
    
    setCompletedExercises(newCompletedExercises);
    setTotalCalories(newTotalCalories);
    
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setTimeLeft(exercises[currentExerciseIndex + 1].duration);
      setIsActive(false);
    } else {
      // Workout completed
      onComplete({
        exercises: newCompletedExercises,
        totalCalories: newTotalCalories,
        duration: exercises.reduce((sum, ex) => sum + ex.duration, 0)
      });
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(exercises[currentExerciseIndex]?.duration || 0);
  };

  const skipExercise = () => {
    const currentExercise = exercises[currentExerciseIndex];
    const newCompletedExercises = [...completedExercises, currentExercise.id];
    const newTotalCalories = totalCalories + currentExercise.calories;
    
    setCompletedExercises(newCompletedExercises);
    setTotalCalories(newTotalCalories);
    
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setTimeLeft(exercises[currentExerciseIndex + 1].duration);
      setIsActive(false);
    } else {
      // Bài tập cuối cùng - hoàn thành workout
      onComplete({
        exercises: newCompletedExercises,
        totalCalories: newTotalCalories,
        duration: exercises.reduce((sum, ex) => sum + ex.duration, 0)
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentExercise = exercises[currentExerciseIndex];
  const progress = ((exercises.length - (exercises.length - currentExerciseIndex)) / exercises.length) * 100;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(16px)',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      {/* Progress Bar */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '10px',
        height: '8px',
        marginBottom: '24px',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
          height: '100%',
          width: `${progress}%`,
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Current Exercise */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '8px'
        }}>
          {currentExercise?.name}
        </h2>
        <p style={{
          color: '#D1D5DB',
          fontSize: '16px'
        }}>
          Bài tập {currentExerciseIndex + 1} / {exercises.length}
        </p>
      </div>

      {/* Timer */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <div style={{
          fontSize: '64px',
          fontWeight: 900,
          color: '#FFFFFF',
          marginBottom: '16px',
          fontFamily: 'monospace'
        }}>
          {formatTime(timeLeft)}
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#9CA3AF'
          }}>
            <FaClock style={{ fontSize: '16px' }} />
            <span>{currentExercise?.duration}s</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#9CA3AF'
          }}>
            <FaFire style={{ fontSize: '16px', color: '#FF6B35' }} />
            <span>{currentExercise?.calories} cal</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <button
          onClick={toggleTimer}
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50%',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '24px',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.3)';
          }}
        >
          {isActive ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={resetTimer}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          <FaStop />
        </button>

        <button
          onClick={skipExercise}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
          }}
          title={currentExerciseIndex >= exercises.length - 1 ? 'Hoàn thành workout' : 'Bỏ qua bài tập'}
        >
          <FaCheck />
        </button>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '4px'
          }}>
            {completedExercises.length}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#D1D5DB'
          }}>
            Hoàn thành
          </div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#FF6B35',
            marginBottom: '4px'
          }}>
            {totalCalories}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#D1D5DB'
          }}>
            Calories
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;