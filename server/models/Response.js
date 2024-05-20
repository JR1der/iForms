const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
    formId: {type: Scheman.Types.ObjectId, ref: 'Form', required: true},
    answers: [{type: String, required: true}],
    createdAt: {type: Date, default: Date.now},
});

const Response = mongoose.model('Response', ResponseSchema);

module.exports = Response;