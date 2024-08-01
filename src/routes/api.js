
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const feedController = require('../controllers/feedController');

const parse = bodyParser.urlencoded({extended: false});

router.use('/', parse)

router.get('/publish/:id', feedController.publish);

module.exports = router;