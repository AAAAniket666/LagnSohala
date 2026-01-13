import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    image: {
      type: String,
      required: [true, 'Featured image is required'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Publication date is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    readTime: {
      type: String,
      required: [true, 'Read time is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for search and filtering
BlogPostSchema.index({ title: 'text', content: 'text' });
BlogPostSchema.index({ category: 1, date: -1 });

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
