import { Request, Response } from 'express';
import PricingPlan from '../models/PricingPlan';

// @desc    Get all pricing plans
// @route   GET /api/pricing
export const getPricingPlans = async (_req: Request, res: Response): Promise<void> => {
  try {
    const plans = await PricingPlan.find().sort('price');

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pricing plans',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Get single pricing plan
// @route   GET /api/pricing/:id
export const getPricingPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await PricingPlan.findById(req.params.id);

    if (!plan) {
      res.status(404).json({
        success: false,
        message: 'Pricing plan not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pricing plan',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Create new pricing plan
// @route   POST /api/pricing
export const createPricingPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await PricingPlan.create(req.body);

    res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating pricing plan',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Update pricing plan
// @route   PUT /api/pricing/:id
export const updatePricingPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await PricingPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!plan) {
      res.status(404).json({
        success: false,
        message: 'Pricing plan not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating pricing plan',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// @desc    Delete pricing plan
// @route   DELETE /api/pricing/:id
export const deletePricingPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await PricingPlan.findByIdAndDelete(req.params.id);

    if (!plan) {
      res.status(404).json({
        success: false,
        message: 'Pricing plan not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Pricing plan deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting pricing plan',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
