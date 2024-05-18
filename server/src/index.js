require('dotenv').config();
require('../config/db')
const cors = require('cors');

const express = require('express');
const UserRouter = require('../api/User');
const bodyParser = require('express').json;

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/user', UserRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

