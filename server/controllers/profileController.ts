import { Request, Response } from 'express';
import Profile from '../models/Profile';

// @desc    Get all profiles
// @route   GET /api/profiles
export const getProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      gender,
      minAge,
      maxAge,
      religion,
      community,
      location,
      education,
      occupation,
      verified,
      premium,
      search,
      sort = '-createdAt',
      page = '1',
      limit = '12'
    } = req.query;

    // Build filter object
    const filter: any = {};

    if (gender) filter.gender = gender;
    if (religion) filter.religion = religion;
    if (community) filter.community = community;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (education) filter.education = education;
    if (occupation) filter.occupation = { $regex: occupation, $options: 'i' };
    if (verified !== undefined) filter.verified = verified === 'true';
    if (premium !== undefined) filter.premium = premium === 'true';

    // Age range filter
    if (minAge || maxAge) {
      filter.age = {};
      if (minAge) filter.age.$gte = parseInt(minAge as string);
      if (maxAge) filter.age.$lte = parseInt(maxAge as string);
    }

    // Text search
    if (search) {
      filter.$text = { $search: search as string };
    }

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const profiles = await Profile.find(filter)
      .sort(sort as string)
      .skip(skip)
      .limit(limitNum);

    const total = await Profile.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: profiles.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profiles',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Get single profile
// @route   GET /api/profiles/:id
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Create new profile
// @route   POST /api/profiles
export const createProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await Profile.create(req.body);

    res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating profile',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Update profile
// @route   PUT /api/profiles/:id
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!profile) {
      res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating profile',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Delete profile
// @route   DELETE /api/profiles/:id
export const deleteProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);

    if (!profile) {
      res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting profile',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Get profile stats
// @route   GET /api/profiles/stats
export const getProfileStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const total = await Profile.countDocuments();
    const verified = await Profile.countDocuments({ verified: true });
    const premium = await Profile.countDocuments({ premium: true });
    const males = await Profile.countDocuments({ gender: 'male' });
    const females = await Profile.countDocuments({ gender: 'female' });

    res.status(200).json({
      success: true,
      data: {
        total,
        verified,
        premium,
        males,
        females,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
