const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Tên phải có ít nhất 2 ký tự'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email không hợp lệ'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email không hợp lệ'),
  body('password')
    .notEmpty()
    .withMessage('Mật khẩu là bắt buộc')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', auth, getMe);

module.exports = router;