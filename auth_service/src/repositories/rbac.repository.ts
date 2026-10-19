import { PermissionModel, IPermission } from "../models/permission.model.js";
import { RoleModel, IRole } from "../models/role.model.js";
import { Types } from "mongoose";

export const createPermissionRepo = async (data: { name: string; description?: string; resource: string; action: string }): Promise<IPermission> => {
  return await PermissionModel.create({
    name: data.name,
    ...(data.description !== undefined && { description: data.description }),
    resource: data.resource,
    action: data.action,
  });
};

export const findPermissionByNameRepo = async (name: string): Promise<IPermission | null> => {
  return await PermissionModel.findOne({ name });
};

export const findAllPermissionsRepo = async (): Promise<IPermission[]> => {
  return await PermissionModel.find();
};



export const createRoleRepo = async (data: { name: string; description?: string; permissions?: Types.ObjectId[] }): Promise<IRole> => {
  return await RoleModel.create({
    name: data.name,
    ...(data.description !== undefined && { description: data.description }),
    ...(data.permissions !== undefined && { permissions: data.permissions }),
  });
};

export const findRoleByNameRepo = async (name: string): Promise<IRole | null> => {
  return await RoleModel.findOne({ name }).populate("permissions");
};

export const updateRolePermissionsRepo = async (roleId: string, permissionIds: Types.ObjectId[]): Promise<IRole | null> => {
  return await RoleModel.findByIdAndUpdate(
    roleId,
    { $set: { permissions: permissionIds } },
    { new: true }
  ).populate("permissions");
};

export const findAllRolesRepo = async (): Promise<IRole[]> => {
  return await RoleModel.find().populate("permissions");
};