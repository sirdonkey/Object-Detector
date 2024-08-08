let img;
let detector;
let objects = [];
let status = "";

function preload() {
    img = loadImage('image1.jpg');
    detector = ml5.objectDetector('cocossd', modelLoaded);
}

function setup() {
    let canvas = createCanvas(640, 420);
    canvas.parent('canvasContainer');
    detector.detect(img, gotResults);
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = "Model Loaded";
    document.getElementById('status').innerHTML = "Status: Model Loaded";
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        objects = results;
        document.getElementById('count').innerHTML = `Detected objects: ${objects.length}`;
    }
}

function draw() {
    image(img, 0, 0);

    if (status !== "") {
        for (let i = 0; i < objects.length; i++) {
            let object = objects[i];
            let confidence = floor(object.confidence * 100);
            fill(0, 255, 0);
            text(`${object.label} ${confidence}%`, object.x + 10, object.y + 24);
            noFill();
            strokeWeight(2);
            stroke(0, 255, 0);
            rect(object.x, object.y, object.width, object.height);
        }
    }
}
