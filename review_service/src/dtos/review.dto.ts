import { z } from "zod";

export const CreateReviewSchema = z.object({
  user_id: z.number().int().positive("User ID is required and must be a positive integer"),
  booking_id: z.number().int().positive("Booking ID is required and must be a positive integer"),
  hotel_id: z.number().int().positive("Hotel ID is required and must be a positive integer"),
  comment: z.string().min(1, "Comment cannot be empty").max(1000, "Comment cannot exceed 1000 characters"),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
});

export const UpdateReviewSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty").max(1000, "Comment cannot exceed 1000 characters"),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
});

export type CreateReviewRequestDTO = z.infer<typeof CreateReviewSchema>;
export type UpdateReviewRequestDTO = z.infer<typeof UpdateReviewSchema>;

export interface ReviewResponseDTO {
  id: number;
  user_id: number;
  booking_id: number;
  hotel_id: number;
  comment: string;
  rating: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  is_synced: boolean;
}