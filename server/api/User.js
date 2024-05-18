const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

router.get('/', async (req, res) => {
    try {
        console.log('get succ')
        const users = await User.find();  // Fetch all users from the database
        res.json({
            status: "SUCCESS",
            data: users
        });
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "An error occurred while fetching users",
            error: error.message
        });
    }
})

// Signup
router.post('/auth/signup', (req, res) => {
    console.log('Sign up')
    let {firstName, lastName, email, password} = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();

    if (firstName === "" || lastName === "" || email === "" || password === "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        })
    } else if (password.length < 8) {
        res.json({
            status: "FAILED",
            message: "Password must be at least 8 characters"
        })
    } else {
        //checking if user already exists
        User.findOne({email}).then((result) => {
            if (result) {
                res.json({
                    status: "FAILED",
                    message: "Error! User with the provided email already exists"
                })
            } else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "You have successfully signed up!",
                            data: result
                        })
                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while signing up!"
                        })
                    })
                }).catch((err) => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while hashing the password!"
                    })
                })
            }
        }).catch(err => {
            console.log(err)
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing users!"
            })
        });
    }
})

// Login
router.post('/auth/login', (req, res) => {
    console.log("Login")
    let {email, password} = req.body;
    if (email === "" || password === "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        })
    } else {
        User.findOne({email}).then(user => {
            if (user) {
                const hashedPassword = user.password;
                bcrypt.compare(password, hashedPassword).then(isMatch => {
                    if (isMatch) {
                        const token = jwt.sign(
                            {email: user.email, firstName: user.firstName, lastName: user.lastName},
                            SECRET_KEY,
                            {expiresIn: '1h'}
                        );
                        res.json({
                            status: "SUCCESS",
                            message: "Sign in successful",
                            accessToken: token,
                            user: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email
                            }
                        });
                    } else {
                        res.json({
                            status: "FAILED",
                            message: "Error! Invalid password entered"
                        });
                    }
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while comparing passwords!"
                    });
                });
            } else {
                res.json({
                    status: "FAILED",
                    message: "Error! Invalid credentials!"
                });
            }
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "User with the provided email does not exist!"
            });
        });
    }
})

module.exports = router;