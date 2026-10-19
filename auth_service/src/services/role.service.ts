import * as roleRepo from "../repositories/role.repository.js";
import { CreateRoleDTO } from "../dtos/rbac.dto.js";
import { IRole } from "../models/role.model.js";

export const createRoleService = async (data: CreateRoleDTO): Promise<IRole> => {
  const existing = await roleRepo.findRoleByNameRepo(data.name);
  if (existing) {
    throw new Error(`Role ${data.name} already exists`);
  }
  return await roleRepo.createRoleRepo(data);
};

export const getAllRolesService = async (): Promise<IRole[]> => {
  return await roleRepo.findAllRolesRepo();
};


// Bootstrap function to initialize the 3 default system roles on startup
export const initializeDefaultRolesService = async (): Promise<void> => {
  const defaultRoles = [
    { name: "admin", description: "Full system-wide control and platform governance" },
    { name: "guest", description: "Standard user for browsing, booking, and reviews" },
    { name: "host", description: "Property owner managing listings and bookings" },
  ];

  for (const roleData of defaultRoles) {
    const existing = await roleRepo.findRoleByNameRepo(roleData.name);
    if (!existing) {
      await roleRepo.createRoleRepo(roleData);
    }
  }
};