// Utility functions for workout history storage

export interface WorkoutRecord {
  id: string;
  date: string;
  exercises: string[];
  totalCalories: number;
  duration: number;
}

export interface ExerciseView {
  exerciseId: string;
  exerciseName: string;
  viewCount: number;
  lastViewed: string;
}

// Workout History
export const saveWorkoutRecord = (workout: Omit<WorkoutRecord, 'id'>) => {
  const history = getWorkoutHistory();
  const newRecord: WorkoutRecord = {
    ...workout,
    id: Date.now().toString()
  };
  history.push(newRecord);
  localStorage.setItem('workoutHistory', JSON.stringify(history));
};

export const getWorkoutHistory = (): WorkoutRecord[] => {
  const data = localStorage.getItem('workoutHistory');
  return data ? JSON.parse(data) : [];
};

// Exercise Views
export const trackExerciseView = (exerciseId: string, exerciseName: string) => {
  const views = getExerciseViews();
  const existing = views.find(v => v.exerciseId === exerciseId);
  
  if (existing) {
    existing.viewCount++;
    existing.lastViewed = new Date().toISOString();
  } else {
    views.push({
      exerciseId,
      exerciseName,
      viewCount: 1,
      lastViewed: new Date().toISOString()
    });
  }
  
  localStorage.setItem('exerciseViews', JSON.stringify(views));
};

export const getExerciseViews = (): ExerciseView[] => {
  const data = localStorage.getItem('exerciseViews');
  return data ? JSON.parse(data) : [];
};

// Stats
export const getWorkoutStats = () => {
  const history = getWorkoutHistory();
  const views = getExerciseViews();
  
  const totalWorkouts = history.length;
  const totalCalories = history.reduce((sum, w) => sum + w.totalCalories, 0);
  const totalExerciseViews = views.reduce((sum, v) => sum + v.viewCount, 0);
  
  // Calculate streak
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let currentStreak = 0;
  let lastDate: Date | null = null;
  
  for (const workout of sortedHistory) {
    const workoutDate = new Date(workout.date);
    workoutDate.setHours(0, 0, 0, 0);
    
    if (!lastDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (workoutDate.getTime() === today.getTime() || 
          workoutDate.getTime() === yesterday.getTime()) {
        currentStreak = 1;
        lastDate = workoutDate;
      } else {
        break;
      }
    } else {
      const expectedDate = new Date(lastDate);
      expectedDate.setDate(expectedDate.getDate() - 1);
      
      if (workoutDate.getTime() === expectedDate.getTime()) {
        currentStreak++;
        lastDate = workoutDate;
      } else {
        break;
      }
    }
  }
  
  return {
    totalWorkouts,
    totalCalories,
    totalExerciseViews,
    currentStreak
  };
};