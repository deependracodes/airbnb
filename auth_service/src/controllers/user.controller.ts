
import { Response , Request} from "express";
import * as userService from "../services/user.service.js";

export async function createUserHandler(req: Request, res: Response): Promise<void> {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to create user", details: err.message });
  }
}

export async function loginUserHandler(req: Request, res: Response): Promise<void> {
  try {
    const token = await userService.loginUser(req.body);
    res.status(200).json({ message: "User logged in successfully", data: token });
  } catch (err: any) {
    res.status(401).json({ error: "Failed to login user", details: err.message });
  }
}