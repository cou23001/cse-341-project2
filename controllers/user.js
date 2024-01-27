const db = require('../models');
const User = db.users;
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');

// Get the API Key from .env
require('dotenv').config();
let apiKey = process.env.apiKey

exports.getAll = (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {
    User.find(
      {},
      {
        email: 1,
        username: 1,
        name: 1,
        ipaddress: 1,
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
  //#swagger.tags=['Users']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must user a valid user id to find a user');
    } else {

    
      const _id = new ObjectId(req.params.id);
      
      User.find({ _id: _id })
        .then((data) => {
          if (data.length === 0)
            res
            .status(404)
            .send({ message: 'Not found User with id ' + _id });
          else
            res.send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Error retrieving User with id=' + _id,
        });
      });
    }
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Create a User
exports.createUser = (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const user = new User({
      email: req.body.email,
      username: req.body.username,
      name: req.body.name,
      ipaddress: req.body.ipaddress,
    });
    // Save User in the database
    user
      .save(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the User.',
        });
      });
  
  }
  else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Update a User
exports.updateUser = (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {
    
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must user a valid user id to update a user');
    }
    const userId = new ObjectId(req.params.id);

    const updatedFields = {
      email: req.body.email,
      username: req.body.username,
      name: req.body.name,
      ipaddress: req.body.ipaddress,
    };
    
    // Update the user by finding it based on a unique identifier (e.g., user ID)
    User.updateOne({ _id: userId }, { $set: updatedFields })
      .then((result) => {
        if (result.acknowledged) {
          res.send({ message: 'User updated successfully' });
        } else {
          res.status(404).send({ message: 'User not found or no changes made' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating the User.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Delete a User
exports.deleteUser = (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description= apiKey: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N
  if (req.header('apiKey') === apiKey) {

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must user a valid user id to delete a user');
    }

    const userId = new ObjectId(req.params.id);

    // Delete the user by finding it based on a unique identifier (e.g., user ID)
    User.deleteOne({ _id: userId })
      .then((result) => {
        if (result.deletedCount > 0) {
          res.send({ message: 'User deleted successfully' });
        } else {
          res.status(404).send({ message: 'User not found or no changes made' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while deleting the User.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};