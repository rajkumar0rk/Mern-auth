import { Schema, Document, model, Types } from 'mongoose';
import { compareValue, hashValue } from 'utils/bcrypt.js';

interface UserDocument extends Document<Types.ObjectId> {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (val: string) => Promise<boolean>;
  omitPassword(): Pick<UserDocument, "_id" | "email" | "verified" | "createdAt" | "updatedAt" | "__v">;
  __v?: number;
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  verified: { type: Boolean, require: true, default: false }
}, {
  timestamps: true
})

userSchema.pre('save', async function () {
  if (this.isModified("password"))
    this.password = await hashValue(this.password!)
})

userSchema.methods.comparePassword = async function (val: string) {
  await compareValue(val, this.password)
}

userSchema.methods.omitPassword = function () {
  const user = this.toObject()
  delete user.password
  return user
}


const UserModule = model<UserDocument>("User", userSchema)



export default UserModule