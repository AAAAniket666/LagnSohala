import express from 'express';
import {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController';

const router = express.Router();

router.route('/').get(getBlogPosts).post(createBlogPost);

router.route('/:slug').get(getBlogPost).put(updateBlogPost).delete(deleteBlogPost);

export default router;
