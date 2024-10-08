require('dotenv').config();
const express =require("express");
const mongoose=require('mongoose')
const port=process.env.PORT || 3002 ;
const url =process.env.MONGO_URL;
const app =express();

app.listen(port,()=>{
    console.log("Server started at port:",port);
    mongoose.connect(url)
    if(mongoose.connect){
        console.log("Connected to database")
    }
})