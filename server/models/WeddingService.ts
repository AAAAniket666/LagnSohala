import mongoose, { Schema, Document } from 'mongoose';

export interface IWeddingService extends Document {
  name: string;
  category: string;
  description: string;
  icon: string;
  image: string;
  priceRange: string;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const WeddingServiceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    icon: {
      type: String,
      required: [true, 'Icon is required'],
    },
    image: {
      type: String,
      required: [true, 'Service image is required'],
    },
    priceRange: {
      type: String,
      required: [true, 'Price range is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating must be at most 5'],
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
      min: [0, 'Reviews cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for category filtering
WeddingServiceSchema.index({ category: 1, rating: -1 });

export default mongoose.model<IWeddingService>('WeddingService', WeddingServiceSchema);
