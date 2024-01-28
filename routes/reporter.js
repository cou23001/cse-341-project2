const express = require('express');
const router = express.Router();

const reporters = require('../controllers/reporter');
const validation = require('../middleware/validate');

router.get('/', reporters.getAll);

router.get('/:id', reporters.getSingle);

router.post('/', validation.saveReporter, reporters.createReporter);

router.put('/:id', validation.saveReporter, reporters.updateReporter);

router.delete('/:id', reporters.deleteReporter);

module.exports = router;
