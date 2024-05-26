const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const Response = require('../models/Response');
const getSentiment = require('../utils/getSentiment');
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
        const analyzedResponses = responses.map(response => {
            const question = form.questions.find(q => q.questionId === response.questionId);
            if (question && (question.type === 'shortAnswerML' || question.type === 'longAnswerML')) {
                const sentiment = getSentiment(response.response);
                return {...response, sentiment};
            }
            return response;
        });
        const newResponse = new Response({
            responseId: uuidv4(),
            formId: formId,
            responses: analyzedResponses,
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
    const { formId } = req.params;

    if (!formId || formId.trim() === '') {
        return res.json({
            status: "FAILED",
            message: "Form Id parameter is required"
        })
    }

    try {
        const form = await Form.findOne({ formId: formId });

        if (!form) {
            return res.json({
                status: "FAILED",
                message: "Form not found!"
            })
        }

        const responses = await Response.find({ formId: formId });

        if (!responses.length) {
            return res.json({
                status: "FAILED",
                message: "There are no responses to this form"
            })
        }

        let groupedResponses = {};
        form.questions.forEach(question => {
            groupedResponses[question.questionId] = {
                question: question.question,
                type: question.type,
                responses: [],
                average: null,
                sentimentStatistics: {} // Initialize sentiment statistics
            };
        });

        responses.forEach(response => {
            response.responses.forEach(answer => {
                if (groupedResponses[answer.questionId]) {
                    if (groupedResponses[answer.questionId].type === 'shortAnswerML' || groupedResponses[answer.questionId].type === 'longAnswerML') {
                        // Analyze sentiment for ML answers
                        const sentiment = getSentiment(answer.response);
                        groupedResponses[answer.questionId].responses.push({
                            value: answer.response,
                            sentiment: sentiment // Include sentiment analysis
                        });
                        // Update sentiment statistics
                        const sentimentLabel = sentiment.label;
                        groupedResponses[answer.questionId].sentimentStatistics[sentimentLabel] = (groupedResponses[answer.questionId].sentimentStatistics[sentimentLabel] || 0) + 1;
                    } else {
                        // For other types of questions, just push the response value
                        groupedResponses[answer.questionId].responses.push(answer.response);
                    }
                }
            });
        });

        // Calculate averages for rating questions
        Object.keys(groupedResponses).forEach(questionId => {
            const questionData = groupedResponses[questionId];
            if (questionData.type === 'rating5' || questionData.type === 'rating10') {
                const numericResponses = questionData.responses.map(Number);
                const sum = numericResponses.reduce((acc, val) => acc + val, 0);
                const average = (sum / numericResponses.length).toFixed(2);
                questionData.average = average;
            }
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

router.get('/getSentimentStatistics/:formId', async (req, res) => {
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

        let sentimentStatistics = {};
        form.questions.forEach(question => {
            if (question.type === 'shortAnswerML' || question.type === 'longAnswerML') {
                sentimentStatistics[question.questionId] = {
                    question: question.question,
                    type: question.type,
                    sentimentCounts: {
                        'very negative': 0,
                        'negative': 0,
                        'neutral': 0,
                        'positive': 0,
                        'very positive': 0
                    }
                };
            }
        });

        responses.forEach(response => {
            response.responses.forEach(answer => {
                if (sentimentStatistics[answer.questionId] && answer.sentiment) {
                    sentimentStatistics[answer.questionId].sentimentCounts[answer.sentiment.label]++;
                }
            });
        });

        res.json({
            status: "SUCCESS",
            message: "Sentiment statistics calculated successfully",
            data: sentimentStatistics
        });
    } catch (err) {
        res.json({
            status: "FAILED",
            message: "An error occurred while gathering the sentiment statistics: " + err
        });
    }
})

module.exports = router;