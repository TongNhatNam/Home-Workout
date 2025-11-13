const Exercise = require('../models/Exercise');

// @desc    Lấy tất cả bài tập
// @route   GET /api/exercises
// @access  Public
const getExercises = async (req, res) => {
  try {
    const {
      muscleGroup,
      difficulty,
      equipment,
      search,
      page = 1,
      limit = 12
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (muscleGroup) {
      filter.muscleGroups = { $in: [muscleGroup] };
    }
    
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    
    if (equipment) {
      filter.equipment = { $in: [equipment] };
    }
    
    if (search) {
      filter.$text = { $search: search };
    }

    // Execute query with pagination
    const exercises = await Exercise.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Exercise.countDocuments(filter);

    res.json({
      success: true,
      data: {
        exercises,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// @desc    Lấy chi tiết bài tập
// @route   GET /api/exercises/:id
// @access  Public
const getExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    
    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài tập'
      });
    }

    res.json({
      success: true,
      data: { exercise }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// @desc    Tạo bài tập mới (Admin only - sẽ implement sau)
// @route   POST /api/exercises
// @access  Private/Admin
const createExercise = async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Tạo bài tập thành công',
      data: { exercise }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// @desc    Lấy muscle groups
// @route   GET /api/exercises/muscle-groups
// @access  Public
const getMuscleGroups = async (req, res) => {
  try {
    const muscleGroups = [
      { value: 'chest', label: 'Ngực' },
      { value: 'back', label: 'Lưng' },
      { value: 'shoulders', label: 'Vai' },
      { value: 'arms', label: 'Tay' },
      { value: 'abs', label: 'Bụng' },
      { value: 'legs', label: 'Chân' },
      { value: 'glutes', label: 'Mông' },
      { value: 'cardio', label: 'Tim mạch' }
    ];

    res.json({
      success: true,
      data: { muscleGroups }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

module.exports = {
  getExercises,
  getExercise,
  createExercise,
  getMuscleGroups
};