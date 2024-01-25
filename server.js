const express = require('express');
const connectDb= require('./dbCon')
const cors = require('cors');
const authRoutes = require('./Routes/userRoute');
const todoRoutes = require('./Routes/toDoRoute');
const bodyParser = require('body-parser');
const ipAddress = '192.168.1.17'; // replace with your desired IP address

const app = express();
app.use(cors())
connectDb();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
// app.js
app.use('/todos', todoRoutes);


  app.listen(3000,ipAddress,()=>{
    console.log("Server listening on port 3000")
})

