import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      correlationId?: string;
      user_id? : string,
      user_roles?: string[]
    }
  }
}