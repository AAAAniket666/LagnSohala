import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: string;
  religion: string;
  community: string;
  location: string;
  education: string;
  occupation: string;
  about: string;
  image: string;
  verified: boolean;
  premium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [18, 'Age must be at least 18'],
      max: [100, 'Age must be less than 100'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['male', 'female'],
    },
    height: {
      type: String,
      required: [true, 'Height is required'],
    },
    religion: {
      type: String,
      required: [true, 'Religion is required'],
      trim: true,
    },
    community: {
      type: String,
      required: [true, 'Community is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    education: {
      type: String,
      required: [true, 'Education is required'],
      trim: true,
    },
    occupation: {
      type: String,
      required: [true, 'Occupation is required'],
      trim: true,
    },
    about: {
      type: String,
      required: [true, 'About section is required'],
      maxlength: [1000, 'About section cannot exceed 1000 characters'],
    },
    image: {
      type: String,
      required: [true, 'Profile image is required'],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    premium: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search optimization
ProfileSchema.index({ name: 'text', location: 'text', occupation: 'text' });
ProfileSchema.index({ gender: 1, age: 1, religion: 1, community: 1 });

export default mongoose.model<IProfile>('Profile', ProfileSchema);
