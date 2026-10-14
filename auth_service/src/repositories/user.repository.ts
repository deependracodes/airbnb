import { UserModel, IUser } from "../models/user.model.js";
import { Types } from "mongoose";

export async function createUser(username: string, email: string, passwordHash: string, roleIds: Types.ObjectId[] = []): Promise<IUser> {
  return await UserModel.create({
    username,
    email,
    passwordHash,
    roles: roleIds,
  });
}

export async function getByEmail(email: string): Promise<IUser | null> {
  return await UserModel.findOne({ email });
}

export async function getById(id: string): Promise<IUser | null> {
  if (!Types.ObjectId.isValid(id)) return null;
  return await UserModel.findById(id).select("-passwordHash").populate("roles");
}