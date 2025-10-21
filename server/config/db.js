import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/animetops`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connectDB;
