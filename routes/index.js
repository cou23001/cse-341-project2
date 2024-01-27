const routes = require('express').Router();
const user = require('./user');
const reporter = require('./reporter');

routes.use('/', require('./swagger'))

routes.get('/', (req,res) => {
    //#swagger.tags=['Hello World']
    res.send("Hello Project 2!");
});

routes.use('/users', user);
routes.use('/reporters', reporter);

module.exports = routes; 