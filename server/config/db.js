require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected! Link: ' + process.env.MONGODB_URI);
    }).catch((err) => console.log(err));