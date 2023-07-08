const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const cors = require('cors');

const PORT = process.env.PORT || 5500;

const app = express();

app.use(cookieParser());

app.use(express.json());

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