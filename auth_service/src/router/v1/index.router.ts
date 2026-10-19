import express, { Router } from "express";
import pingRouter1 from "./ping.router.js";
import userRouter from "./user.router.js";
import { authMid } from "../../middlewares/auth.middleware.js";
import { strictApiLimiter } from "../../middlewares/rate-limiter.middleware.js";
import roleRouter from "./role.router.js";
import permissionRouter from "./permission.router.js";


const v1Router: Router = express.Router();


v1Router.use("/ping", pingRouter1);
v1Router.use("/users", userRouter);
v1Router.use("/roles", roleRouter);
v1Router.use("/permissions", permissionRouter);

// Protected proxy routes with authMid middleware to secure upstream services



// v1Router.use("/hotels", authMid, hotelsProxy);
// v1Router.use("/bookings", authMid, bookingsProxy);
// v1Router.use("/reviews", authMid,reviewsProxy );

// v1Router.use("/hotels", strictApiLimiter, authMid, hotelsProxy);
// v1Router.use("/bookings", strictApiLimiter, authMid, bookingsProxy);
// v1Router.use("/reviews",strictApiLimiter, authMid,reviewsProxy );


export default v1Router;