import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      correlationId?: string,
      user_id : string,
      user_name : string,
      user_email : string,
      user_roles?: string[]
    }
  }
}