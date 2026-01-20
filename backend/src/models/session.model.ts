import { Document, model, Schema, Types } from 'mongoose';
import { thirtyDaysFromNow } from 'utils/date.js';

export interface SessionDocument extends Document<Types.ObjectId> {
  userId: Types.ObjectId;
  userAgent?: string;
  createdAt: Date;
  expiredAt: Date;
}

const SessionSchema = new Schema<SessionDocument>({
  userId: {
    ref: 'User',
    type: Types.ObjectId,
    require: true,
    index: true,
  },
  userAgent: {
    type: String,
  },
  createdAt: { type: Date, require: true, default: Date.now },
  expiredAt: { type: Date, require: true, default: thirtyDaysFromNow() },
});

const SessionModel = model<SessionDocument>('Session', SessionSchema);
export default SessionModel;
