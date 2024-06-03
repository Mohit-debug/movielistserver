const { Router } = require("express");
const user = require('./model/user');
const requestValidator = require('./middleware/requestValidator');
const userController = require('./controller/userController');

const router = Router();

router.post(
    "/user/signup",
    userController.newProfile);

router.post(
  "/user/login",
  userController.getOneProfiles);
  
 

module.exports = router;
