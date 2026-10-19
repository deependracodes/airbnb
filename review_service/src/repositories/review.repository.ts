import { Review, IReview } from "../models/review.js";
import { CreateReviewRequestDTO, UpdateReviewRequestDTO } from "../dtos/review.dto.js";

export const createReviewRepo = async (data: CreateReviewRequestDTO & { reviewId: number }): Promise<IReview> => {
  return await Review.create(data);
};

export const findAllReviewsRepo = async (): Promise<IReview[]> => {
  return await Review.find({ deletedAt: null });
};

export const findReviewByIdRepo = async (reviewId: number): Promise<IReview | null> => {
  return await Review.findOne({ reviewId, deletedAt: null });
};

export const findReviewByBookingIdRepo = async (bookingId: number): Promise<IReview | null> => {
  return await Review.findOne({ bookingId, deletedAt: null });
};

export const findReviewsByUserIdRepo = async (userId: number): Promise<IReview[]> => {
  return await Review.find({ userId, deletedAt: null });
};

export const findReviewsByHotelIdRepo = async (hotelId: number): Promise<IReview[]> => {
  return await Review.find({ hotelId, deletedAt: null });
};

export const updateReviewRepo = async (reviewId: number, data: UpdateReviewRequestDTO): Promise<IReview | null> => {
  return await Review.findOneAndUpdate(
    { reviewId, deletedAt: null },
    { $set: data },
    { new: true }
  );
};

export const softDeleteReviewRepo = async (reviewId: number): Promise<IReview | null> => {
  return await Review.findOneAndUpdate(
    { reviewId, deletedAt: null },
    { $set: { deletedAt: new Date() } },
    { new: true }
  );
};

export const getNextReviewIdRepo = async (): Promise<number> => {
  const lastReview = await Review.findOne().sort({ reviewId: -1 });
  return lastReview ? lastReview.reviewId + 1 : 1;
};