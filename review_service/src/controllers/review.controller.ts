import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/review.service.js";

export const createReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const review = await reviewService.createReviewService(req.body);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReviewsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const reviews = await reviewService.getAllReviewsService();
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getReviewByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const review = await reviewService.getReviewByIdService(id);
    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const getReviewsByUserIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = parseInt(req.query.user_id as string, 10);
    if (isNaN(userId)) {
      res
        .status(400)
        .json({
          success: false,
          message: "Valid user_id query parameter is required",
        });
      return;
    }
    const reviews = await reviewService.getReviewsByUserIdService(userId);
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

export const getReviewsByHotelIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const hotelId = parseInt(req.query.hotel_id as string, 10);
    if (isNaN(hotelId)) {
      res
        .status(400)
        .json({
          success: false,
          message: "Valid hotel_id query parameter is required",
        });
      return;
    }
    const reviews = await reviewService.getReviewsByHotelIdService(hotelId);
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

export const getReviewsByBookingIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const bookingId = parseInt(req.query.booking_id as string, 10);
    if (isNaN(bookingId)) {
      res
        .status(400)
        .json({
          success: false,
          message: "Valid booking_id query parameter is required",
        });
      return;
    }
    const review = await reviewService.getReviewsByBookingIdService(bookingId);
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

export const updateReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const review = await reviewService.updateReviewService(id, req.body);
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await reviewService.deleteReviewService(id);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
