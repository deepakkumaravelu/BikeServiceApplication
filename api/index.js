const express=require('express');
const port=3000;
const api=express();
api.listen(port,()=>{
    console.log(`listening to port ${port}`);
});