const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

// import route
const authRoute = require('./routes/auth');

// main app
const app = express();

// connect to mongodb
mongoose.connect(process.env.DATABASE, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log('Connected to Auth DB'));

// middleware
app.use(bodyParser.json());

// route middleware
app.use('/', authRoute);

const port = process.env.PORT || 8001;

app.listen(port, () => {
	console.log(`running on port ${port}`);
});