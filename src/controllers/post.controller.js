const postModel = require("../models/post.models");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");
async function createPostController(req, res) {
  try {
    const file = req.file;
    console.log("File recieved: ", file);
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const caption = await generateCaption(base64Image);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);
    console.log("Generated caption: ", caption);
    const post = await postModel.create({
      caption: caption,
      image: result.url,
      folder: "imagekit-folder1",
      user: req.user._id,
    });
    res.status(201).json({
      message: "Post created successfully",
      post,
    });
    // console.log(base64Image);
  } catch (err) {
    res.status(500).json({
      message: "Caption service temporarily unavailable.Try again later.",
    });
  }
}

module.exports = {
  createPostController,
};
