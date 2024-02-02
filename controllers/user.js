const db = require('../models');
const User = db.users;
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Create a User
exports.createUser = async (req, res) => {
  //#swagger.tags=['Users']

    try {
      if (!req.body.username || !req.body.password || !req.body.name  ) {
        res.status(400).send({ message: 'All fields are required!' });
        return;
      }

      // Check if username already exists
      const existingUsername = await User.findOne({ username: req.body.username });

      if (existingUsername) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
      });

      // Save User in the database
      const savedUser = await user.save();

      res.send({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Some error occurred while creating the User.',
      }
      );
  }
};