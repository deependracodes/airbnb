import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors/app.error";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    throw new UnauthorizedError("Authentication header is required");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authentication header must start with Bearer");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Token is required");
  }

  const jwtSecret = process.env.JWT_SECRET || "TOKEN";

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      throw new UnauthorizedError("Invalid token: " + err.message);
    }

    const claims = decoded as {
      id?: string;
      name?: string;
      email?: string;
      roles?: string[];
    };

    console.log(claims);


    if (!claims || !claims.id || !claims.email || !claims.name) {
      throw new UnauthorizedError("Invalid token claims");
    }

    // Attach user information to request object
    req.user_id = claims.id;
    req.user_name = claims.name;
    req.user_email = claims.email;
    req.user_roles = claims.roles || [];

    next();
  });
};
