var capture;
var camWidth;
var camHeight;
var droplets; // contains many Droplet class objects

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    console.log("window height is: " + windowHeight)

    capture = createCapture(VIDEO);
    capture.size(320, 240); // 320, 240
    capture.hide();
    camWidth = capture.width;
    camHeight = capture.height;

    configureDropletPositions();
}

function draw() {
    background(0);

    updateAndDisplayDroplets();

    displayFrameRate();
}

function displayFrameRate() {
    var fr = Math.round(frameRate());
    fill(127, 80);
    textSize(20);
    text(fr, 20, 20);
}

function updateAndDisplayDroplets() {
    var i;
    // for (var droplet in droplets) {
    //     droplet.display;
    // }
    for (i = 0; i < droplets.length; i++) {
        droplets[i].display();
    }
}

// Droplet class
function Droplet(SL_, X_, Y_) {
    this.sideLength = SL_;
    this.x = X_;
    this.y = Y_;

    this.update = function() {

    }

    this.display = function() {
        fill(255);
        text("a", this.x, this.y);
    }
}

function configureDropletPositions() {
    droplets = []; //# should this be  [] or {}?
    var dropletSize = 9; // the size of the box
    var numXSquares = Math.round(width / dropletSize);
    var numYSquares = Math.round(height / dropletSize);
    var numberOfSquares = numXSquares * numYSquares;

    console.log("num x droplets is: " + numXSquares)
    console.log("num y droplets is: " + numYSquares);

    for (var i = 0; i < numXSquares; i++) {
        for (var j = 0; j < numYSquares; j++) {
            var dropletTopLeftX = i * dropletSize;
            var dropletTopLeftY = j * dropletSize;
            var droplet = new Droplet(dropletSize, dropletTopLeftX, dropletTopLeftY);
            droplets.push(droplet);
        }
    }

    console.log("number of droplets is: " + droplets.length)
    console.log(droplets)
}