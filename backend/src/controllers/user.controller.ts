import { NOT_FOUND, OK } from '@constants/http.js';
import UserModule from '@models/user.model.js';
import appAssert from '@utils/appAssert.js';
import catchErrors from '@utils/catchErrors.js';

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModule.findById(req.userId);
  appAssert(user, NOT_FOUND, 'User Not Found');
  return res.status(OK).json({ user: user.omitPassword() });
});
