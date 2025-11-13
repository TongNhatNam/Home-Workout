const express = require('express');
const {
  getExercises,
  getExercise,
  createExercise,
  getMuscleGroups
} = require('../controllers/exerciseController');

const router = express.Router();

// Public routes
router.get('/', getExercises);
router.get('/muscle-groups', getMuscleGroups);
router.get('/:id', getExercise);

// Protected routes (sẽ thêm auth middleware sau)
router.post('/', createExercise);

module.exports = router;