import mongoose, { Schema, Document } from 'mongoose';

export interface IPricingPlan extends Document {
  name: string;
  price: number;
  period: string;
  popular: boolean;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PricingPlanSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Plan name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    period: {
      type: String,
      required: [true, 'Period is required'],
      trim: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    features: {
      type: [String],
      required: [true, 'Features are required'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one feature is required',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPricingPlan>('PricingPlan', PricingPlanSchema);
