import express, {Router} from "express";
import pingRouter1 from "./ping.router.js";
import reviewRouter from "./review.router.js";

const v1Router: Router = express.Router();

v1Router.use("/ping", pingRouter1);
v1Router.use("/reviews",reviewRouter);

export default v1Router;
