const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
// const cors = require('cors');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5500;


// app.use(cors());

const managerRoute = require('./routes/manager');
const userRoute = require('./routes/user');
// const ratingRoute = require('./routes/rating');



mongoose.connect(process.env.ATLAS_CONNECTION_STRING)
.then(() => console.log("Connected To The Database!"))
.catch(err => console.log(err));


// Use route files as middleware

app.use('/', userRoute);
app.use('/', managerRoute);
// app.use('/', ratingRoute);



app.listen(PORT, ()=> console.log("Server connected!"));