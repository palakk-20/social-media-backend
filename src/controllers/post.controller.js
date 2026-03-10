const postModel = require("../models/post.models");
const generateCaption = require("../service/ai.service");
async function createPostController(req, res) {
  try {
    const file = req.file;
    console.log("File recieved: ", file);
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const caption = await generateCaption(base64Image);

    console.log("Generated caption: ", caption);
    res.json({
      caption,
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
