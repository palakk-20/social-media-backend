const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, //validation(schema level)
    required: true,
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
