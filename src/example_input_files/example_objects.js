// example json object to test synthesize text api

// for both the apis you need to add body as form data and and add audioFile as key and select the required file as value for key
synthText = {
  "text": "Hello and welcome to this comprehensive demonstration of Azure Speech Services. Today, we are exploring how neural voices can transform plain text into lifelike speech. This service supports multiple languages, regional accents, and even different speaking styles. Imagine the possibilities for voice assistants, audiobooks, or e-learning platforms. The potential is truly impressive.",
  "voiceName": "en-US-AriaNeural",
  "language": "en-US"
}

// example json object to test synthesize ssml api

synthSSML = {
  "ssml": "<speak version='1.0' xml:lang='en-US'><voice name='en-US-AriaNeural'><break time='500ms'/>Hello, and thank you for choosing Azure Speech Services.<break time='1s'/>We hope you find this demonstration enlightening.<prosody rate='slow' pitch='+2st'>As you can hear, we can slow down the speech and even increase the pitch for emphasis.</prosody><break time='1s'/>With SSML, you can insert pauses, change pitch, rate, and volume, and even add elements like <emphasis>emphasis</emphasis> on particular words.<break time='500ms'/>Feel free to experiment with these features to create a voice experience that truly resonates with your audience.</voice></speak>",
  "voiceName": "en-US-AriaNeural",
  "language": "en-US"
}
