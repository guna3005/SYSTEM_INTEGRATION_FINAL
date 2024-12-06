const azureClient = require('../services/azureClient');

module.exports = {
  /**
   * GET /voices
   * Returns a list of all available voices.
   */
  async getVoices(req, res, next) {
    try {
      const voices = await azureClient.listAvailableVoices();
      return res.json({ voices });
    } catch (error) {
      return next(error);
    }
  },

  /**
   * POST /synthesize/text
   * Request Body: { text: string, voiceName: string (optional), language: string (optional) }
   * Converts plain text to speech audio.
   */
  async synthesizeText(req, res, next) {
    try {
      const { text, voiceName, language } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Text is required.' });
      }

      // Synthesize speech using Azure client
      const audioBuffer = await azureClient.synthesizeSpeechFromText(text, { voiceName, language });

      // Respond with the audio file as binary data
      res.set({
        'Content-Type': 'audio/wav',
        'Content-Disposition': 'attachment; filename="output.wav"',
      });

      return res.send(audioBuffer);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * POST /synthesize/ssml
   * Request Body: { ssml: string, voiceName: string (optional), language: string (optional) }
   * Converts SSML input to speech audio.
   */
  async synthesizeSSML(req, res, next) {
    try {
      const { ssml, voiceName, language } = req.body;

      if (!ssml) {
        return res.status(400).json({ error: 'SSML input is required.' });
      }

      const audioBuffer = await azureClient.synthesizeSpeechFromSSML(ssml, { voiceName, language });

      res.set({
        'Content-Type': 'audio/wav',
        'Content-Disposition': 'attachment; filename="output.wav"',
      });

      return res.send(audioBuffer);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * POST /speech-to-text
   * Form-data: audio file (e.g., field name "audioFile")
   * Converts an uploaded speech audio file into text.
   *
   * Expected: The request should be handled by a file upload middleware (like 'multer') before it reaches here.
   * The uploaded file will be available at `req.file`.
   */
  async speechToText(req, res, next) {
    try {
      const audioFile = req.file;

      if (!audioFile) {
        return res.status(400).json({ error: 'No audio file uploaded.' });
      }

      const { buffer, mimetype } = audioFile;

      // Use Azure STT client to recognize speech
      const transcript = await azureClient.recognizeSpeechFromAudio(buffer, mimetype);

      return res.json({ transcript });
    } catch (error) {
      return next(error);
    }
  },
};
