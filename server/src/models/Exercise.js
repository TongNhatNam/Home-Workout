const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên bài tập là bắt buộc'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Mô tả bài tập là bắt buộc']
  },
  instructions: [{
    type: String
  }],
  muscleGroups: [{
    type: String,
    enum: ['chest', 'back', 'shoulders', 'arms', 'abs', 'legs', 'glutes', 'cardio']
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  equipment: [{
    type: String,
    enum: ['none', 'dumbbells', 'resistance_band', 'yoga_mat', 'pull_up_bar']
  }],
  duration: {
    type: Number, // seconds
    required: true
  },
  caloriesPerMinute: {
    type: Number,
    default: 5
  },
  videoUrl: {
    type: String
  },
  thumbnailUrl: {
    type: String
  },
  tips: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index cho search
exerciseSchema.index({ name: 'text', description: 'text' });
exerciseSchema.index({ muscleGroups: 1, difficulty: 1 });

module.exports = mongoose.model('Exercise', exerciseSchema);