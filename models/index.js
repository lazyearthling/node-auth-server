var mongoose = require('mongoose');

//MONGOOSE SETUP
mongoose.set('debug',true);
mongoose.connect('mongodb://localhost/auth');

//HOOKS THE PROMISE FUNCTIONALITY TO MONGOOSE METHODS
mongoose.Promise = Promise;

//EXPORTS THE USER MODEL
module.exports.User = require('./user');
