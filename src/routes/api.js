
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const postController = require('../controllers/postController');

const parse = bodyParser.urlencoded({extended: false});

router.use('/', parse)

router.post('/post', postController.store);
router.put('/post/:id', postController.update);
router.delete('/post/:id', postController.destroy);
router.get('/post', postController.all);
router.get('/post/:id', postController.find);

module.exports = router;