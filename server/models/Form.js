const mongoose = require('mongoose');
const {v4: uuidv4} = require("uuid");
const Schema = mongoose.Schema;

const FormQuestionSchema = new Schema({
    questionId: {type: String, default: uuidv4, required: true},
    question: {type: String, required: true},
    type: {type: String, enum: ['shortAnswer', 'longAnswer', 'rating5', 'rating10'], required: true}
})

const FormSchema = new Schema({
    formId: {type: String, unique: true, default: uuidv4},
    createdBy: {type: String, ref: 'User', required: true},
    title: {type: String, required: true,},
    questions: [FormQuestionSchema],
    uniqueLink: {type: String, required: true, unique: true},
})

const Form = mongoose.model('Form', FormSchema);

module.exports = Form;