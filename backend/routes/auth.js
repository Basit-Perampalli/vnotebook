const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "Harryisagoodb$oy"
//Route1: Create a User using: POST '/api/auth/'. Doesn't require Auth
router.post('/createUser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail({ min: 5 }),
    body('password', "Password must be of min 5 chars").isLength({ min: 5 })
], async (req, res) => {

    let success = false
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // Check whether the email is used already

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: "Email already used. Please try with some another email" });
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({              // Creating a new user using User.js schema You have to import User.js
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)

        success = true
        res.json({success, authToken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }

});


//Route2: Authenticate a User using: POST '/api/auth/'. Doesn't require Auth

router.post('/login', [
    body('email', "Enter a valid email").isEmail({ min: 5 }),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {

    let success = false
    // Check whether the email is used already
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
});

//Route3: Get Logged in user details using: POST '/api/auth/getUser'. Login require
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;


