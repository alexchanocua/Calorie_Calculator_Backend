const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
// importing routes
const usersRouter = require('./routes/users');
const foodItemsRouter = require('./routes/foodItems');
// Mongoose Schema
const User = require("./Users");

// express instance
const app = express();

// middleware
app.use(cors()); // enable all cors requests
app.use(express.json()); // parse incoming json requests into object

// router middleware
app.use('/users', usersRouter);
app.use('/foodItems', foodItemsRouter);


// connecting to the DB
mongoose.connect("mongodb+srv://chanoale:dundun428@food-logger.qdvkmq5.mongodb.net/calorie-logger?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log("connected to DB"));


app.listen(3000)