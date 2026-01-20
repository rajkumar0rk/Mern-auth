import Audience from '@constants/audience.js';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '@constants/env.js';
import { SessionDocument } from '@models/session.model.js';
import { UserDocument } from '@models/user.model.js';
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';

interface AccessTokenPayload {
  userId: UserDocument['_id'];
  sessionId: SessionDocument['_id'];
}
export interface RefreshTokenPayload {
  sessionId: SessionDocument['_id'];
}

type SignInOptionsAndSecret = SignOptions & {
  secret: string;
};
export const signDefaults: SignOptions = {
  audience: [Audience.User],
};
const verifyDefaults: VerifyOptions = {
  audience: [Audience.User],
};
export const accessTokenSignOptions: SignInOptionsAndSecret = {
  expiresIn: '15m',
  secret: JWT_SECRET,
};
export const refreshTokenSignOptions: SignInOptionsAndSecret = {
  expiresIn: '30d',
  secret: JWT_REFRESH_SECRET,
};

export const signToken = (payload: AccessTokenPayload | RefreshTokenPayload, options?: SignInOptionsAndSecret) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...signDefaults,
    ...signOpts,
  });
};

interface VerifyOptionAndSecret extends VerifyOptions {
  secret?: string;
}

export const verifyToken = <TPayload extends object = AccessTokenPayload>(token: string, options?: VerifyOptionAndSecret) => {
  const { secret = JWT_SECRET, ...verifyOpts } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...verifyDefaults,
      ...verifyOpts,
    }) as TPayload;
    return { payload };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
