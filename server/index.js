const express= require("express");
const cors= require("cors");
require('dotenv').config();
const PORT= process.env.PORT || 3333;

const app= express();
app.use(cors());

app.get('/', (req, res)=>{
    res.send('WORKING')
});

app.get('/api/chat', (req, res)=>{
    res.send('chat')
});

app.get('/api/chat/:id', (req, res)=>{
    res.send('id')
});


app.listen(PORT, console.log(`Listening on PORT ${PORT}`));