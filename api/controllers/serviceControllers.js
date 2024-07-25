import Service from "../models/Service.js";

// app.post('/add-service/:userId',
    export const addService=async(req,res)=>{
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
}
// app.get('/get-all-service/:userId',
export const getAllService=async(req,res)=>{
  try {
      const allservices = await Service.find();
      res.status(200).json(allservices);
    } catch (error) {
      res.status(500).json({
        status: "failure",
        message: "could not fetch data",
        error: error,
      });
    }
}

// app.get('/get-service/:userId',
   export const getService=async(req,res)=>{
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
}
// app.patch('/update-service/:id',
   export const updateService=async(req,res)=>{
    try {
        await Service.findByIdAndUpdate(req.params.id, {
          title: req.body.title,
          category: req.body.category,
          price: req.body.price,
          desc: req.body.desc,
          deliveryTime: req.body.deliveryTime,
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
}
// app.delete('/delete-service/:id',
export const deleteService=async(req,res)=>{
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
}