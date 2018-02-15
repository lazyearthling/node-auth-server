const db = require('../models');

//User REFERS TO THE USER MODEL
const User = db.User;

//SIGNUP ROUTE FUNCTION
exports.signUp = function(req,res,next){
  const email    = req.body.email,
        password = req.body.password;

  //!IMPORTANT BEFORE DEPLOYING DO A EMAIL & PASSWORD VALIDATION CHECK//
  //CHECK FOR EMPTY FIELDS
  if(!email || !password){
    return res.status(422).json({error: "You must provide both email and a password"})
  }

  //FIND THE USER
  User.findOne({email:email})
    .then(function(existingUser){
      if(existingUser){
        //IF THE USER IS ALREADY PRESENT RESPOND WITH A 422
        res.status(422).json({error:"Email is in use"});
      } else {
        //CREATE NEW USER ENTRY IN THE DATABASE
        User.create(req.body)
          .then(function(){
            //IF SUCCESSFULL RESPOND WITH A 201
            res.status(201).json({message:"success"})
          })
          .catch(function(err){
            //error while creating
            return next(err);
          })
      }
    })
    .catch(function(err){
      //error while finding user
      return next(err);
    })
}
