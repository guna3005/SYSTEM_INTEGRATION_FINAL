require('dotenv').config();
const axios = require('axios');

// Load environment variables
const { AZURE_SPEECH_API_KEY, AZURE_SPEECH_REGION } = process.env;

if (!AZURE_SPEECH_API_KEY || !AZURE_SPEECH_REGION) {
  throw new Error('Azure Speech configuration is missing. Please set AZURE_SPEECH_API_KEY and AZURE_SPEECH_REGION in .env');
}

// Base URLs for TTS and STT (As of current standards)
const TTS_BASE_URL = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices`;
const STT_BASE_URL = `https://${AZURE_SPEECH_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;

// Default headers for Azure Speech
const defaultHeaders = {
  'Ocp-Apim-Subscription-Key': AZURE_SPEECH_API_KEY,
};

module.exports = {
  /**
   * Lists all available voices.
   * Endpoint: GET {TTS_BASE_URL}/voices/list
   */
  async listAvailableVoices() {
    const response = await axios.get(`${TTS_BASE_URL}/voices/list`, {
      headers: { ...defaultHeaders },
    });
    return response.data; // Array of voices
  },

  /**
   * Synthesize speech from plain text.
   * We convert plain text to SSML under the hood.
   * Options may include voiceName and language (e.g., "en-US").
   */
  async synthesizeSpeechFromText(text, { voiceName = 'en-US-AriaNeural', language = 'en-US' } = {}) {
    const ssml = this._buildSSML(text, voiceName, language);
    return this._synthesizeSpeech(ssml, voiceName, language);
  },

  /**
   * Synthesize speech directly from provided SSML.
   * Caller is responsible for providing valid SSML.
   */
  async synthesizeSpeechFromSSML(ssml, { voiceName = 'en-US-AriaNeural', language = 'en-US' } = {}) {
    return this._synthesizeSpeech(ssml, voiceName, language);
  },

  /**
   * Recognize speech from audio buffer.
   * Audio should be WAV with the correct format (PCM, 16kHz).
   * Endpoint: POST {STT_BASE_URL}?language={language}
   */
  async recognizeSpeechFromAudio(audioBuffer, mimetype, language = 'en-US') {
    // For STT, we assume WAV PCM 16kHz audio. Adjust headers if you use other formats.
    const response = await axios.post(
      `${STT_BASE_URL}?language=${language}`,
      audioBuffer,
      {
        headers: {
          ...defaultHeaders,
          'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
          // If needed, set 'Transfer-Encoding': 'chunked' for streaming large audio
        },
      }
    );

    return response.data.DisplayText || null;
  },


  _buildSSML(text, voiceName, language) {
    return `
      <speak version='1.0' xml:lang='${language}'>
        <voice name='${voiceName}'>${text}</voice>
      </speak>
    `;
  },

  /**
   * Internal helper method to perform the synthesis from SSML.
   * This posts to the TTS synthesis endpoint and returns an audio buffer.
   */
  async _synthesizeSpeech(ssml, voiceName, language) {
    // We’ll request a WAV output: riff-24khz-16bit-mono-pcm
    // Adjust output format as needed.
    const headers = {
      ...defaultHeaders,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
      'User-Agent': 'YourAppName/1.0',
    };

    const response = await axios.post(`${TTS_BASE_URL}/v1`, ssml.trim(), {
      headers,
      responseType: 'arraybuffer', 
    });

    return response.data; 
  },
};
