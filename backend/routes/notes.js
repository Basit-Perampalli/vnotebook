const express = require('express')

const router = express.Router()

router.get('/', (req, res)=>{
    console.log("in notes js");
    res.json([])
})

module.exports = router