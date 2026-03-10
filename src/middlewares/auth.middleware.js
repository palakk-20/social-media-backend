const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //will return the id beacuse we created token on id
    const user = await userModel.findOne({
      _id: decoded.id,
    });
    // console.log("cokkies: ", req.cookies);
    // console.log("Token :", req.cookies.token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Credentials, Please login again",
    });
  }
}

module.exports = authMiddleware;
