const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5500;

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

const managerRoute = require('./routes/manager');
const userRoute = require('./routes/user');


mongoose.connect(process.env.ATLAS_CONNECTION_STRING)
.then(() => console.log("Connected To The Database!"))
.catch(err => console.log(err));


// Use route files as middleware

app.use('/', userRoute);
app.use('/', managerRoute);


app.listen(PORT, ()=> console.log("Server connected!"));