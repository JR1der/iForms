const mongoose = require('mongoose');
const {v4: uuidv4} = require("uuid");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    question: {type: String, required: true},
    questionId: {type: String, required: true},
    response: {type: String, required: true},
    type: {type: String, required: true},
    sentiment: {
        score: {type: Number},
        label: {type: String}
    }
})

const ResponseSchema = new Schema({
    responseId: {type: String, unique: true, default: uuidv4},
    formId: {type: String, required: true},
    responses: [AnswerSchema],
    createdAt: {type: Date, default: Date.now},
});

const Response = mongoose.model('Response', ResponseSchema);

module.exports = Response;