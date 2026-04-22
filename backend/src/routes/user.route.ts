import { getUserHandler } from '@controllers/user.controller.js';
import { authenticate } from '@middlewares/authenticate.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', getUserHandler);

export default userRouter;
