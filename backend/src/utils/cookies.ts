import type { CookieOptions, Response } from 'express';
import { fiftyMinutesFromNow, thirtyDaysFromNow } from './date.js';

export const REFRESH_PATH = 'api/v1/auth/refresh';
interface Params {
  res: Response;
  accessToken: string;
  refreshToken: string;
}

const defaults: CookieOptions = {
  sameSite: 'lax',
  httpOnly: true,
  secure: false,
};

export const getAccessTokenCookieOption = (): CookieOptions => {
  return {
    ...defaults,
    expires: fiftyMinutesFromNow(),
    path: '/',
  };
};
export const getRefreshTokenCookieOption = (): CookieOptions => {
  return {
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: REFRESH_PATH,
  };
};
export const setCookies = ({ res, accessToken, refreshToken }: Params) =>
  res.cookie('accessToken', accessToken, getAccessTokenCookieOption()).cookie('refreshToken', refreshToken, getRefreshTokenCookieOption());

export const clearCookies = (res: Response) =>
  res.clearCookie('accessToken', defaults).clearCookie('refreshToken', { ...defaults, path: REFRESH_PATH });
