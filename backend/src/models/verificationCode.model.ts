import VerificationCodeType from "@constants/verificationCodeType.js";
import { Schema, Document, Types, model } from "mongoose";


interface VerificationCodeDocument extends Document<Types.ObjectId> {
  userId: Types.ObjectId,
  type: VerificationCodeType,
  createdAt: Date;
  expiresAt: Date;
}
const VerificationCodeSchema = new Schema<VerificationCodeDocument>({
  userId: {
    ref: "User",
    type: Schema.Types.ObjectId,
    require: true,
    index: true
  },
  type: {
    type: String,
    require: true
  },
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
})

const VerificationCodeModel = model<VerificationCodeDocument>("VerificationCode", VerificationCodeSchema, "verification_codes")


export default VerificationCodeModel