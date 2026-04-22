import { NOT_FOUND, OK } from '@constants/http.js';
import SessionModel from '@models/session.model.js';
import appAssert from '@utils/appAssert.js';
import catchErrors from '@utils/catchErrors.js';
import z from 'zod';

export const getSessionHandler = catchErrors(async (req, res) => {
  const sessions = await SessionModel.find(
    {
      userId: req.userId,
      expiredAt: { $gt: Date.now() },
    },
    {
      _id: 1,
      userAgent: 1,
      createdAt: 1,
    },
    {
      sort: {
        createdAt: -1,
      },
    },
  );
  return res.status(OK).json(
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session._id.equals(req.sessionId) && {
        isCurrent: true,
      }),
    })),
  );
});

export const deleteSessionHandler = catchErrors(async (req, res) => {
  const sessionId = z.string().parse(req.params.id);

  const session = await SessionModel.deleteOne({
    _id: sessionId,
    userId: req.userId,
  });
  appAssert(session, NOT_FOUND, 'session not found');

  return res.status(OK).json({ message: 'Session delete successful' });
});
