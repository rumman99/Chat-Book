const asyncHandler= require('express-async-handler');
const userModel= require('../models/userModel');
const usersToken = require('../config/userToken');

const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password, photo}= req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Any Field Can't be Empty");
    }

    const alreadyUser= await userModel.findOne({email})

    if(alreadyUser){
        res.status(400);
        throw new Error("User Already Exists");
    }

    /// Creating User in DB ////
    const user= await userModel.create({name, email, password, photo});
    console.log('New User Created Successfully');

    if(user){
        res.status(200).json({_id: user._id, name: user.name, email: user.email, photo: user.photo, token: usersToken(user._id)});
    }
    else{
        res.status(400);
        throw new Error('Failed to Create New User!!!')
    }
});

module.exports= registerUser;