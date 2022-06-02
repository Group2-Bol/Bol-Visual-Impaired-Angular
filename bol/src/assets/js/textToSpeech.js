async function textToSpeech(text) {
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = 'en-US';
    synth.speak(utterThis);
  
  
  }