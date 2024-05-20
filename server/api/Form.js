const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const User = require('../models/User');
const {v4: uuidv4} = require('uuid');

router.post('/create', async (req, res) => {
    console.log("Form create");
    const {email, title, questions} = req.body;
    const uniqueLink = uuidv4();

    if (!email || !title || !questions) {
        return res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
        return res.json({
            status: "FAILED",
            message: "Questions must be a non-empty array of objects"
        });
    }

    for (const question of questions) {
        if (!question.question || !question.type) {
            return res.json({
                status: "FAILED",
                message: "Each question object must have 'question' and 'type' properties"
            });
        }
        if (typeof question.question !== 'string' || question.question.trim() === '') {
            return res.json({
                status: "FAILED",
                message: "Question must be a non-empty string"
            });
        }
        if (typeof question.type !== 'string' || !['radio', 'checkbox', 'text', 'textarea'].includes(question.type)) {
            return res.json({
                status: "FAILED",
                message: "Question type must be one of 'radio', 'checkbox', 'text', or 'textarea'"
            });
        }
    }

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                status: "FAILED",
                message: "User with the provided email doesn't exist"
            })
        }
        const newForm = new Form({
            formId: uuidv4(),
            title,
            questions,
            createdBy: email,
            uniqueLink: uuidv4()
        });

        const savedForm = await newForm.save();
        res.json({
            status: "SUCESS",
            message: "The form was successfully created", data: savedForm
        })
    } catch (err) {
        res.json({
            status: "FAILED",
            message: "An error occurred while creating the form! " + err
        })
    }
})

router.get('/forms/:email?', async (req, res) => {
    const {email} = req.params;

    if (!email || email.trim() === '') {
        return res.json({
            status: "FAILED",
            message: "Email parameter is required"
        });
    }

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                status: "FAILED",
                message: "User with the provided email doesn't exist"
            });
        }

        const forms = await Form.find({createdBy: email});
        if (forms.length === 0) {
            return res.json({
                status: "FAILED",
                message: "No forms found for the provided email"
            });
        }

        if (forms.length === 0) {
            return res.json({
                status: "FAILED",
                message: "No forms found for the provided email"
            });
        }

        res.json({
            status: "SUCCESS",
            message: "Forms retrieved successfully",
            data: forms
        });
    } catch (err) {
        res.json({
            status: "FAILED",
            message: "An error occurred while retrieving the forms! " + err
        });
    }
});

router.put('/update/:id', async (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    if (!title || title.trim() === '') {
        return res.json({
            status: "FAILED",
            message: "Title parameter is required"
        })
    }

    try {
        const form = await Form.findOne({formId: id});
        if (!form) {
            return res.json({
                status: "FAILED",
                message: "Form not found"
            });
        }

        if (title === form.title) {
            return res.json({
                status: "FAILED",
                message: "You should enter a new title!"
            })
        }

        form.title = title;
        const updatedForm = await form.save();

        res.json({
            status: "SUCCESS",
            message: "Form title updated successfully!",
            data: updatedForm
        });
    } catch (err) {
        res.json({
            status: "FAILED",
            message: "An error occurred while updating the form title: " + err
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;

    if (!id || id.trim() === '') {
        return res.json({
            status: "FAILED",
            message: "Id parameter is required"
        })
    }

    try {
        const result = await Form.deleteOne({formId: id});

        if (result.deletedCount === 0) {
            return res.json({
                status: "FAILED",
                message: "Form not found"
            });
        }

        res.json({
            status: "SUCCESS",
            message: "Form deleted successfully!",
            data: result
        });
    } catch (err) {
        res.json({
            status: "FAILED",
            message: "An error occurred while deleting the form: " + err
        });
    }
});

router.get('/form/:id', async (req, res) => {
    const {id} = req.params;

    if (!id || id.trim() === '') {
        return res.json({
            status: "FAILED",
            message: "ID parameter is required"
        });
    }

    try {
        const form = await Form.findOne({formId: id});
        if (!form) {
            return res.json({
                status: "FAILED",
                message: "Form not found"
            });
        }

        res.json({
            status: "SUCCESS",
            message: "Form details retrieved successfully",
            data: form
        });
    } catch (err) {
        res.json({
            status: "FAILED",
            message: "An error occurred while retrieving the form details: " + err
        });
    }
});

module.exports = router;