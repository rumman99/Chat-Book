const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    name:{
        true: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: 'https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_960_720.png'
    }
},
    {
        timestamps: true
    }
)

const userModel= mongoose.model("User", userSchema);

module.exports= userModel;