import { RoleModel, IRole } from "../models/role.model.js";
import { CreateRoleDTO } from "../dtos/rbac.dto.js";

export const createRoleRepo = async (data: CreateRoleDTO): Promise<IRole> => {
  return await RoleModel.create(data);
};

export const findRoleByNameRepo = async (name: string): Promise<IRole | null> => {
  return await RoleModel.findOne({ name });
};

export const findAllRolesRepo = async (): Promise<IRole[]> => {
  return await RoleModel.find().populate("permissions");
};

export const findRoleByIdRepo = async (id: string): Promise<IRole | null> => {
  return await RoleModel.findById(id).populate("permissions");
};