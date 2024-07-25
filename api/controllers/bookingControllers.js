import Booking from '../models/Booking.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

// Create a new booking
export const newBooking = async (req, res) => {
  const { serviceId } = req.body;
  try {
    // Create a new booking record
    const newBooking = await Booking.create({
      serviceId,
      userId: req.params.userId
    });

    // Set up email transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',  
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    // Define email options
    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: process.env.MAIL_USERNAME,
      subject: `New booking placed for your service ${serviceId}`,
      text: `User:${req.params.userId} placed order at ${new Date(Date.now())}`
    };

    // Send email notification
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });

    // Respond with success message
    return res.status(201).json({
      status: "success",
      message: "New booking created",
      bookingDetails: newBooking
    });
  } catch (err) {
    // Handle errors
    return res.status(500).json({
      status: "failure",
      message: "Cannot create booking",
      error: err
    });
  }
}

// Retrieve bookings for a specific user
export const getBookings = async (req, res) => {
  try {
    // Find bookings for the user and populate related fields
    const allbookings = await Booking.find({
      userId: req.params.userId
    }).populate('serviceId userId');

    // Respond with retrieved bookings
    return res.status(201).json({
      status: "success",
      message: "Bookings retrieved",
      bookings: allbookings
    });
  } catch (err) {
    // Handle errors
    return res.status(500).json({
      status: "failure",
      message: "Cannot retrieve bookings",
      error: err
    });
  }
}

// Retrieve all bookings for all users
export const getAllBookings = async (req, res) => {
  try {
    // Find all bookings and populate related fields
    const allusersbookings = await Booking.find().populate('serviceId userId');

    // Respond with all bookings
    return res.status(201).json({
      status: "success",
      message: "Bookings retrieved",
      bookings: allusersbookings
    });
  } catch (err) {
    // Handle errors
    return res.status(500).json({
      status: "failure",
      message: "Cannot retrieve bookings",
      error: err
    });
  }
}

// Update booking status
export const updateBooking = async (req, res) => {
  try {
    // Update booking status
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, {
      isCompleted: req.body.isCompleted
    });

    // Find the user associated with the booking
    const user = await User.findById(updatedBooking.userId);

    // Set up email transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    // Define email options
    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: `${user.email}`,
      subject: `Bike service update from owner`,
      text: `User:${user.username} order update; order ${(req.body.isCompleted) ? "completed successfully" : "cancelled"} ${new Date(Date.now())}`
    };

    // Send email notification
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });

    // Respond with success message
    res.status(200).json({
      status: "success",
      message: "Entry updated"
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      status: "failure",
      message: "Couldn't update entry",
      error: error
    });
  }
}
