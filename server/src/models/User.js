const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên là bắt buộc'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email là bắt buộc'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Mật khẩu là bắt buộc'],
    minlength: 6
  },
  profile: {
    age: Number,
    weight: Number,
    height: Number,
    fitnessGoal: {
      type: String,
      enum: ['lose_weight', 'gain_muscle', 'maintain', 'improve_endurance']
    },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    }
  },
  workoutHistory: [{
    workoutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workout'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    duration: Number,
    caloriesBurned: Number
  }],
  progress: {
    totalWorkouts: {
      type: Number,
      default: 0
    },
    totalCalories: {
      type: Number,
      default: 0
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Hash password trước khi save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method so sánh password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);