import Booking from '../models/Booking.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

// app.post('/new-booking/:userId', 
    
    export const newBooking=async (req, res) => {

    const {serviceId} = req.body;
    try {
      const newBooking = await Booking.create({
        serviceId,
        userId:req.params.userId
      });
      let transporter = nodemailer.createTransport({
        service: 'gmail',  
        auth: {
          // type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          // clientId: process.env.OAUTH_CLIENTID,
          // clientSecret: process.env.OAUTH_CLIENT_SECRET,
          // refreshToken: process.env.OAUTH_REFRESH_TOKEN
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
  }
//   app.get('/get-bookings/:userId', 
    export const getBookings=async (req, res) => {
    try {
      const allbookings = await Booking.find({
        userId:req.params.userId
      }).populate('serviceId userId');
  
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
  }

//   app.get('/get-all-bookings',
    export const getAllBookings=async (req, res) => {
    try {
      const allusersbookings = await Booking.find().populate('serviceId userId');
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
  }

//   app.patch('/update-booking/:id',
    export const updateBooking=async(req,res)=>{
    try {
        const updatedBooking=await Booking.findByIdAndUpdate(req.params.id, {
            isCompleted:req.body.isCompleted
        });
        const user= await User.findById(updatedBooking.userId);
        let transporter = nodemailer.createTransport({
            service: 'gmail',  
            auth: {
              // type: 'OAuth2',
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD,
              // clientId: process.env.OAUTH_CLIENTID,
              // clientSecret: process.env.OAUTH_CLIENT_SECRET,
              // refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
          });
          let mailOptions = {
            from:process.env.MAIL_USERNAME,
            to: `${user.email}`,
            subject: `Bike service update from owner`,
            text: `User:${user.username} order update ; order ${(req.body.isCompleted)?"completed successfully":"cancelled"} ${new Date(Date.now())}`
          };
          transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log("Error " + err);
            } else {
              console.log("Email sent successfully");
            }
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
}
