const express = require("express");
const userModel = require("../models/user.models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controllers");
/* 
POST/register
POST/login
GET/user[protected]
*/

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
