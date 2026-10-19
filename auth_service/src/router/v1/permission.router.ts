import { Router } from "express";
import * as permissionController from "../../controllers/permission.controller.js";
import {  createPermissionSchema } from "../../dtos/rbac.dto.js";
import { validateRequestBody } from "../../validators/index.js";

const permissionRouter = Router();


// Permission Routes
permissionRouter.post("/permissions", validateRequestBody(createPermissionSchema), permissionController.createPermissionController);
permissionRouter.get("/permissions", permissionController.getAllPermissionsController);

export default permissionRouter;