import express, {Router} from "express";
import pingRouter1 from "./ping.router.js";
import hotelRouter from "./hotel.router.js";
import roomGenerationRouter from "./roomGeneration.router.js";
import roomSchedulerRouter from "./roomScheduler.router.js";

const v1Router: Router = express.Router();

v1Router.use("/ping", pingRouter1);

v1Router.use('/hotels', hotelRouter);

v1Router.use('/room-generation', roomGenerationRouter);

v1Router.use('/scheduler', roomSchedulerRouter);


export default v1Router;
