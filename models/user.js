const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

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

//CREATES A USER MODEL
var UserModel = mongoose.model('User',userSchema);

//EXPORTS THE USER MODEL
module.exports = UserModel;
