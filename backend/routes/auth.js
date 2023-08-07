const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using: POST '/api/auth/'. Doesn't require Auth
router.post('/', [
    body('name',"Enter a valid name").isLength({ min: 3 }),
    body('email',"Enter a valid email").isEmail({ min: 5 }),
    body('password',"Password must be of min 5 chars").isLength({ min: 5 })
], (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err)
    res.json({error: "Email already used. Please try with some another email"})})

});

module.exports = router;
