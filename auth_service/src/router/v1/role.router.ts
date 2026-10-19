import { Router } from "express";
import * as roleController from "../../controllers/role.controller.js";
import { createRoleSchema, createPermissionSchema } from "../../dtos/rbac.dto.js";
import { validateRequestBody } from "../../validators/index.js";

const roleRouter = Router();

// Role Routes
roleRouter.post("/roles", validateRequestBody(createRoleSchema), roleController.createRoleController);
roleRouter.get("/roles", roleController.getAllRolesController);

export default roleRouter;