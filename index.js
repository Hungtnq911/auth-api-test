const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();



//connect to DB
const connectDB = async () =>{
    try {
        await mongoose.connect(
            process.env.DB_CONNECT,{
                useNewUrlParser: true,
            });
            console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB();


//middleware
app.use(express.json());
app.use(cookieParser());


//Route middlewares

app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.listen(3000,() => console.log('server up and running'));