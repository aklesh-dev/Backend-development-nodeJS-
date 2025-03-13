import mongoose from "mongoose";


export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODBURL);
    console.log("MongoDB connnected.")
  } catch (error) {
    console.error("Error connecting DB:", error.message);
    process.exit(1);
  }
};