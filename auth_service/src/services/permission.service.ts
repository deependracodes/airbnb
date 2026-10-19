import * as permissionRepo from "../repositories/permission.repository.js";
import { CreatePermissionDTO } from "../dtos/rbac.dto.js";
import { IPermission } from "../models/permission.model.js";


export const createPermissionService = async (data: CreatePermissionDTO): Promise<IPermission> => {
  return await permissionRepo.createPermissionRepo(data);
};

export const getAllPermissionsService = async (): Promise<IPermission[]> => {
  return await permissionRepo.findAllPermissionsRepo();
};