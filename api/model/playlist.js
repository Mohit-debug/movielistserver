const mongoose = require('mongoose');


const playList = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
  private:[{
    
    movie_id:[{
      type:String
    }],
    name:String,
  }],
  public:[{
    movie_id:[{
      type:String
    }],
    name:String,
}
  ]

},{timestamps:true});

module.exports = mongoose.model('PlayList',playList);