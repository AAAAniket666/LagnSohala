import { Request, Response } from 'express';
import SuccessStory from '../models/SuccessStory';

// @desc    Get all success stories
// @route   GET /api/stories
export const getSuccessStories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sort = '-weddingDate' } = req.query;

    const stories = await SuccessStory.find().sort(sort as string);

    res.status(200).json({
      success: true,
      count: stories.length,
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching success stories',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Get single success story
// @route   GET /api/stories/:id
export const getSuccessStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      res.status(404).json({
        success: false,
        message: 'Success story not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: story,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching success story',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Create new success story
// @route   POST /api/stories
export const createSuccessStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const story = await SuccessStory.create(req.body);

    res.status(201).json({
      success: true,
      data: story,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating success story',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Update success story
// @route   PUT /api/stories/:id
export const updateSuccessStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const story = await SuccessStory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!story) {
      res.status(404).json({
        success: false,
        message: 'Success story not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: story,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating success story',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Delete success story
// @route   DELETE /api/stories/:id
export const deleteSuccessStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const story = await SuccessStory.findByIdAndDelete(req.params.id);

    if (!story) {
      res.status(404).json({
        success: false,
        message: 'Success story not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Success story deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting success story',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
