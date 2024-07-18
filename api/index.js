import express from 'express';
import connectDB from './connection/conn.js';
const port=process.env.PORT;
const api=express();

connectDB();
api.listen(port,()=>{
    console.log(`listening to port ${port}`);
});