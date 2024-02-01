const routes = require('express').Router();
const user = require('./user');
const reporter = require('./reporter');
const passport = require('passport');

routes.use('/', require('./swagger'))

//routes.get('/', (req,res) => {
//    //#swagger.tags=['Hello World - Project 2']
//    res.send("Hello Project 2!");
//});

routes.use('/users', user);
routes.use('/reporters', reporter);

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