const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect to DB
mongoose.connect(
    'mongodb+srv://hungtoxic:12345@cluster0.bapfz0t.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true},
    () => console.log('connected to DB')
);

//import routes
const authRoute = require('./routes/auth');


//Route middlewares
app.use('/api/user',authRoute);

app.listen(3000,() => console.log('server up and running'));
