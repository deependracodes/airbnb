import express, { Router } from "express";
import pingRouter1 from "./ping.router.js";
import userRouter from "./user.router.js";
import { authenticateToken } from "../../middlewares/auth.middleware.js";
import { bookingsProxy, hotelsProxy ,reviewsProxy} from "../../middlewares/proxy.middleware.js";
import { strictApiLimiter } from "../../middlewares/rate-limiter.middleware.js";


const v1Router: Router = express.Router();


v1Router.use("/ping", pingRouter1);
v1Router.use("/users", userRouter);

// Protected proxy routes with authenticateToken middleware to secure upstream services
v1Router.use("/hotels", authenticateToken, hotelsProxy);
v1Router.use("/bookings", authenticateToken, bookingsProxy);
v1Router.use("/reviews", authenticateToken,reviewsProxy );

// v1Router.use("/hotels", strictApiLimiter, authenticateToken, hotelsProxy);
// v1Router.use("/bookings", strictApiLimiter, authenticateToken, bookingsProxy);
// v1Router.use("/reviews",strictApiLimiter, authenticateToken,reviewsProxy );


export default v1Router;