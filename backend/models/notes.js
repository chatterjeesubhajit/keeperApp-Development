  
const mongoose = require('mongoose');

const noteSchema=new mongoose.Schema({
    ind:{type:String,require:[true,"need index for frontend"]},
    title:{type:String,
          required:[true,"every note needs a title!"]},
    content:{type:String},
    bgColor:  {type:String,default:"#ffff"},
    fontColor:{type:String,default:"#0000"}
  });
  module.exports=noteSchema;

  