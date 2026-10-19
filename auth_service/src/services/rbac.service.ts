import * as rbacRepo from "../repositories/rbac.repository.js";
import { SYSTEM_PERMISSIONS } from "../utils/helpers/constants.js";
import { IRole } from "../models/role.model.js";
import { IPermission } from "../models/permission.model.js";

export const bootstrapRbacService = async (): Promise<void> => {
  // 1. Ensure all system permissions exist
  const permissionMap = new Map<string, IPermission>();

  for (const permData of SYSTEM_PERMISSIONS) {
    let perm = await rbacRepo.findPermissionByNameRepo(permData.name);
    if (!perm) {
      perm = await rbacRepo.createPermissionRepo(permData);
    }
    permissionMap.set(permData.name, perm);
  }

  // 2. Define role-to-permission mappings based on your specifications
  // - Admin: Default all permissions
  // - Guest: Only GET hotels, search, create bookings, view bookings, CRUD reviews
  // - Host: View bookings, CRUD hotels, etc.
  const allPermissionIds = Array.from(permissionMap.values()).map((p) => p._id);

  const guestPermissionNames = [
    "hotels:read", // View hotel listings / search
    "bookings:create", // Create bookings
    "bookings:read", // View bookings
    "bookings:cancel", // Cancel own reservations
    "reviews:create", // Write reviews
    "reviews:read", // View reviews
    "reviews:update", // Edit reviews
    "reviews:delete", // Delete reviews
  ];

  const guestPermissionIds = guestPermissionNames
    .map((name) => permissionMap.get(name)?._id)
    .filter(Boolean);

  const hostPermissionNames = [
    "hotels:create", // Create hotels
    "hotels:read", // View hotels
    "hotels:update", // Update hotels
    "hotels:delete", // Delete hotels
    "bookings:read", // View bookings associated with properties
    "reviews:read", // Read reviews
  ];

  const hostPermissionIds = hostPermissionNames
    .map((name) => permissionMap.get(name)?._id)
    .filter(Boolean);

  const roleDefinitions = [
    {
      name: "admin",
      description: "Full system-wide control and platform governance",
      permissionIds: allPermissionIds,
    },
    {
      name: "guest",
      description: "Standard user for browsing, booking, and reviews",
      permissionIds: guestPermissionIds,
    },
    {
      name: "host",
      description: "Property owner managing listings and bookings",
      permissionIds: hostPermissionIds,
    },
  ];

  // 3. Upsert roles and bind permissions
  for (const def of roleDefinitions) {
    let role = await rbacRepo.findRoleByNameRepo(def.name);
    if (!role) {
      await rbacRepo.createRoleRepo({
        name: def.name,
        description: def.description,
        permissions: def.permissionIds as any,
      });
    } else {
      await rbacRepo.updateRolePermissionsRepo(
        role._id.toString(),
        def.permissionIds as any,
      );
    }
  }
};

export const getAllRolesService = async (): Promise<IRole[]> => {
  return await rbacRepo.findAllRolesRepo();
};

export const getAllPermissionsService = async (): Promise<IPermission[]> => {
  return await rbacRepo.findAllPermissionsRepo();
};
