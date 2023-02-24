const express=require("express");
const path = require("path");
const app=express();




app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'/loading.html'));
    // setTimeout(() => {
    //     window.location.href="./index.html";
    // }, 5000);
})

app.listen(3000,()=>{
    console.log("sandeep patel")
})