import { Router } from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  deleteUser,
  getUserStats,
} from '../controllers/authController';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// User routes (in production, add authentication middleware)
router.get('/users/:userId', getProfile);
router.put('/users/:userId', updateProfile);
router.put('/users/:userId/password', changePassword);

// Admin routes (in production, add authentication + admin middleware)
router.get('/users', getAllUsers);
router.delete('/users/:userId', deleteUser);
router.get('/users/stats/overview', getUserStats);

export default router;
