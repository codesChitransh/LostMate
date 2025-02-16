import express from 'express';
import { signup,signin} from '../controllers/auth.controller.js';


const signuprouter=express.Router();

signuprouter.post("/signup",signup);
signuprouter.post("/signin",signin);
export default signuprouter;
