import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../utils/errors/app.error.js";

export const authorization = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const userRoles = req.user_roles || [];

      if (userRoles.length === 0) {
        throw new ForbiddenError("Access denied: No roles assigned to user");
      }

      // Admin role has full system access by default per your bootstrap specifications
      if (userRoles.includes("admin")) {
        return next();
      }

      // Check if the user possesses at least one of the allowed roles
      const hasPermission = userRoles.some((role) => allowedRoles.includes(role));

      if (!hasPermission) {
        throw new ForbiddenError("Access denied: Insufficient permissions for this action");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};