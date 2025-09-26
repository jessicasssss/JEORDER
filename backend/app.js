const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();


const userRoute = require('./route/userRoute');
const productRoute = require('./route/productRoute');
const cartRoute = require('./route/cartRoute');
const orderRoute = require("./route/orderRoute")

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin:  ["http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: true
}))


app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/', userRoute);
app.use('/', productRoute);
app.use('/', cartRoute);
app.use('/', orderRoute);

app.listen(port, () =>{
    console.log("Connected to database")
})