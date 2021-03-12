const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

// import route
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

// main app
const app = express();

// connect to mongodb
mongoose.connect(process.env.DATABASE, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log('Connected to Auth DB'));

// middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
	
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// route middleware
app.use('/', authRoute);
app.use('/user', userRoute);

const port = process.env.PORT || 8001;

app.listen(port, () => {
	console.log(`running on port ${port}`);
});