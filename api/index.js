import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";

import connectDB from './connection/conn.js';
import router from './routes/userRoutes.js';
import servicerouter from './routes/serviceRoutes.js';
import bookingrouter from './routes/bookingRoutes.js';

const port = process.env.PORT;  
const app = express();  

app.use(cors());  
app.use(bodyParser.json());  // Parse incoming JSON requests

// Set up route handling
app.use('/service', servicerouter);  // Route for service-related requests
app.use('/booking', bookingrouter);  // Route for booking-related requests
app.use('/user', router);  // Route for user-related requests

connectDB();  // Connect to the database

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
