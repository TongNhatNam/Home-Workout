const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên workout là bắt buộc'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  exercises: [{
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },
    sets: {
      type: Number,
      default: 1
    },
    reps: {
      type: Number
    },
    duration: {
      type: Number // seconds
    },
    restTime: {
      type: Number, // seconds between sets
      default: 30
    }
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  estimatedDuration: {
    type: Number, // total minutes
    required: true
  },
  estimatedCalories: {
    type: Number,
    required: true
  },
  targetMuscleGroups: [{
    type: String,
    enum: ['chest', 'back', 'shoulders', 'arms', 'abs', 'legs', 'glutes', 'cardio']
  }],
  equipment: [{
    type: String,
    enum: ['none', 'dumbbells', 'resistance_band', 'yoga_mat', 'pull_up_bar']
  }],
  category: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'hiit', 'full_body'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Virtual để tính tổng thời gian
workoutSchema.virtual('totalDuration').get(function() {
  return this.exercises.reduce((total, ex) => {
    return total + (ex.duration * ex.sets) + (ex.restTime * (ex.sets - 1));
  }, 0);
});

module.exports = mongoose.model('Workout', workoutSchema);