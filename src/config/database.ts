import mongoose from "mongoose";

// Db Connection
export const connectDb = async (URI: any) => {
  try {
    const conn = await mongoose.connect(`${URI}`);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
