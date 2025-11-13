import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaDumbbell, FaClock, FaFire } from 'react-icons/fa';

interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  duration: number;
  calories: number;
  description: string;
  instructions: string[];
  equipment: string[];
  targetMuscles: string[];
}

const Exercises: React.FC = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tất cả');

  // Mock data - sẽ thay bằng API call
  useEffect(() => {
    const mockExercises: Exercise[] = [
      {
        id: '1',
        name: 'Push-ups',
        category: 'Ngực',
        difficulty: 'Trung bình',
        duration: 30,
        calories: 50,
        description: 'Bài tập cơ bản cho cơ ngực và cánh tay',
        instructions: [
          'Nằm sấp, tay đặt rộng bằng vai',
          'Đẩy người lên xuống, giữ thẳng lưng',
          'Hít vào khi xuống, thở ra khi đẩy lên'
        ],
        equipment: [],
        targetMuscles: ['Ngực', 'Vai', 'Tay sau']
      },
      {
        id: '2',
        name: 'Squats',
        category: 'Chân',
        difficulty: 'Dễ',
        duration: 45,
        calories: 60,
        description: 'Bài tập cơ bản cho cơ đùi và mông',
        instructions: [
          'Đứng thẳng, chân rộng bằng vai',
          'Ngồi xuống như ngồi ghế',
          'Đứng lên, giữ lưng thẳng'
        ],
        equipment: [],
        targetMuscles: ['Đùi trước', 'Mông', 'Bắp chân']
      },
      {
        id: '3',
        name: 'Plank',
        category: 'Bụng',
        difficulty: 'Trung bình',
        duration: 60,
        calories: 40,
        description: 'Bài tập tăng cường cơ core',
        instructions: [
          'Nằm sấp, chống tay và mũi chân',
          'Giữ thẳng từ đầu đến chân',
          'Thở đều, không nín thở'
        ],
        equipment: [],
        targetMuscles: ['Bụng', 'Lưng', 'Vai']
      }
    ];
    setExercises(mockExercises);
    setFilteredExercises(mockExercises);
  }, []);

  useEffect(() => {
    let filtered = exercises;

    if (searchTerm) {
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter(exercise => exercise.category === selectedCategory);
    }

    if (selectedDifficulty !== 'Tất cả') {
      filtered = filtered.filter(exercise => exercise.difficulty === selectedDifficulty);
    }

    setFilteredExercises(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, exercises]);

  const categories = ['Tất cả', 'Ngực', 'Chân', 'Bụng', 'Lưng', 'Vai', 'Tay'];
  const difficulties = ['Tất cả', 'Dễ', 'Trung bình', 'Khó'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return '#10B981';
      case 'Trung bình': return '#F59E0B';
      case 'Khó': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          Thư viện bài tập
        </h1>
        <p style={{
          color: '#D1D5DB',
          textAlign: 'center',
          fontSize: '18px'
        }}>
          Khám phá các bài tập phù hợp với bạn
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <FaSearch style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF'
            }} />
            <input
              type="text"
              placeholder="Tìm kiếm bài tập..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#FFFFFF',
              outline: 'none'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category} style={{ background: '#1F2937' }}>
                {category}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{
              padding: '12px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#FFFFFF',
              outline: 'none'
            }}
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty} style={{ background: '#1F2937' }}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exercise Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {filteredExercises.map(exercise => (
          <div
            key={exercise.id}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(16px)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
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
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '4px'
                }}>
                  {exercise.name}
                </h3>
                <span style={{
                  background: getDifficultyColor(exercise.difficulty),
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  {exercise.difficulty}
                </span>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FaDumbbell style={{ color: '#FFFFFF', fontSize: '16px' }} />
              </div>
            </div>

            <p style={{
              color: '#D1D5DB',
              marginBottom: '16px',
              lineHeight: 1.5
            }}>
              {exercise.description}
            </p>

            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#9CA3AF'
              }}>
                <FaClock style={{ fontSize: '14px' }} />
                <span style={{ fontSize: '14px' }}>{exercise.duration}s</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#9CA3AF'
              }}>
                <FaFire style={{ fontSize: '14px', color: '#FF6B35' }} />
                <span style={{ fontSize: '14px' }}>{exercise.calories} cal</span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '8px'
              }}>
                Nhóm cơ:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {exercise.targetMuscles.map(muscle => (
                  <span
                    key={muscle}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate(`/exercises/${exercise.id}`)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF4444 100%)',
                color: '#FFFFFF',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '48px',
          color: '#9CA3AF'
        }}>
          <FaDumbbell style={{ fontSize: '48px', marginBottom: '16px' }} />
          <p style={{ fontSize: '18px' }}>Không tìm thấy bài tập nào</p>
        </div>
      )}
    </div>
  );
};

export default Exercises;