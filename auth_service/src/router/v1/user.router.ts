
import { authMid } from "../../middlewares/auth.middleware.js";
import { validateRequestBody } from "../../validators/index.js"; 
import { Router } from "express";
import * as userController from "../../controllers/user.controller.js";
import { createUserSchema, loginUserSchema } from "../../dtos/auth.dto.js";

const userRouter: Router = Router();

//userRouter.get("/profile", authMid, userController.getUserById);
userRouter.post("/signup", validateRequestBody(createUserSchema), userController.createUserHandler);
userRouter.post("/singin", validateRequestBody(loginUserSchema), userController.loginUserHandler);

export default userRouter;