const express = require('express');
const router = express.Router();

const reporters = require('../controllers/reporter');
// const validation = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', reporters.getAll);

router.get('/:id', reporters.getSingle);

router.post('/', isAuthenticated, reporters.createReporter);

router.put('/:id', isAuthenticated, reporters.updateReporter);

router.delete('/:id', isAuthenticated, reporters.deleteReporter);

module.exports = router;
