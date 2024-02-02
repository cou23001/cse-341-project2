const express = require('express');
const router = express.Router();

const authors = require('../controllers/author');
const validation = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', authors.getAll);

router.get('/:id', authors.getSingle);

router.post('/', isAuthenticated, validation.saveAuthor, authors.createAuthor);

router.put('/:id', isAuthenticated, validation.saveAuthor, authors.updateAuthor);

router.delete('/:id', isAuthenticated, authors.deleteAuthor);

module.exports = router;
