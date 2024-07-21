import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from './connection/conn.js';
import User from './models/User.js';
import Service from './models/Service.js';

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