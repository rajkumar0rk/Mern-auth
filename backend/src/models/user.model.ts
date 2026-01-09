import mongoose from 'mongoose';

// interface UserDocument{

// }

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, require: true }
})



const UserModule = mongoose.model("User", userSchema)



export default UserModule