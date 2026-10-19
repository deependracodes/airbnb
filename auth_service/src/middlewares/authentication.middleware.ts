import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors/app.error";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    throw new UnauthorizedError("Authorization header is required");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization header must start with Bearer" );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Token is required");
    
  }

  const jwtSecret = process.env.JWT_SECRET || "TOKEN";

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      throw new UnauthorizedError( "Invalid token: " + err.message );
    }

    const claims = decoded as { id?: string; email?: string; roles?: string[] };

    if (!claims || !claims.id || !claims.email) {
      throw new UnauthorizedError("Invalid token claims");
    }

    // Attach user information to request object
    req.user_id = claims.id;
    req.user_roles = claims.roles || []

    next();
  });
};