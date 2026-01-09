import mongoose from 'mongoose';

import { MONGO_URL } from '@constants/env.js';


const connectToDatabase = async () => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(MONGO_URL);
    console.log("Successfully connected to DB")
  } catch (error) {
    console.error("Could not connected to DB", error);
    process.exit(1)
  }
}

export default connectToDatabase