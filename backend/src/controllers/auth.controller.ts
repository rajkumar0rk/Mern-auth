import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from '@constants/http.js';
import SessionModel from '@models/session.model.js';
import UserModule from '@models/user.model.js';
import VerificationCodeModel from '@models/verificationCode.model.js';
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verificationCodeSchema } from '@schemas/auth.schemas.js';
import {
  createAccount,
  emailVerification,
  loginUser,
  refreshUserAccessToken,
  resetPasswordWithCode,
  sendResetPasswordLink,
} from '@services/auth.service.js';
import appAssert from '@utils/appAssert.js';
import catchErrors from '@utils/catchErrors.js';
import { clearCookies, getAccessTokenCookieOption, getRefreshTokenCookieOption, setCookies } from '@utils/cookies.js';
import { verifyToken } from '@utils/jwt.js';

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent'],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);
  return setCookies({ res, accessToken, refreshToken }).status(CREATED).json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent'],
  });

  const { accessToken, refreshToken } = await loginUser(request);

  return setCookies({ res, accessToken, refreshToken }).status(OK).json({ message: 'Login Successful!!!' });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | '';

  const { payload } = verifyToken(accessToken || '');
  if (payload) await SessionModel.findByIdAndDelete(payload.sessionId);

  return clearCookies(res).status(OK).json({ message: 'Logged out successful' });
});

export const refreshTokenHandler = catchErrors(async (req, res) => {
  const refreshToken = (req.cookies.refreshToken as string) || '';
  appAssert(refreshToken, UNAUTHORIZED, 'Missing refresh Token');

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(refreshToken);

  if (newRefreshToken) res.cookie('refreshToken', newRefreshToken, getRefreshTokenCookieOption());

  return res.cookie('accessToken', accessToken, getAccessTokenCookieOption()).status(OK).json({ message: 'Token refreshed successful ' });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params);

  await emailVerification(verificationCode);

  res.status(OK).json({ message: 'Email verified successful' });
});

export const forgetPasswordHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  await sendResetPasswordLink(email);

  return res.status(OK).json({ message: 'Reset password link successfully send to your email' });
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  const resetPassword = resetPasswordSchema.parse(req.body);
  await resetPasswordWithCode(resetPassword);

  return res.status(OK).json({ message: 'Password reset Successful' });
});
