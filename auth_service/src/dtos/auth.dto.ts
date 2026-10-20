import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
  role: z.enum(["admin", "host", "guest"]).optional().default("guest"),
});

export const loginUserSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type LoginUserDto = z.infer<typeof loginUserSchema>;