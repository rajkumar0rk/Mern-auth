import { NextFunction, RequestHandler } from "express";
import { registerSchema } from "schemas/auth.schemas.js";
import { createAccount } from "services/auth.service.js";
import catchErrors from "utils/catchErrors.js";

export const registerHandler = catchErrors(async (req, res) => {

  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"]
  })

  const { } = createAccount(request)

  return res.send()
})