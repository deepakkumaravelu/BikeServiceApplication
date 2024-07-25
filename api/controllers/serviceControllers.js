import Service from "../models/Service.js";

// Add a new service
export const addService = async (req, res) => {
  try {
    // Create a new service record
    await Service.create({
      title: req.body.title,
      desc: req.body.desc,
      category: req.body.category,
      price: req.body.price,
      deliveryTime: req.body.deliveryTime,
      userId: req.params.userId,
    });
    // Respond with success message
    res.status(201).json({
      status: "success",
      message: "Entry successfully added",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      status: "failure",
      message: "Entry not created",
      error: error,
    });
  }
};

// Get all services
export const getAllService = async (req, res) => {
  try {
    // Retrieve all service records
    const allservices = await Service.find();
    // Respond with all services
    res.status(200).json(allservices);
  } catch (error) {
    // Handle errors
    res.status(500).json({
      status: "failure",
      message: "Could not fetch data",
      error: error,
    });
  }
};

// Get services for a specific user
export const getService = async (req, res) => {
  try {
    // Retrieve services for the specified user
    const services = await Service.find({
      userId: req.params.userId,
    });
    // Respond with the user's services
    res.status(200).json(services);
  } catch (error) {
    // Handle errors
    res.status(500).json({
      status: "failure",
      message: "Could not fetch data",
      error: error,
    });
  }
};

// Update an existing service
export const updateService = async (req, res) => {
  try {
    // Update service record by ID
    await Service.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      desc: req.body.desc,
      deliveryTime: req.body.deliveryTime,
      userId: req.body.userId,
    });
    // Respond with success message
    res.status(200).json({
      status: "success",
      message: "Entry updated",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      status: "failure",
      message: "Couldn't update entry",
      error: error,
    });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    // Delete service record by ID
    await Service.findByIdAndDelete(req.params.id);
    // Respond with success message
    res.status(200).json({
      status: "success",
      message: "Entry deleted",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      status: "failure",
      message: "Couldn't delete entry",
      error: error,
    });
  }
};
