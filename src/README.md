Azure Speech API Integration
This project provides a Node.js API that interacts with Microsoft Azure’s Speech Services. It allows you to:

List available voices supported by Azure.
Convert text to speech (TTS).
Convert SSML (Speech Synthesis Markup Language) input to speech.
Transcribe uploaded audio files to text (Speech-to-Text).
Prerequisites
Node.js installed.
An Azure account with a Speech resource (you need its subscription key and region).
Setup
Clone this repository to your local machine.
Run: npm install
Create a file named ".env" in the project root and add: AZURE_SPEECH_API_KEY=your_key_here AZURE_SPEECH_REGION=your_region_here PORT=3000

Running the Application
Make sure you have a "start" script in the package.json file. For example: "scripts": { "start": "node src/index.js" }

Run: npm start

The server will start on http://localhost:3000 or the port specified in the .env file.

Endpoints
GET /voices: Returns a JSON list of available voices.
POST /synthesize/text: Accepts JSON input with a "text" field and returns synthesized speech as a WAV file.
POST /synthesize/ssml: Accepts JSON input with an "ssml" field for advanced speech synthesis.
POST /speech-to-text: Accepts an audio file (multipart/form-data) and returns the recognized text.
Testing the APIs
Use tools like curl, Postman, or any REST client to send requests. For speech-to-text, make sure to send the audio file as form-data with the field name "audioFile".

Documentation
Swagger UI documentation is available at /api-docs if configured. This provides detailed information on request and response formats.