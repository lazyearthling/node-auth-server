const passport      = require('passport'),
      JwtStrategy   = require('passport-jwt').Strategy,
      ExtractJwt    = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local'),
      db            = require('../models'),
      config        = require('../config');

const User = db.User;

//SETUP OTIONS FOR LOCAL STRATEGY
const localOptions = {usernameField: 'email'};

//CREATE LOCAL STRATEGY
const localLogin = new LocalStrategy(localOptions,function(email,password,done){
  User.findOne({email:email})
    .then(function(user){
      if(!user){
        return done(null,false);
      } else {
        user.comparePassword(password,function(err,isMatch){
          if(err) { return done(err) }
          if(!isMatch){
            return done(null,false);
          } else {
            return done(null,user);
          }
        })
      }
    })
    .catch(function(err){
      return done(err)
    })
})

//SETUP OTIONS FOR JWT STRATEGY
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//CREATE JWT STRATEGY
const jwtLogin = new JwtStrategy(jwtOptions,function(payload,done){
  // see if the user ID in the payload exists in our database
  //If it does call 'done' with the user object
  //else call done without the user object
  User.findById(payload.sub)
    .then(function(user){
      if(user){
        //If user exists let him in.
        return done(null,user);
      } else {
        return done(null,false);
      }
    })
    .catch(function(){
      return done(err,false);
    })
})

passport.use(jwtLogin);
passport.use(localLogin);
