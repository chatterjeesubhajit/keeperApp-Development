
const noteSchema =require("./notes");  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose =require("passport-local-mongoose");
const findOrCreate =require('mongoose-findorcreate');
// const dotenv = require('dotenv');
// dotenv.config({ path: '../.env' });

  const userSchema=new Schema({
      username:String, // this &
      password:String, // this for local passport strategy
      displayName:String,
      loginMethod:String,
      userId:String,
      notes:[noteSchema]
    });

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User",userSchema);
module.exports=User;

