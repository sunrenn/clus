

let classifier;
let img;

function preload(){
    classifier = ml5.imageClassifier('MobileNet');
    img = loadImage('../assets/images/canvas.png');
}

function setup() {
    createCanvas(400,400);
    classifier.classify(img, gotResult);
    image(img, 0, 0);
}

function gotResult(error, results){
    if (error) {
        console.error("error!!!");
        console.error(error);
    }
    else {
        console.log("results!!!");
        console.log(results);
        dLabel = createDiv(`Label: ${results[0].label}`);
        dLabel.id("dLabel");
        dLabel.class("infodiv itm1");
        dConfidence = createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
        dConfidence.id("dConfidence");
        dConfidence.class("infodiv itm2");
    }
}