import { APP_ORIGIN } from "@constants/env.js";
import { CONFLICT } from "@constants/http.js";
import VerificationCodeType from "@constants/verificationCodeType.js";
import UserModule from "@models/user.model.js";
import VerificationCodeModel from "@models/verificationCode.model.js";
import appAssert from "utils/appAssert.js";
import { oneYearFromNow } from "utils/date.js";

interface CreateAccountParams {
  email: string;
  password: string;
  userAgent?: string;
}

export const createAccount = async (data: CreateAccountParams) => {
  const exitingUser = await UserModule.exists({
    email: data.email
  })

  appAssert(!exitingUser, CONFLICT, "Email already Exist!!!")

  const user = await UserModule.create({
    email: data.email,
    password: data.password
  });
  const userId = user._id;
  const verificationCode = await VerificationCodeModel.create({
    userId: userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow()
  })

  const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`
  // send verification email

  // ignore email errors for now

  return { user: user.omitPassword(), url }
}