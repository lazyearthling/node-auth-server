const db = require('../models');

//User REFERS TO THE USER MODEL
const User = db.User;

//SIGNUP ROUTE FUNCTION
exports.signUp = function(req,res,next){
  res.json({message:"signup route"})
}
