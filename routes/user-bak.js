const express = require('express');
const router = express.Router();

const users = require('../controllers/user');
const validation = require('../middleware/validate');

router.get('/', users.getAll);

router.get('/:id', users.getSingle);

router.post('/', validation.saveUser, users.createUser);

router.put('/:id', validation.saveUser, users.updateUser);

router.delete('/:id', users.deleteUser);

module.exports = router;
