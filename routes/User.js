const express = require("express");
const {fetchUserbyId,updateUserById } = require("../controller/User");


const router = express.Router();

router.get('/:id', fetchUserbyId)
    .patch('/:id', updateUserById)

exports.router = router;