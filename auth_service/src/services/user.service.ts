import * as userRepo from "../repositories/user.repository.js";
import { RoleModel } from "../models/role.model.js";
import { CreateUserDto, LoginUserDto } from "../dtos/auth.dto.js";
import {
  hashPassword,
  checkPasswordHash,
} from "../utils/helpers/auth.helpers.js";
import jwt from "jsonwebtoken";
import { UserRole } from "../models/user.model.js";

export async function registerUser(payload: CreateUserDto) {
  const roleName = (payload.role as UserRole) || "guest";
  const defaultRole = await RoleModel.findOne({ name: roleName });
  const roleIds = defaultRole ? [defaultRole._id] : [];

  const hashedPassword = await hashPassword(payload.password);

  const user = await userRepo.createUser(
    payload.username,
    payload.email,
    hashedPassword,
    roleName,
    roleIds,
  );

  return user;
}

export async function loginUser(payload: LoginUserDto): Promise<string> {
  const user = await userRepo.getByEmail(payload.email);
  if (!user) {
    throw new Error(`No user found with email: ${payload.email}`);
  }

  const isPasswordValid = await checkPasswordHash(
    payload.password,
    user.passwordHash,
  );
  if (!isPasswordValid) {
    throw new Error("Password does not match");
  }

  const jwtSecret = process.env.JWT_SECRET || "TOKEN";
  const roleIds = user.roles
    ? user.roles.map((r: any) => r._id?.toString() || r.toString())
    : [];

  return jwt.sign(
    {
      id: user._id.toString(),
      name: user.username,
      email: user.email,
      roles: roleIds,
    },
    jwtSecret,
    { expiresIn: "1d" },
  );
}
