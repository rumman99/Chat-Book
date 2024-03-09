const jwt= require('jsonwebtoken');
require('dotenv').config();

const usersToken=(_id)=>{
    return jwt.sign({_id}, process.env.JWT_SECRET,{expiresIn: "1d"})
}

module.exports= usersToken;