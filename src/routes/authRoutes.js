import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';

const router = Router();

router.post(
  '/register',
  [
    body('name')
      .isString().withMessage('Name must be a string')
      .bail()
      .trim()
      .notEmpty().withMessage('Name is required'),
    body('email')
      .isEmail().withMessage('Valid email is required')
      .normalizeEmail(),
    body('password')
      .isString().withMessage('Password must be a string')
      .bail()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  register
);

router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').isString().isLength({ min: 6 })],
  login
);

export default router;


