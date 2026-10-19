import { Request, Response, NextFunction } from "express";
import * as permissionService from "../services/permission.service";



export const createPermissionController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const permission = await permissionService.createPermissionService(req.body);
    res.status(201).json({
      success: true,
      message: "Permission created successfully",
      data: permission,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPermissionsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const permissions = await permissionService.getAllPermissionsService();
    res.status(200).json({
      success: true,
      data: permissions,
    });
  } catch (error) {
    next(error);
  }
};