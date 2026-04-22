import {
  registerHandler,
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  verifyEmailHandler,
  forgetPasswordHandler,
  resetPasswordHandler,
} from '@controllers/auth.controller.js';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/register', registerHandler);
authRoutes.post('/login', loginHandler);
authRoutes.get('/logout', logoutHandler);
authRoutes.get('/refresh', refreshTokenHandler);
authRoutes.get('/email/verify/:code', verifyEmailHandler);
authRoutes.post('/password/forget', forgetPasswordHandler);
authRoutes.post('/password/reset', resetPasswordHandler);

export default authRoutes;
