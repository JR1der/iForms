const mongoose = require('mongoose');
const {v4: uuidv4} = require("uuid");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    formId: {type: String, unique: true, default: uuidv4},
    createdBy: {type: String, ref: 'User', required: true},
    title: {type: String, required: true,},
    questions: [{
        question: {type: String, required: true},
        type: {type: String, enum: ['text', 'textarea', 'radio', 'checkbox'], required: true}
    }],
    uniqueLink: {type: String, required: true, unique: true},
})

const Form = mongoose.model('Form', FormSchema);

module.exports = Form;