const passport    = require('passport'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt  = require('passport-jwt').ExtractJwt,
      db          = require('../models'),
      config      = require('../config');

const User = db.User;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

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
