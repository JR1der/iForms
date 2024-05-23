const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const Response = require('../models/Response');
const {v4: uuidv4} = require('uuid');

router.post('/submitResponse/:formId', async (req, res) => {
    const {formId} = req.params;
    const {responses} = req.body;

    try {
        const form = await Form.findOne({formId});

        if (!form) {
            return res.json({
                status: "FAILED",
                message: "Form not found"
            });
        }

        if (responses.length !== form.questions.length) {
            return res.json({
                status: "FAILED",
                message: "You haven't responded to all questions"
            });
        }

        const invalidResponses = responses.filter(response => !response || !response.response);

        if (invalidResponses.length > 0) {
            return res.json({
                status: "FAILED",
                message: "You haven't responded to all questions"
            });
        }

        const newResponse = new Response({
            responseId: uuidv4(),
            formId: formId,
            responses: responses,
            createdAt: Date.now()
        })

        const savedResponse = await newResponse.save();

        res.json({
            status: "SUCCESS",
            message: "Your response has been successfully submitted!"
        });
    } catch (err) {
        res.json({
            status: "FAILED",
            messsage: "An error occurred while submitting the response: " + err
        })
    }
})

router.get('/getResponses/:id', async (req, res) => {
    const {id} = req.params;

    if (!id || id.trim() === '') {
        return res.json({
            status: "FAILED",
            message: "Id parameter is required"
        })
    }

    const form = await Form.findOne({formId: id});

    if (!form) {
        return res.json({
            status: "FAILED",
            message: "Form not found"
        })
    }

    const responses = await Response.find({formId: id});

    res.json({
        status: "SUCCESS",
        message: "The responses were successfully loaded!",
        data: responses
    })
})

router.get('/getResponse/:id', async (req, res) => {
    const {id} = req.params;

    if (!id || id.trim() === '') {
        return res.json({
            status: "FAILED",
            message: "Id parameter is required"
        })
    }

    try {
        const response = await Response.findOne({responseId: id});

        if (!response) {
            return res.json({
                status: "FAILED",
                message: "Response not found"
            });
        }

        res.json({
            status: "SUCCESS",
            message: "The response has been provided!",
            data: response
        });
    } catch (err) {
        res.json({
            status: "FAILED",
            message: "An error occurred while fetching the response: " + err
        });
    }

})

router.get('/getQuestionResponses/:formId', async (req, res) => {
    const {formId} = req.params;

    if (!formId || formId.trim() === '') {
        return res.json({
            status: "FAILED",
            message: "Form Id parameter is required"
        })
    }

    try {
        const form = await Form.findOne({formId: formId});

        if (!form) {
            return res.json({
                status: "FAILED",
                message: "Form not found!"
            })
        }

        console.log(form)

        const responses = await Response.find({formId: formId});

        if (!responses.length) {
            return res.json({
                status: "FAILED",
                message: "There are no responses to this form"
            })
        }

        console.log(responses);

        let groupedResponses = {};
        form.questions.forEach(question => {
            groupedResponses[question.questionId] = {
                question: question.question,
                responses: []
            };
        });

        responses.forEach(response => {
            response.responses.forEach(answer => {
                if (groupedResponses[answer.questionId]) {
                    groupedResponses[answer.questionId].responses.push(answer.response);
                }
            });
        });

        let result = {};
        form.questions.forEach(question => {
            result[question.question] = groupedResponses[question.questionId];
        });

        res.json({
            status: "SUCCESS",
            message: "Question responses returned",
            data: result
        });
    } catch (err) {
        res.json({
            status: "FAILED",
            message: "An error occurred while gathering the statistics: " + err
        })
    }
})

router.get('/getNumberStatistics/:formId', async (req, res) => {
    const {formId} = req.params;

    if (!formId || formId.trim() === '') {
        return res.json({
            status: "FAILED",
            message: "Form Id parameter is required"
        });
    }

    try {
        const form = await Form.findOne({formId: formId});

        if (!form) {
            return res.json({
                status: "FAILED",
                message: "Form not found!"
            });
        }

        const responses = await Response.find({formId: formId});

        if (!responses.length) {
            return res.json({
                status: "FAILED",
                message: "There are no responses to this form"
            });
        }

        let numberStatistics = {};
        form.questions.forEach(question => {
            if (question.type === 'rating5' || question.type === 'rating10') {
                numberStatistics[question.questionId] = {
                    question: question.question,
                    type: question.type,
                    responses: []
                };
            }
        });

        responses.forEach(response => {
            response.responses.forEach(answer => {
                if (numberStatistics[answer.questionId]) {
                    numberStatistics[answer.questionId].responses.push(parseFloat(answer.response));
                }
            });
        });

        Object.keys(numberStatistics).forEach(questionId => {
            const data = numberStatistics[questionId];
            const sum = data.responses.reduce((acc, val) => acc + val, 0);
            const average = (sum / data.responses.length).toFixed(2);
            data.average = average;
            delete data.responses;
        });

        res.json({
            status: "SUCCESS",
            message: "Number statistics calculated successfully",
            data: numberStatistics
        });
    } catch (err) {
        res.json({
            status: "FAILED",
            message: "An error occurred while gathering the number statistics: " + err
        });
    }
})

module.exports = router;