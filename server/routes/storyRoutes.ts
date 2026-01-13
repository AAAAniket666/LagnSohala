import express from 'express';
import {
  getSuccessStories,
  getSuccessStory,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
} from '../controllers/storyController';

const router = express.Router();

router.route('/').get(getSuccessStories).post(createSuccessStory);

router.route('/:id').get(getSuccessStory).put(updateSuccessStory).delete(deleteSuccessStory);

export default router;
