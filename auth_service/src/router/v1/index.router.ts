import express, { Router } from "express";
import pingRouter1 from "./ping.router.js";
import userRouter from "./user.router.js";


const v1Router: Router = express.Router();


v1Router.use("/ping", pingRouter1);
v1Router.use("/users", userRouter);

export default v1Router;