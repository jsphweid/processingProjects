var capture;
var innerSquareSizePercent = 0.50;
var transparancyOfInnerSquare = 0.75;
var camWidth;
var camHeight;
var arrayOfDivisibles;
var currentDivisibleIndex; // which item in the array
var squares; // contains many Square class objects
var router = {};

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(1);
    console.log("window height is: " + windowHeight)

    capture = createCapture(VIDEO);
    capture.size(640, 480);
    capture.hide();
    camWidth = capture.width;
    camHeight = capture.height;

    arrayOfDivisibles = getDivisibleIntegers(camWidth, camHeight);
    currentDivisibleIndex = arrayOfDivisibles.length - 1;

    reconfigure();
    makeRouter();
    establishConnections();

    console.log("number of squares is: " + squares.length)
    console.log(squares)
}

function draw() {
    background(255);

    updateAndDisplaySquares();

    displayFrameRate();
}

function displayFrameRate() {
    var fr = Math.round(frameRate());
    fill(127, 80);
    textSize(20);
    text(fr, 20, 20);
}

function updateAndDisplaySquares() {
    var d = 1;
    var w = capture.width;
    capture.loadPixels();
    for (var i = 0; i < squares.length; i++) {
        var currentIdx = squares[i].squareIdx;
        var c = [capture.pixels[currentIdx],
                 capture.pixels[currentIdx + 1],
                 capture.pixels[currentIdx + 2],
                 capture.pixels[currentIdx + 3]];
        // basically, we pass in the array, which is a slice of the giant pixels array.
        // This slice contains the desired pixel color in the form of an array.
        squares[i].update(c);
        squares[i].display();
    }
}

// produces a the router of all x,y -> idx
function makeRouter() {
    var x, y;
    capture.loadPixels();
    for (y = 0; y < camHeight; y++) {
        for (x = 0; x < camWidth; x++) {
            var idx = 4 * (y * camWidth + x);
            var a = [x, y];
            router[a] = idx;  
       }
    }
}

function establishConnections() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].squareIdx = router[squares[i].coordFromCam];
    }
}


// square class
function Square(iSL, iX, iY) {
    //constructor
    this.sideLength = iSL;
    this.x = iX;
    this.y = iY;
    this.innerSideLength = this.sideLength * innerSquareSizePercent;
    this.offset = (this.sideLength - this.innerSideLength) / 2;
    this.innerX = this.offset + this.x;
    this.innerY = this.offset + this.y;
    this.squareCenterX = this.x + (this.sideLength / 2);
    this.squareCenterY = this.y + (this.sideLength / 2);
    // initialize the colors with default values
    this.c = color(255, 255, 255);
    this.previousColor = (255, 255, 255);

    // first location to retrieve from pixel array
    // look for point to get from Cam and retrieve
    // WHY DO I HAVE TO DO THIS OUTSIDE>>>?
    // this.coordFromCam = [Math.round((this.x * camWidth) / width), Math.round((this.y * camHeight) / height)];
    // this.squareIdx = router[this.coordFromCam];

    this.update = function(col) {
        this.previousColor = this.c;
        this.c = col;
    }

    this.display = function() {
        noStroke();

        // outer
        fill(this.previousColor);
        rect(this.x, this.y, this.sideLength, this.sideLength);

        // inner
        fill(this.c, transparancyOfInnerSquare);
        rect(this.innerX, this.innerY, this.innerSideLength, this.innerSideLength);
    }
}

// gets divisible integers of the width and height
function getDivisibleIntegers(int1, int2) {
    var arr = [];
    var i;
    if (int1 > int2) {
        for (i = 3; i < int1; i++) {
            if (int1 % i === 0) {
                if (int2 % i === 0) {
                    arr.push(i);
                }
            }
        }
    }

    if (int2 > int1) {
        for (i = 3; i < int2; i++) {
            if (int2 % i === 0) {
                if (int1 % i === 0) {
                    arr.push(i);
                }
            }
        }
    }
    return arr;
}

function reconfigure() {
    squares = []; //# should this be  [] or {}?
    var squareSize = arrayOfDivisibles[currentDivisibleIndex];
    var numXSquares = Math.round(width / squareSize);
    var numYSquares = Math.round(height / squareSize);
    var numberOfSquares = numXSquares * numYSquares;

    console.log("num x squares is: " + numXSquares)
    console.log("num y squares is: " + numYSquares);

    for (var i = 0; i < numXSquares; i++) {
        for (var j = 0; j < numYSquares; j++) {
            var squareTopLeftX = i * squareSize;
            var squareTopLeftY = j * squareSize;
            var square = new Square(squareSize, squareTopLeftX, squareTopLeftY);
            squares.push(square);
        }
    }
}