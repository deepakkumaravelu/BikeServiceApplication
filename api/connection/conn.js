import mongoose from "mongoose";
import { dbname } from "../utils/constant.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGOAPI}/${dbname}`);
    console.log("Database connected");
  } catch (error) {
    console.log(`Mongo connection failed `, error);
  }
};
export default connectDB;
