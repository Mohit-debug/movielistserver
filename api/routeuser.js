const { Router } = require("express");
const user = require('./model/user');
const requestValidator = require('./middleware/requestValidator');
const userController = require('./controller/userController');

const router = Router();


  router.get("/user/profile",userController.fetchUserDetails)
  router.post("/user/movie/add",userController.addpublicmovie);
  router.put("/user/movie/update/:requestId",userController.updatepublicmovie);
  router.get("/user/movie/detail/:requestId",userController.getmovie)
  router.get("/user/movie/alldetail",userController.allgetmovie)


module.exports = router;