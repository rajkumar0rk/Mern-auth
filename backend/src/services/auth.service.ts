import { APP_ORIGIN, JWT_REFRESH_SECRET } from '@constants/env.js';
import { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, TOO_MANY_REQUESTS, UNAUTHORIZED } from '@constants/http.js';
import VerificationCodeType from '@constants/verificationCodeType.js';
import SessionModel from '@models/session.model.js';
import UserModule from '@models/user.model.js';
import VerificationCodeModel from '@models/verificationCode.model.js';
import { resetPasswordSchema } from '@schemas/auth.schemas.js';
import appAssert from '@utils/appAssert.js';
import { hashValue } from '@utils/bcrypt.js';
import { fiveMinutesAgo, ONE_DAY_MS, oneHourFromNow, oneYearFromNow, thirtyDaysFromNow } from '@utils/date.js';
import { accessTokenSignOptions, RefreshTokenPayload, refreshTokenSignOptions, signToken, verifyToken } from '@utils/jwt.js';
import { Infer } from 'zod';

interface CreateAccountParams {
  email: string;
  password: string;
  userAgent?: string;
}

export const createAccount = async (data: CreateAccountParams) => {
  const exitingUser = await UserModule.exists({
    email: data.email,
  });

  appAssert(!exitingUser, CONFLICT, 'Email already Exist!!!');

  const user = await UserModule.create({
    email: data.email,
    password: data.password,
  });
  const userId = user._id;
  const verificationCode = await VerificationCodeModel.create({
    userId: userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`;
  // send verification email

  // ignore email errors for now

  const session = await SessionModel.create({
    userId: userId,
    userAgent: data.userAgent,
  });
  const sessionId = session._id;

  const accessToken = signToken({ userId, sessionId });

  const refreshToken = signToken({ sessionId }, refreshTokenSignOptions);

  console.log('first', accessToken, refreshToken);
  return { user: user.omitPassword(), url, accessToken, refreshToken };
};

interface LoginParams {
  email: string;
  password: string;
  userAgent?: string;
}
export const loginUser = async ({ email, password, userAgent }: LoginParams) => {
  const user = await UserModule.findOne({ email });
  appAssert(user, UNAUTHORIZED, 'Invalid Email or Password');

  const isValid = await user.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, 'Invalid Email or Password');

  const userId = user._id;
  const session = await SessionModel.create({ userId, userAgent });

  const sessionId = session._id;
  const accessToken = signToken({ userId, sessionId });
  const refreshToken = signToken({ sessionId }, refreshTokenSignOptions);

  return { accessToken, refreshToken };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken || '', { secret: JWT_REFRESH_SECRET });
  appAssert(payload, UNAUTHORIZED, 'Invalid Token');
  const session = await SessionModel.findById(payload.sessionId);
  const now = Date.now();
  appAssert(session && session.expiredAt.getTime() > now, UNAUTHORIZED, 'Session expired');
  const sessionNeedRefresh = session.expiredAt.getTime() - now <= ONE_DAY_MS;
  if (sessionNeedRefresh) {
    session.expiredAt = thirtyDaysFromNow();
    await session.save();
  }
  const accessToken = signToken({ sessionId: session._id, userId: session.userId });
  const newRefreshToken = sessionNeedRefresh && signToken({ sessionId: session._id }, refreshTokenSignOptions);
  return { accessToken, newRefreshToken };
};

export const emailVerification = async (verificationCode: string) => {
  const validCode = await VerificationCodeModel.findOne({
    _id: verificationCode,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() },
  });
  appAssert(validCode, NOT_FOUND, 'Invalid or Expired Verification Code');

  const updatedUser = await UserModule.findByIdAndUpdate(validCode.userId, { verified: true }, { new: true });
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, 'Failed to Verify Email');

  await validCode.deleteOne();
  return {
    user: updatedUser.omitPassword(),
  };
};

export const sendResetPasswordLink = async (email: string) => {
  const user = await UserModule.findOne({ email: email });
  appAssert(user, NOT_FOUND, 'Email not found');

  // check for max password reset requests (2 emails in 5min)
  const fiveMin = fiveMinutesAgo();
  const count = await VerificationCodeModel.countDocuments({
    userId: user._id,
    type: VerificationCodeType.PasswordReset,
    createdAt: { $gt: fiveMin },
  });
  appAssert(count <= 1, TOO_MANY_REQUESTS, 'Too may Request');

  const expiresAt = oneHourFromNow();
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.PasswordReset,
    expiresAt,
  });
  appAssert(verificationCode, INTERNAL_SERVER_ERROR, 'Unable to reset Password');
  const url = `https://${APP_ORIGIN}/api/vi/auth/password/reset?code=${verificationCode._id}&exp=${expiresAt}`;

  // send mail

  return { url };
};

type ResetPassword = Infer<typeof resetPasswordSchema>;
export const resetPasswordWithCode = async ({ password, verificationCode }: ResetPassword) => {
  const validCode = await VerificationCodeModel.findOne({
    _id: verificationCode,
    type: VerificationCodeType.PasswordReset,
    expiresAt: { $gt: new Date() },
  });
  appAssert(validCode, NOT_FOUND, 'Unable to Reset a Password');

  const hashedPassword = await hashValue(password);
  const user = await UserModule.findByIdAndUpdate(validCode.userId, {
    password: hashedPassword,
  });

  appAssert(user, NOT_FOUND, 'Unable to Reset a Password');

  await validCode.deleteOne();

  await SessionModel.deleteMany({
    userId: validCode.userId,
  });

  return { user: user.omitPassword() };
};
