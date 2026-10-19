import { Schema, model, Document } from "mongoose";

export interface IReview extends Document {
  reviewId: number;
  userId: number;
  bookingId: number;
  hotelId: number;
  comment: string;
  rating: number;
  isSynced: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    reviewId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: Number,
      required: true,
      index: true,
    },
    bookingId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    hotelId: {
      type: Number,
      required: true,
      index: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    isSynced: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes for common query patterns
reviewSchema.index({ hotelId: 1, rating: -1 });
reviewSchema.index({ userId: 1 });

export const Review = model<IReview>("Review", reviewSchema);