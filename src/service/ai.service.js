const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  // const base64ImageFile = fs.readFileSync("path/to/small-sample.jpg", {
  //   encoding: "base64",
  // });

  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: contents,
    config: {
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: "You are expert in generating captions Only one caption short and consciseuse hashtag and emojis",
          },
        ],
      },
    },
  });
  return response.text;
}

module.exports = generateCaption;
