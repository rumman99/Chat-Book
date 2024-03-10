const jwt= require("jsonwebtoken");
const asyncHandler= require("express-async-handler");
const userModel = require("../models/userModel");
require('dotenv').config();

const authorize= asyncHandler(async(req, res, next)=>{

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            const token= req.headers.authorization.split(" ")[1];
            // Decode Jwt Token//
            const decode= jwt.verify(token, process.env.JWT_SECRET);
            req.user= await userModel.findById(decode._id).select("-password");

            next();
        }
        catch(err){
            res.status(401).send("Not Authorized User!!!");
        }
    }
    else{
        res.status(401).send("Not Authorized!!!");
    }
});

module.exports= authorize;
