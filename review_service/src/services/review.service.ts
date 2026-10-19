import * as reviewRepo from "../repositories/review.repository.js";
import { CreateReviewRequestDTO, UpdateReviewRequestDTO } from "../dtos/review.dto.js";
import { IReview } from "../models/review.js";

export const createReviewService = async (data: CreateReviewRequestDTO): Promise<IReview> => {
  const existing = await reviewRepo.findReviewByBookingIdRepo(data.booking_id);
  if (existing) {
    throw new Error("Review for this booking already exists");
  }
  const reviewId = await reviewRepo.getNextReviewIdRepo();
  return await reviewRepo.createReviewRepo({
    ...data,
    reviewId,
  });
};

export const getAllReviewsService = async (): Promise<IReview[]> => {
  return await reviewRepo.findAllReviewsRepo();
};

export const getReviewByIdService = async (id: number): Promise<IReview> => {
  const review = await reviewRepo.findReviewByIdRepo(id);
  if (!review) {
    throw new Error("Review not found");
  }
  return review;
};

export const getReviewsByUserIdService = async (userId: number): Promise<IReview[]> => {
  return await reviewRepo.findReviewsByUserIdRepo(userId);
};

export const getReviewsByHotelIdService = async (hotelId: number): Promise<IReview[]> => {
  return await reviewRepo.findReviewsByHotelIdRepo(hotelId);
};

export const getReviewsByBookingIdService = async (bookingId: number): Promise<IReview | null> => {
  return await reviewRepo.findReviewByBookingIdRepo(bookingId);
};

export const updateReviewService = async (id: number, data: UpdateReviewRequestDTO): Promise<IReview> => {
  const updated = await reviewRepo.updateReviewRepo(id, data);
  if (!updated) {
    throw new Error("Review not found or already deleted");
  }
  return updated;
};

export const deleteReviewService = async (id: number): Promise<IReview> => {
  const deleted = await reviewRepo.softDeleteReviewRepo(id);
  if (!deleted) {
    throw new Error("Review not found or already deleted");
  }
  return deleted;
};