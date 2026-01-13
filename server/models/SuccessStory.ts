import mongoose, { Schema, Document } from 'mongoose';

export interface ISuccessStory extends Document {
  coupleName: string;
  weddingDate: string;
  location: string;
  story: string;
  quote: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const SuccessStorySchema: Schema = new Schema(
  {
    coupleName: {
      type: String,
      required: [true, 'Couple name is required'],
      trim: true,
    },
    weddingDate: {
      type: String,
      required: [true, 'Wedding date is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    story: {
      type: String,
      required: [true, 'Story is required'],
      maxlength: [2000, 'Story cannot exceed 2000 characters'],
    },
    quote: {
      type: String,
      required: [true, 'Quote is required'],
      maxlength: [300, 'Quote cannot exceed 300 characters'],
    },
    image: {
      type: String,
      required: [true, 'Couple image is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for sorting by date
SuccessStorySchema.index({ weddingDate: -1 });

export default mongoose.model<ISuccessStory>('SuccessStory', SuccessStorySchema);
