
import { authentication } from "../../middlewares/authentication.middleware.js";
import { validateRequestBody } from "../../validators/index.js"; 
import { Router } from "express";
import * as userController from "../../controllers/user.controller.js";
import { createUserSchema, loginUserSchema } from "../../dtos/auth.dto.js";

const userRouter: Router = Router();

//userRouter.get("/profile", authentication, userController.getUserById);
userRouter.post("/signup", validateRequestBody(createUserSchema), userController.createUserHandler);
userRouter.post("/singin", validateRequestBody(loginUserSchema), userController.loginUserHandler);

export default userRouter;