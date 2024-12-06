# Azure AI Speech Services Integration

This project integrates with Microsoft Azure’s Speech Services, providing a Node.js/Express API for:

- Listing available Text-to-Speech (TTS) voices
- Converting text to speech (TTS)
- Converting SSML (Speech Synthesis Markup Language) to speech (TTS)
- Converting uploaded audio files (speech) to text (STT)

## Prerequisites

- Node.js (v14 or later recommended)
- NPM (included with Node.js)
- An Azure account with a Speech resource:
  - Obtain `AZURE_SPEECH_API_KEY`
  - Obtain `AZURE_SPEECH_REGION`

## Installation

```bash
npm install 
```

## Configuration
Create a .env file in the project root (same directory as package.json) and add:

```bash
AZURE_SPEECH_API_KEY=your_speech_key_here
AZURE_SPEECH_REGION=your_region_here
PORT=3000
```


## Usage
Ensure your package.json has a start script:

json

```bash
"scripts": {
  "start": "node src/index.js"
}
```

Then start the application:

```bash
npm start
The server runs at:
http://localhost:3000

```

(or the port you specified in the .env file.)

## Endpoints
GET /voices
Description: Returns a JSON list of available voices from the Azure TTS service.

Example (curl):

```bash
curl http://localhost:3000/voices
```
Example Response (JSON):

json
```bash
{
  "voices": [
    {
      "Name": "en-US-AriaNeural",
      "ShortName": "en-US-AriaNeural",
      "Locale": "en-US",
      "Gender": "Female",
      "VoiceType": "Neural",
      "StyleList": ["chat", "customerservice"]
    }
  ]
}
POST /synthesize/text
```

Description: Converts plain text into speech audio (WAV file).

Request Body (JSON):

json
```bash
{
  "text": "Hello, this is a test.",
  "voiceName": "en-US-AriaNeural",
  "language": "en-US"
}
```
text is required.
voiceName and language are optional.
Example (curl):

```bash
curl -X POST http://localhost:3000/synthesize/text \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello from Azure Speech!"}' \
  --output output.wav
POST /synthesize/ssml
```
Description: Converts SSML input into speech audio (WAV file). 

SSML allows fine control over speech features like pitch, speed, and breaks.

Request Body (JSON):

json
```bash
{
  "ssml": "<speak version='1.0' xml:lang='fr-FR'><voice name='fr-FR-DeniseNeural'>Bonjour, ceci est un test de synthèse vocale avancée.</voice></speak>",
  "voiceName": "fr-FR-DeniseNeural",
  "language": "fr-FR"
}
ssml is required.
```

voiceName and language are optional.
Example (curl):

```bash
curl -X POST http://localhost:3000/synthesize/ssml \
  -H "Content-Type: application/json" \
  -d '{"ssml":"<speak version=\'1.0\' xml:lang=\'en-US\'><voice name=\'en-US-AriaNeural\'>This is SSML-based speech synthesis!</voice></speak>"}' \
  --output ssml_output.wav
  ```


POST /speech-to-text
Description: Transcribes an uploaded audio file (e.g., WAV) into text.

Form Data:

Key: audioFile
Type: File (select a WAV file)
Example (curl):

```bash
curl -X POST http://localhost:3000/speech-to-text \
  -F "audioFile=@path/to/your_audio.wav"
```

Example Response (JSON):

json
```bash
{
  "transcript": "Recognized speech text here."
}
```

API Documentation
If configured, Swagger UI is available at:

```bash
http://localhost:3000/api-docs
```
This provides a user-friendly interface to explore and test the endpoints directly in your browser.

Testing the APIs
Postman or Insomnia:
Use these tools to easily send requests and upload files.

## Security Notes
Do not commit your Azure keys or .env file to version control.
Consider rotating keys periodically.
Destroy the Azure resource after completion to avoid unexpected charges.
Troubleshooting
Ensure `AZURE_SPEECH_API_KEY` and `AZURE_SPEECH_REGION are correctly` set in .env.
Check that the audio file for speech-to-text is in a supported format (WAV PCM 16kHz recommended).
Verify that npm start runs without errors and that the server is reachable.