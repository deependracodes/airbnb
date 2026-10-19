import { Request, Response, NextFunction } from "express";
import * as rbacService from "../services/rbac.service.js";

export const bootstrapRbacController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await rbacService.bootstrapRbacService();
    res.status(200).json({
      success: true,
      message: "RBAC roles and permissions bootstrapped successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRolesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const roles = await rbacService.getAllRolesService();
    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPermissionsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const permissions = await rbacService.getAllPermissionsService();
    res.status(200).json({
      success: true,
      data: permissions,
    });
  } catch (error) {
    next(error);
  }
};