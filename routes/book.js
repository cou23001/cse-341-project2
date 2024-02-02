const express = require('express');
const router = express.Router();

const books = require('../controllers/book');
const validation = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', books.getAll);

router.get('/:id', books.getSingle);

router.post('/', isAuthenticated, validation.saveBook, books.createBook);

router.put('/:id', isAuthenticated, validation.saveBook, books.updateBook);

router.delete('/:id', isAuthenticated, books.deleteBook);

module.exports = router;
