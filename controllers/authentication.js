const db = require('../models'),
      jwt = require('jwt-simple'),
      config = require('../config');

//User REFERS TO THE USER MODEL
const User = db.User;

//JWT TOKEN CREATION USING THE USER ID AND A GIVEN SECRET
function tokenForUser(user){
  const timestamp = new Date().getTime();
  //JWT STANDARD sub(subject) iat(time)
  return jwt.encode({ sub:user.id, iat:timestamp}, config.secret);
}

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
          .then(function(newUser){
            //IF SUCCESSFULL RESPOND WITH A 201
            res.status(201).json({token: tokenForUser(newUser)});
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
