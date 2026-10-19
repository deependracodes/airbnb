import { Request, Response, NextFunction } from "express";
import * as roleService from "../services/role.service.js";

export const createRoleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const role = await roleService.createRoleService(req.body);
    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRolesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const roles = await roleService.getAllRolesService();
    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    next(error);
  }
};
