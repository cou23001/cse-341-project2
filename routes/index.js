const routes = require('express').Router();
const user = require('./user');
const book = require('./book');
const registrationRoute = require('./registration');
//const reporter = require('./reporter');
const author = require('./author');
const passport = require('passport');

routes.use('/', require('./swagger'))

//routes.get('/', (req,res) => {
//    //#swagger.tags=['Hello World - Project 2']
//    res.send("Hello Project 2!");
//});

routes.use('/books', book);
routes.use('/authors', author);

// Use the registration route
routes.use('/users', user);

// Login with GitHub
routes.get("/login", passport.authenticate("github"), (req, res) => {});

// Logout
routes.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
});

module.exports = routes; 