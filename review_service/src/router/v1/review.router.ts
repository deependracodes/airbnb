import { Router } from "express";
import * as reviewController from "../../controllers/review.controller.js";
import { validateRequestBody } from "../../validators";
import { CreateReviewSchema, UpdateReviewSchema } from "../../dtos/review.dto.js";

const reviewRouter = Router();

// Filter routes placed before dynamic ID routes to prevent path collisions
reviewRouter.get("/user", reviewController.getReviewsByUserIdController);
reviewRouter.get("/hotel", reviewController.getReviewsByHotelIdController);
reviewRouter.get("/booking", reviewController.getReviewsByBookingIdController);

// CRUD routes
reviewRouter.post("/", validateRequestBody(CreateReviewSchema), reviewController.createReviewController);
reviewRouter.get("/", reviewController.getAllReviewsController);
reviewRouter.get("/:id", reviewController.getReviewByIdController);
reviewRouter.put("/:id", validateRequestBody(UpdateReviewSchema), reviewController.updateReviewController);
reviewRouter.delete("/:id", reviewController.deleteReviewController);

export default reviewRouter;