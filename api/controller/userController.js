  const User = require('../model/user');
  const bcrypt = require('bcryptjs');
  const formidable = require('formidable');
  require('dotenv').config();
  const multer = require('multer');
  const fs = require('fs');
  const path = require('path');
  const {generateToken} = require("../utils/generate_token");
  const PlayList = require("../model/playlist")


module.exports.newProfile = async(req, res,next) => {
  try {
    console.log({ body: req.body });
    const { email, username,password,phonenumber } = req.body;
    console.log({ body: req.body });
    let userExists = await User.exists({ email });
    if (userExists) throw new Error("user already exists");

    const passwordHash = await bcrypt.hash(password, 10);
    console.log({passwordHash})
    const user = await User.create({
      email,
      username,
      phonenumber,
     
      password: passwordHash,
      
    });

    

    res.status(200).json({
      status: "success",
      user,
    
    });
  } catch (err) {
    next(err);
  }
  };

  module.exports.getOneProfiles = async(req, res,next) => {
  
      try {
        const { email, password } = req.body;
        console.log({email,password})
        const user = await User.findOne({ email }).select(
          "-createdAt -updatedAt -__v"
        );
        console.log(user, "56789000");
        // if (user?.status === "In Active") throw new Error("User In Active");
        if (!user) throw new Error("incorrect email");
        // console.log({ password, user });
    
        const isMatch = await bcrypt.compare(password, user?.password);
    
        if (!isMatch) throw new Error("incorrect password");
    
        
    
        const accessToken = generateToken(user);
        console.log({accessToken});
        return res.status(200).json({
          status: "success",
         
          message: "login successful",
          accessToken,
          user,
        });
      } catch (err) {
        next(err);
      }
    
  };

  module.exports.fetchUserDetails = async (req, res, next) => {
    try {
      console.log(req.user,"2344566")
      const data = await User.findById(req.user);
  
      console.log(data, "12345");
      return res.status(200).json({
        status: "success",
        user: data,
      });
    } catch (error) {
      next(error);
    }
  };
  module.exports.addpublicmovie = async (req, res, next) => {
    try {
      console.log({ body: req.body });
      const {user,private,public } = req.body;
  
     const playlist = PlayList.create({
      user,
      private,
      public
     });
  
      
  
      res.status(200).json({
        status: 'success',
       playlist
      });
    } catch (err) {
      next(err);
    }
  };
  module.exports.updatepublicmovie = async(req,res,next)=>{
    try{
      const {requestId} = req.params;
      const{name,private,public}= req.body;
      const playlist = await PlayList.findByIdAndUpdate({_id:requestId},{
        ...(name && {name}),
        ...(private && {private}),
        ...(public && {public}),


      },{new:true});
      await playlist.save();
      res.status(200).json({
        status: 'success',
       playlist
      });
    } catch (err) {
      next(err);
    }
  } 

  module.exports.getmovie = async(req,res,next)=>{
    try{
      const {requestId} = req.params;
     const playlist= await PlayList.findOne({user:requestId })
      res.status(200).json({
        status: 'success',
       playlist
      });
    } catch (err) {
      next(err);
    }
  } 

  module.exports.allgetmovie = async(req,res,next)=>{
    try{
     
     const playlist= await PlayList.find({})
      res.status(200).json({
        status: 'success',
       playlist
      });
    } catch (err) {
      next(err);
    }
  } 