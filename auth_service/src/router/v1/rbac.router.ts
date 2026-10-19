import { Router } from "express";
import * as rbacController from "../../controllers/rbac.controller.js";

const rbacRouter = Router();

// Bootstrap route to trigger initialization of default roles & permissions
rbacRouter.post("/bootstrap", rbacController.bootstrapRbacController);

// Fetch queries
rbacRouter.get("/roles", rbacController.getAllRolesController);
rbacRouter.get("/permissions", rbacController.getAllPermissionsController);

export default rbacRouter;