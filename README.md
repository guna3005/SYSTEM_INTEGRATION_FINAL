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
