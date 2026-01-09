import { registerHandler } from '@controllers/auth.controller.js';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.get("/register", registerHandler)


export default authRoutes