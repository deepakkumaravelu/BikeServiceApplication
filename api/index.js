import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";

import connectDB from './connection/conn.js';
import User from './models/User.js';
import Service from './models/Service.js';
import Booking from './models/Booking.js';

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
app.post('/add-service/:userId',async(req,res)=>{
    try {
        await Service.create({
          title:req.body.title,
          desc: req.body.desc,
          category: req.body.category,
          price:req.body.price,
          deliveryTime:req.body.deliveryTime,
          userId: req.params.userId,
        });
        res.status(201).json({
          status: "success",
          message: "entry successfully added",
        });
      } catch (error) {
        res.status(500).json({
          status: "failure",
          message: "entry not created",
          error: error,
        });
      }
})
app.get('/get-service/:userId',async(req,res)=>{
    try {
        const services = await Service.find({
          userId: req.params.userId,
        });
        res.status(200).json(services);
      } catch (error) {
        res.status(500).json({
          status: "failure",
          message: "could not fetch data",
          error: error,
        });
      }
})
app.patch('/update-service/:id',async(req,res)=>{
    try {
        await Service.findByIdAndUpdate(req.params.id, {
          title: req.body.title,
          category: req.body.category,
          price: req.body.price,
          userId: req.body.userId,
        });
        res.status(200).json({
          status: "success",
          message: "entry updated",
        });
      } catch (error) {
        res.status(500).json({
          status: "failure",
          message: "couldn't update entry",
          error: error,
        });
      }
})
app.delete('/delete-service/:id',async(req,res)=>{
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({
          status: "success",
          message: "entry deleted",
        });
      } catch (error) {
        res.status(500).json({
          status: "failure",
          message: "couldn't delete entry",
          error: error,
        });
      }
})

app.post('/new-booking/:userId', async (req, res) => {

    const {serviceId} = req.body;
    try {
      const newBooking = await Booking.create({
        serviceId,
        userId:req.params.userId
      });
      let transporter = nodemailer.createTransport({
        service: 'gmail',  
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });
      let mailOptions = {
        from:process.env.MAIL_USERNAME,
        to: process.env.MAIL_USERNAME,
        subject: `New booking placed for your service ${serviceId}`,
        text: `User:${req.params.userId} placed order at ${new Date(Date.now())}`
      };
      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });
      return res.status(201).json({
        status: "success",
        message: "New booking created",
        bookingDetails: newBooking
      });
    } catch (err) {
      return res.status(500).json({
        status: "failure",
        message: "Cannot create booking",
        error: err
      });
    }
  });
  app.get('/get-bookings/:userId', async (req, res) => {
    try {
      const allbookings = await Booking.find({
        userId:req.params.userId
      });
  
      return res.status(201).json({
        status: "success",
        message: "bookings retrieved",
        bookings: allbookings
      });
    } catch (err) {
      return res.status(500).json({
        status: "failure",
        message: "Cannot retrive bookings",
        error: err
      });
    }
  });
  app.get('/get-all-bookings',async (req, res) => {
    try {
      const allusersbookings = await Booking.find().populate('serviceId');
      return res.status(201).json({
        status: "success",
        message: "bookings retrieved",
        bookings: allusersbookings
      });
    } catch (err) {
      return res.status(500).json({
        status: "failure",
        message: "Cannot retrive bookings",
        error: err
      });
    }
  });

  app.patch('/update-booking/:id',async(req,res)=>{
    try {
        await Booking.findByIdAndUpdate(req.params.id, {
          isCompleted:req.body.isCompleted
        });
        res.status(200).json({
          status: "success",
          message: "entry updated",
        });
      } catch (error) {
        res.status(500).json({
          status: "failure",
          message: "couldn't update entry",
          error: error,
        });
      }
})

app.post('/new-user',async (req,res)=>{
    try{
        const user=await User.find({email:req.body.email});
        if(user.length==0){
            try{
            const newUser = await User.create({
                email: req.body.email,
                password: req.body.password, 
                username: req.body.username,
                isSeller:req.body.isSeller
              });
              return res.status(201).json({
                status: "success",
                message: "New user created",
                userDetails: newUser
              }); }catch(err){
                return res.status(500).json({
                    status:"failure",
                    message:"cannot create user",
                    error:err
                })
            }
        }else{
            return res.status(403).json({
                status: "failure",
                message: "User already exists"
              });
        }
    }catch(err){
        return res.status(500).json({
            status: "failure",
            message: "Error finding user",
            error: err
          });
    }
})
app.post('/login', async(req,res)=>{
    try {
        const user = await User.findOne({ email: req.body.email});
        if (!user) {
          return res.status(401).json({
            status: "failure",
            message: "User does not exist",
          });
        }else{

          return res.status(200).json({
            status: "success",
            message: "User valid",
            userDetails: user,
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: "Authentication failed",
          error: error,
        });
      }
})




connectDB();
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});