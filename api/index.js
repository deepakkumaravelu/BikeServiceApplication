import express from 'express';

const port=process.env.PORT;
const api=express();


api.listen(port,()=>{
    console.log(`listening to port ${port}`);
});