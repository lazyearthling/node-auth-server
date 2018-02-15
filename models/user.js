const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,
      bcrypt   = require('bcrypt-nodejs');

//DEFINES A USER SCHEMA
const userSchema = new Schema({
  email:{
    type: String,
    unique : true,
    lowercase : true,
    required : "Email cannot be left blank"
  },
  password:{
    type: String,
    required : "Password cannot be left blank"
  }
});

//CRYPT USER PASSWORD BEFORE SAVING IT TO THE DATABASE USING BCRYPT
userSchema.pre('save',function(next){
  const user = this;const a = 0;

  //Generate a salt and pass it down to .hash
  bcrypt.genSalt(10, function(err,salt){
    if(err) { return next(err); }

    //Hash the password with the salt
    bcrypt.hash(user.password,salt,null,function(err,hash){
      if(err) { return next(err); }

      user.password = hash;
      next();
    })
  })
})

//CREATES A USER MODEL
var UserModel = mongoose.model('User',userSchema);

//EXPORTS THE USER MODEL
module.exports = UserModel;
