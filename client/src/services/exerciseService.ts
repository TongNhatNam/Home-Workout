import api from './api';

export interface Exercise {
  _id: string;
  name: string;
  description: string;
  instructions: string[];
  muscleGroups: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  duration: number;
  caloriesPerMinute: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  tips: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseFilters {
  muscleGroup?: string;
  difficulty?: string;
  equipment?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ExercisesResponse {
  success: boolean;
  data: {
    exercises: Exercise[];
    pagination: {
      current: number;
      pages: number;
      total: number;
    };
  };
}

export interface MuscleGroup {
  value: string;
  label: string;
}

class ExerciseService {
  async getExercises(filters: ExerciseFilters = {}): Promise<ExercisesResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/exercises?${params.toString()}`);
    return response.data;
  }

  async getExercise(id: string): Promise<{ success: boolean; data: { exercise: Exercise } }> {
    const response = await api.get(`/exercises/${id}`);
    return response.data;
  }

  async getMuscleGroups(): Promise<{ success: boolean; data: { muscleGroups: MuscleGroup[] } }> {
    const response = await api.get('/exercises/muscle-groups');
    return response.data;
  }
}

const exerciseService = new ExerciseService();
export default exerciseService;