const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controller/index.js');
const { verify, validateRegister } = require('../middleware/index.js');


router.get('/', ((req, res) => res.json('application is working')))
router.post('/create', validateRegister, registerUser);
router.post('/login', loginUser);
router.get('/get',verify,getUser)

module.exports = router
