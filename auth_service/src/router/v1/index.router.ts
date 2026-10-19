import express, { Router } from "express";
import pingRouter1 from "./ping.router.js";
import userRouter from "./user.router.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { strictApiLimiter } from "../../middlewares/rate-limiter.middleware.js";
import roleRouter from "./role.router.js";
import permissionRouter from "./permission.router.js";
import rbacRouter from "./rbac.router.js";


const v1Router: Router = express.Router();


v1Router.use("/ping", pingRouter1);
v1Router.use("/users", userRouter);
v1Router.use("/roles", roleRouter);
v1Router.use("/permissions", permissionRouter);
v1Router.use("/rbac",rbacRouter)

// Protected proxy routes with authentication middleware to secure upstream services



// v1Router.use("/hotels", authentication, hotelsProxy);
// v1Router.use("/bookings", authentication, bookingsProxy);
// v1Router.use("/reviews", authentication,reviewsProxy );

// v1Router.use("/hotels", strictApiLimiter, authentication, hotelsProxy);
// v1Router.use("/bookings", strictApiLimiter, authentication, bookingsProxy);
// v1Router.use("/reviews",strictApiLimiter, authentication,reviewsProxy );


export default v1Router;