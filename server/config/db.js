const mongoose= require('mongoose');
require('dotenv').config();

const connectDB= async()=>{
    try{
        const connection= await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-rumman0.pqu8dwy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster-Rumman0`);
        console.log(`DatabaseConnected: ${connection.connection.host}`)
    }
    catch(err){
        console.log(err);
        process.exit();
    }
}

module.exports= connectDB;