const express = require("express");
const {fetchCategory} = require('../controller/Category')

const router = express.Router();

router.get('/',fetchCategory)

exports.router = router;