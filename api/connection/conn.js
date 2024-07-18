import mongoose from "mongoose";
import { dbname } from "../utils/constant.js";

const connectDB = async()=>{
    try{
        const connection=await mongoose.connect(`${process.env.MONGOAPI}/${dbname}`);
        console.log('Database connected :',connection.connection.host);
    }catch(error){
        console.log(`Mongo connection failed `, error);
        process.exit(1);
    }
}
export default connectDB;