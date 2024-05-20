const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: {type: String, unique: true, default: uuidv4},
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;