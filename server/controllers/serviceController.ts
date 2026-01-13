import { Request, Response } from 'express';
import WeddingService from '../models/WeddingService';

// @desc    Get all wedding services
// @route   GET /api/services
export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, minRating, sort = '-rating' } = req.query;

    const filter: any = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating as string) };
    }

    const services = await WeddingService.find(filter).sort(sort as string);

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
export const getService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await WeddingService.findById(req.params.id);

    if (!service) {
      res.status(404).json({
        success: false,
        message: 'Service not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Create new service
// @route   POST /api/services
export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await WeddingService.create(req.body);

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating service',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await WeddingService.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      res.status(404).json({
        success: false,
        message: 'Service not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating service',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await WeddingService.findByIdAndDelete(req.params.id);

    if (!service) {
      res.status(404).json({
        success: false,
        message: 'Service not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
