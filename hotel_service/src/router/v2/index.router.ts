import express, { Router } from "express";
import pingRouter2 from "./ping.router.js";
import hotelRouter2 from "./hotel.router.js";

const v2Router: Router = express.Router();

v2Router.use("/ping", pingRouter2);

v2Router.use('/hotels', hotelRouter2);


export default v2Router;
