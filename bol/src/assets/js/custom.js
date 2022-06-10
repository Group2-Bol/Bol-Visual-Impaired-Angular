// Classifier Variable
let classifier;
// Model URL
let imageModelURL = './assets/custom/';

// A variable to hold the image we want to classify
let img;

//let resultLabel = "";

// Load de model and image first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  img = loadImage('./assets/images/ml5.png');
}

function setup() {
  classifier.classify(img, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  resultLabel = "";
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    console.log(results[0]);
    resultLabel = results[0].label.toString();
    saveLabel(resultLabel);
    return results[0];
  }
}

function saveLabel(_label)
{
  localStorage.setItem("label", _label);
}
