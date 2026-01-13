import express from 'express';
import {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  getProfileStats,
} from '../controllers/profileController';

const router = express.Router();

router.route('/').get(getProfiles).post(createProfile);

router.route('/stats').get(getProfileStats);

router.route('/:id').get(getProfile).put(updateProfile).delete(deleteProfile);

export default router;
