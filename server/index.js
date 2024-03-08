const express= require("express");
const cors= require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
require('dotenv').config();
const PORT= process.env.PORT || 3333;

const app= express();
app.use(cors());
app.use(express.json());

// DB Connection //
connectDB();

// Routes //
app.use('/', userRouter);

// app.get('/api/chat', (req, res)=>{
//     res.send('chat')
// });

// app.get('/api/chat/:id', (req, res)=>{
//     res.send('id')
// });


app.listen(PORT, console.log(`Listening on PORT ${PORT}`));