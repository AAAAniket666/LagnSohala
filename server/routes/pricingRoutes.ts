import express from 'express';
import {
  getPricingPlans,
  getPricingPlan,
  createPricingPlan,
  updatePricingPlan,
  deletePricingPlan,
} from '../controllers/pricingController';

const router = express.Router();

router.route('/').get(getPricingPlans).post(createPricingPlan);

router.route('/:id').get(getPricingPlan).put(updatePricingPlan).delete(deletePricingPlan);

export default router;
