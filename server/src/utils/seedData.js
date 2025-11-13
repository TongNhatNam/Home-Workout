const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');

const exercisesData = [
  // Chest exercises
  {
    name: 'Push-ups',
    description: 'Bài tập hít đất cơ bản giúp phát triển cơ ngực, vai và tay',
    instructions: [
      'Nằm sấp, tay đặt rộng bằng vai',
      'Giữ thân người thẳng từ đầu đến chân',
      'Hạ người xuống cho đến khi ngực gần chạm đất',
      'Đẩy người lên về vị trí ban đầu'
    ],
    muscleGroups: ['chest', 'shoulders', 'arms'],
    difficulty: 'beginner',
    equipment: ['none'],
    duration: 30,
    caloriesPerMinute: 8,
    videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    tips: [
      'Giữ cơ bụng căng để thân người thẳng',
      'Thở ra khi đẩy lên, thở vào khi hạ xuống'
    ]
  },
  {
    name: 'Diamond Push-ups',
    description: 'Biến thể hít đất tập trung vào cơ tam đầu',
    instructions: [
      'Tạo hình kim cương bằng hai tay',
      'Thực hiện động tác hít đất',
      'Tập trung lực vào cơ tam đầu'
    ],
    muscleGroups: ['arms', 'chest'],
    difficulty: 'intermediate',
    equipment: ['none'],
    duration: 30,
    caloriesPerMinute: 10
  },

  // Back exercises
  {
    name: 'Superman',
    description: 'Bài tập tăng cường cơ lưng dưới',
    instructions: [
      'Nằm sấp, tay duỗi thẳng về phía trước',
      'Nâng ngực và chân lên khỏi mặt đất',
      'Giữ trong 2-3 giây rồi hạ xuống'
    ],
    muscleGroups: ['back'],
    difficulty: 'beginner',
    equipment: ['yoga_mat'],
    duration: 45,
    caloriesPerMinute: 6
  },

  // Legs exercises
  {
    name: 'Squats',
    description: 'Bài tập cơ bản cho cơ chân và mông',
    instructions: [
      'Đứng thẳng, chân rộng bằng vai',
      'Hạ người xuống như ngồi ghế',
      'Giữ lưng thẳng, đầu gối không vượt mũi chân',
      'Đứng lên về vị trí ban đầu'
    ],
    muscleGroups: ['legs', 'glutes'],
    difficulty: 'beginner',
    equipment: ['none'],
    duration: 60,
    caloriesPerMinute: 8,
    videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U'
  },
  {
    name: 'Jump Squats',
    description: 'Biến thể squat với nhảy tăng cường cardio',
    instructions: [
      'Thực hiện squat bình thường',
      'Khi đứng lên, nhảy cao lên',
      'Hạ cánh nhẹ nhàng và tiếp tục'
    ],
    muscleGroups: ['legs', 'glutes', 'cardio'],
    difficulty: 'intermediate',
    equipment: ['none'],
    duration: 45,
    caloriesPerMinute: 12
  },

  // Abs exercises
  {
    name: 'Plank',
    description: 'Bài tập tĩnh tăng cường cơ core',
    instructions: [
      'Nằm sấp, chống tay hoặc cẳng tay',
      'Giữ thân người thẳng từ đầu đến chân',
      'Căng cơ bụng và giữ tư thế'
    ],
    muscleGroups: ['abs'],
    difficulty: 'beginner',
    equipment: ['yoga_mat'],
    duration: 60,
    caloriesPerMinute: 5
  },
  {
    name: 'Mountain Climbers',
    description: 'Bài tập cardio kết hợp tăng cường core',
    instructions: [
      'Bắt đầu ở tư thế plank',
      'Luân phiên đưa đầu gối về ngực',
      'Thực hiện nhanh như chạy tại chỗ'
    ],
    muscleGroups: ['abs', 'cardio'],
    difficulty: 'intermediate',
    equipment: ['none'],
    duration: 30,
    caloriesPerMinute: 15
  },

  // Cardio exercises
  {
    name: 'Jumping Jacks',
    description: 'Bài tập cardio toàn thân',
    instructions: [
      'Đứng thẳng, tay để hai bên',
      'Nhảy mở chân, đồng thời giơ tay lên đầu',
      'Nhảy khép chân, hạ tay xuống'
    ],
    muscleGroups: ['cardio'],
    difficulty: 'beginner',
    equipment: ['none'],
    duration: 60,
    caloriesPerMinute: 10
  },
  {
    name: 'Burpees',
    description: 'Bài tập toàn thân cường độ cao',
    instructions: [
      'Đứng thẳng',
      'Squat xuống, đặt tay xuống đất',
      'Nhảy chân ra sau thành tư thế plank',
      'Làm 1 push-up',
      'Nhảy chân về phía trước',
      'Nhảy cao lên với tay giơ lên'
    ],
    muscleGroups: ['cardio', 'chest', 'legs', 'abs'],
    difficulty: 'advanced',
    equipment: ['none'],
    duration: 45,
    caloriesPerMinute: 20
  }
];

const workoutsData = [
  {
    name: 'Beginner Full Body',
    description: 'Bài tập toàn thân cho người mới bắt đầu',
    difficulty: 'beginner',
    estimatedDuration: 20,
    estimatedCalories: 150,
    targetMuscleGroups: ['chest', 'legs', 'abs', 'cardio'],
    equipment: ['none'],
    category: 'full_body',
    exercises: [] // Sẽ được populate sau khi tạo exercises
  },
  {
    name: 'HIIT Cardio Blast',
    description: 'Bài tập cardio cường độ cao đốt cháy calories',
    difficulty: 'intermediate',
    estimatedDuration: 15,
    estimatedCalories: 200,
    targetMuscleGroups: ['cardio', 'legs', 'abs'],
    equipment: ['none'],
    category: 'hiit',
    exercises: []
  },
  {
    name: 'Upper Body Strength',
    description: 'Tập trung phát triển cơ thân trên',
    difficulty: 'intermediate',
    estimatedDuration: 25,
    estimatedCalories: 180,
    targetMuscleGroups: ['chest', 'back', 'shoulders', 'arms'],
    equipment: ['none'],
    category: 'strength',
    exercises: []
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Bắt đầu seed database...');

    // Xóa dữ liệu cũ
    await Exercise.deleteMany({});
    await Workout.deleteMany({});
    console.log('✅ Đã xóa dữ liệu cũ');

    // Tạo exercises
    const createdExercises = await Exercise.insertMany(exercisesData);
    console.log(`✅ Đã tạo ${createdExercises.length} bài tập`);

    // Tạo workouts với exercises
    const workoutsWithExercises = workoutsData.map((workout, index) => {
      let exercises = [];
      
      if (index === 0) { // Beginner Full Body
        exercises = [
          { exercise: createdExercises[0]._id, sets: 2, reps: 10, restTime: 30 }, // Push-ups
          { exercise: createdExercises[3]._id, sets: 2, reps: 15, restTime: 30 }, // Squats
          { exercise: createdExercises[5]._id, sets: 2, duration: 30, restTime: 30 }, // Plank
          { exercise: createdExercises[7]._id, sets: 2, reps: 20, restTime: 30 }  // Jumping Jacks
        ];
      } else if (index === 1) { // HIIT Cardio
        exercises = [
          { exercise: createdExercises[4]._id, sets: 3, reps: 15, restTime: 20 }, // Jump Squats
          { exercise: createdExercises[6]._id, sets: 3, reps: 20, restTime: 20 }, // Mountain Climbers
          { exercise: createdExercises[8]._id, sets: 3, reps: 10, restTime: 20 }  // Burpees
        ];
      } else { // Upper Body Strength
        exercises = [
          { exercise: createdExercises[0]._id, sets: 3, reps: 12, restTime: 45 }, // Push-ups
          { exercise: createdExercises[1]._id, sets: 3, reps: 8, restTime: 45 },  // Diamond Push-ups
          { exercise: createdExercises[2]._id, sets: 3, reps: 15, restTime: 45 }  // Superman
        ];
      }

      return { ...workout, exercises };
    });

    const createdWorkouts = await Workout.insertMany(workoutsWithExercises);
    console.log(`✅ Đã tạo ${createdWorkouts.length} workout`);

    console.log('🎉 Seed database thành công!');
    console.log('\n📊 Thống kê:');
    console.log(`- Exercises: ${createdExercises.length}`);
    console.log(`- Workouts: ${createdWorkouts.length}`);
    
  } catch (error) {
    console.error('❌ Lỗi khi seed database:', error);
    throw error;
  }
};

module.exports = { seedDatabase };