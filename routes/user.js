const express = require('express');
const router = express.Router();

const users = require('../controllers/user');
const validation = require('../middleware/validate');


router.post('/', validation.saveUser,users.createUser);

module.exports = router;
