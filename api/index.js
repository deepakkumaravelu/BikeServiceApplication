import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";

import connectDB from './connection/conn.js';

import router from './routes/userRoutes.js';
import servicerouter from './routes/serviceRoutes.js';
import bookingrouter from './routes/bookingRoutes.js';

const port=process.env.PORT;
const app=express();

app.use(cors());
app.use(bodyParser.json());


/*
 * CRUD operations
 * adding a new service -> /add-service (post)
 * view existing ones -> /get-services (get)
 * edit existing entries -> /update-service (patch)
 * deleting entries -> /delete-service (delete)
 */


app.use('/service',servicerouter);
app.use('/booking',bookingrouter);
app.use('/user',router);

connectDB();
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});