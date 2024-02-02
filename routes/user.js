const express = require('express');
const router = express.Router();

const users = require('../controllers/user');

router.post('/', users.createUser);

module.exports = router;
