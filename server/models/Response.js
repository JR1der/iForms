const mongoose = require('mongoose');
const {v4: uuidv4} = require("uuid");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    questionId: {type: String, required: true},
    response: {type: String, required: true},
    type: {type: String, required: true}
})

const ResponseSchema = new Schema({
    formId: {type: String, required: true},
    responses: [AnswerSchema],
    createdAt: {type: Date, default: Date.now},
});

const Response = mongoose.model('Response', ResponseSchema);

module.exports = Response;