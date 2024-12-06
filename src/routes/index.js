const express = require('express');
const speechController = require('../controllers/speechController');
const multer = require('multer');

const router = express.Router();

// Configure multer for file uploads (no disk storage, just memory)
const upload = multer();

// Routes
router.get('/voices', speechController.getVoices);
router.post('/synthesize/text', speechController.synthesizeText);
router.post('/synthesize/ssml', speechController.synthesizeSSML);

// For speech-to-text, we expect a form-data upload with the field name "audioFile"
router.post('/speech-to-text', upload.single('audioFile'), speechController.speechToText);

module.exports = router;
