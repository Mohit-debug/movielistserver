const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
    email:String,
    username:String,
    password:String,
    phonenumber:String,
    

},{timestamps:true});

  
module.exports = mongoose.model('User',apiSchema);
