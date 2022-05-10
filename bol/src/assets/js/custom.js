// Classifier Variable
let classifier;
// Model URL
let imageModelURL = './assets/custom/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

function setup() {
  createCanvas(320, 260);

  // Start classifying
}

function draw() {
  background(0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

function classifyImage() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
	classifier.classify(document.getElementById("formFileLg").value);
  console.log(document.getElementById("formFileLg").value);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
}
