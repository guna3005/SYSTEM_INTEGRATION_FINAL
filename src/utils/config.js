require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  azureSpeechApiKey: process.env.AZURE_SPEECH_API_KEY,
  azureSpeechRegion: process.env.AZURE_SPEECH_REGION
};

module.exports = config;
