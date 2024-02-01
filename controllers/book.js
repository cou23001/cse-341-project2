const db = require('../models');
const Book = db.books;
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');

// Get the API Key from .env
require('dotenv').config();
let apiKey = process.env.apiKey

exports.getAll = (req, res) => {
  //#swagger.tags=['Books']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {
    Book.find(
      {},
      {
        title: 1,
        authorId: 1,
        genre: 1,
        year: 1,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving temples.',
        });
      });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};

exports.getSingle = (req, res) => {
  //#swagger.tags=['Books']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must book a valid book id to find a book');
    } else {

    
      const _id = new ObjectId(req.params.id);
      
      Book.find({ _id: _id })
        .then((data) => {
          if (data.length === 0)
            res
            .status(404)
            .send({ message: 'Not found Book with id ' + _id });
          else
            res.send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Error retrieving Book with id=' + _id,
        });
      });
    }
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Create a Book
exports.createBook = (req, res) => {
  //#swagger.tags=['Books']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const book = new Book({
      title: req.body.title,
      authorId: req.body.authorid,
      genre: req.body.genre,
      year: req.body.year,
    });
    // Save Book in the database
    book
      .save(book)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the Book.',
        });
      });
  
  }
  else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Update a Book
exports.updateBook = (req, res) => {
  //#swagger.tags=['Books']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {
    
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must book a valid book id to update a book');
    }
    const bookId = new ObjectId(req.params.id);

    const updatedFields = {
      title: req.body.title,
      authorId: req.body.authorid,
      genre: req.body.genre,
      year: req.body.year,
    };
    
    // Update the book by finding it based on a unique identifier (e.g., book ID)
    Book.updateOne({ _id: bookId }, { $set: updatedFields })
      .then((result) => {
        if (result.acknowledged) {
          res.send({ message: 'Book updated successfully' });
        } else {
          res.status(404).send({ message: 'Book not found or no changes made' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating the Book.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Delete a Book
exports.deleteBook = (req, res) => {
  //#swagger.tags=['Books']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must book a valid book id to delete a book');
    }

    const bookId = new ObjectId(req.params.id);

    // Delete the book by finding it based on a unique identifier (e.g., book ID)
    Book.deleteOne({ _id: bookId })
      .then((result) => {
        if (result.deletedCount > 0) {
          res.send({ message: 'Book deleted successfully' });
        } else {
          res.status(404).send({ message: 'Book not found or no changes made' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while deleting the Book.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};