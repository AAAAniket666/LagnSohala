import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';

// @desc    Get all blog posts
// @route   GET /api/blog
export const getBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, sort = '-date', page = '1', limit = '9' } = req.query;

    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$text = { $search: search as string };
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const posts = await BlogPost.find(filter)
      .sort(sort as string)
      .skip(skip)
      .limit(limitNum);

    const total = await BlogPost.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Get single blog post
// @route   GET /api/blog/:slug
export const getBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Create new blog post
// @route   POST /api/blog
export const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPost.create(req.body);

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating blog post',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:slug
export const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating blog post',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:slug
export const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPost.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
