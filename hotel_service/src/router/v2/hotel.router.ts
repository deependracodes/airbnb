import express from 'express';
import {  getAllHotelsHandler2 } from '../../controllers/hotel.controller';

const hotelRouter2 = express.Router();


hotelRouter2.get('/', getAllHotelsHandler2);


export default hotelRouter2;