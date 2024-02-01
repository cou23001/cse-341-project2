const db = require('../models');
const Author = db.authors;
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');

// Get the API Key from .env
require('dotenv').config();
let apiKey = process.env.apiKey

exports.getAll = (req, res) => {
  //#swagger.tags=['Authors']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {
    Author.find(
      {},
      {
        firstName: 1,
        lastName: 1,
        age: 1,
        email: 1,
        city: 1,
        country: 1,
        isActive: 1,
        _id: 1,
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
  //#swagger.tags=['Authors']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must user a valid user id to find a author');
    } else {

    
      const _id = new ObjectId(req.params.id);
      
      Author.find({ _id: _id })
        .then((data) => {
          if (data.length === 0)
            res
            .status(404)
            .send({ message: 'Not found Author with id ' + _id });
          else
            res.send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Error retrieving Author with id=' + _id,
        });
      });
    }
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Create a Author
exports.createAuthor = (req, res) => {
  //#swagger.tags=['Authors']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {
    // Validate request
    if (!req.body.firstName) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      city: req.body.city,
      country: req.body.country,
      isActive: req.body.isActive,
    });
    // Save Author in the database
    author
      .save(author)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the Author.',
        });
      });
  
  }
  else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};


// Update a Author
exports.updateAuthor = (req, res) => {
  //#swagger.tags=['Authors']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {
    
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must user a valid user id to update a user');
    }
    const userId = new ObjectId(req.params.id);

    const updatedFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      city: req.body.city,
      country: req.body.country,
      isActive: req.body.isActive,
    };
    
    // Update the user by finding it based on a unique identifier (e.g., user ID)
    Author.updateOne({ _id: userId }, { $set: updatedFields })
      .then((result) => {
        if (result.acknowledged) {
          res.send({ message: 'Author updated successfully' });
        } else {
          res.status(404).send({ message: 'Author not found or no changes made' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating the Author.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Delete a Author
exports.deleteAuthor = (req, res) => {
  //#swagger.tags=['Authors']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must user a valid user id to delete a user');
    }

    const userId = new ObjectId(req.params.id);

    // Delete the author by finding it based on a unique identifier (e.g., user ID)
    Author.deleteOne({ _id: userId })
      .then((result) => {
        if (result.deletedCount > 0) {
          res.send({ message: 'Author deleted successfully' });
        } else {
          res.status(404).send({ message: 'Author not found or no changes made' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while deleting the Author.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};