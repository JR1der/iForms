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

        const newResponse = new Response({
            formId: formId,
            responses: responses,
            createdAt: Date.now()
        })
        console.log(newResponse)
        console.log(formId)
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

module.exports = router;