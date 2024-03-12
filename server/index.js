const express= require("express");
const cors= require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const chatRouter = require("./routes/chatRoutes");
require('dotenv').config();
const PORT= process.env.PORT || 3333;

const app= express();
app.use(cors());
app.use(express.json());

// DB Connection //
connectDB();

// Routes //
app.use('/', userRouter);
app.use('/chat', chatRouter)

// Api Routes Error Handle //
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Listening on PORT ${PORT}`));