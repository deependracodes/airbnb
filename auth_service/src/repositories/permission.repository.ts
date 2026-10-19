import { PermissionModel, IPermission } from "../models/permission.model.js";
import { CreatePermissionDTO } from "../dtos/rbac.dto.js";

export const createPermissionRepo = async (data: CreatePermissionDTO): Promise<IPermission> => {
  return await PermissionModel.create(data);
};

export const findAllPermissionsRepo = async (): Promise<IPermission[]> => {
  return await PermissionModel.find();
};

export const findPermissionsByIdsRepo = async (ids: string[]): Promise<IPermission[]> => {
  return await PermissionModel.find({ _id: { $in: ids } });
};