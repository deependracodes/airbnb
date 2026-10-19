import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional(), // Array of Permission IDs or names
});

export const createPermissionSchema = z.object({
  name: z.string().min(1, "Permission name is required"),
  description: z.string().optional(),
  resource: z.string().min(1, "Resource is required"),
  action: z.string().min(1, "Action is required"),
});

export const assignRoleSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  roleIds: z.array(z.string()).min(1, "At least one role ID is required"),
});

export type CreateRoleDTO = z.infer<typeof createRoleSchema>;
export type CreatePermissionDTO = z.infer<typeof createPermissionSchema>;
export type AssignRoleDTO = z.infer<typeof assignRoleSchema>;