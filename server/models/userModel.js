const mongoose= require("mongoose");
const bcrypt= require("bcrypt");

const userSchema= mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_960_720.png'
    }
},
    {
        timestamps: true
    }
)

// Password Encrypt with Bcrypt before saving Data //
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    const salt= await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(this.password, salt)
    this.password= hash;
});

// Compare Saved Encrypt Password with Login Password //
userSchema.methods.compareLoginPassword= async function(enteredPass){
    return await bcrypt.compare(enteredPass, this.password)
}


const userModel= mongoose.model("User", userSchema);

module.exports= userModel;