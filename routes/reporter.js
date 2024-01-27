const express = require('express');
const router = express.Router();

const reporters = require('../controllers/reporter');
const validation = require('../middleware/validate');

router.get('/', reporters.getAll);

router.get('/:id', reporters.getSingle);

router.post('/', validation.saveReporter, reporters.createUser);
/*
router.put('/:id', validation.saveUser, reporters.updateUser);

router.delete('/:id', reporters.deleteUser);
*/

module.exports = router;
