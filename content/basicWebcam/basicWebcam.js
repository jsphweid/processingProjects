var capture;
var innerSquareSizePercent = 0.50;
var transparancyOfInnerSquare = 0.75;
var camWidth;
var camHeight;
var arrayOfDivisibles;
var currentDivisibleIndex; // which item in the array
var squares; // contains many Square class objects

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    console.log("window height is: " + windowHeight)

    capture = createCapture(VIDEO);
    capture.pixelDensity(4);
    capture.size(320, 240); // 320, 240
    capture.hide();
    camWidth = capture.width;
    camHeight = capture.height;

    arrayOfDivisibles = getDivisibleIntegers(camWidth, camHeight);
    currentDivisibleIndex = arrayOfDivisibles.length - 1;

    reconfigure();
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
    var d = 4;
    var w = capture.width;
    capture.loadPixels();
    for (var i = 0; i < squares.length; i++) {
        var x = squares[i].xCoordToGetFromCam;
        var y = squares[i].yCoordToGetFromCam;
        var c = [capture.pixels[(y*w*d+x)*d],
                 capture.pixels[(y*w*d+x)*d+1],
                 capture.pixels[(y*w*d+x)*d+2],
                 capture.pixels[(y*w*d+x)*d+3]];
        // basically, we pass in the array, which is a slice of the giant pixels array.
        // This slice contains the desired pixel color in the form of an array.
        squares[i].update(c);
        squares[i].display();
    }
}

// square class
function Square(iSL, iX, iY) {
    this.sideLength = iSL;
    this.x = iX;
    this.y = iY;
    this.innerSideLength = this.sideLength * innerSquareSizePercent;
    this.offset = (this.sideLength - this.innerSideLength) / 2;
    this.innerX = this.offset + this.x;
    this.innerY = this.offset + this.y;
    this.squareCenterX = this.x + (this.sideLength / 2);
    this.squareCenterY = this.y + (this.sideLength / 2);
    this.xCoordToGetFromCam = Math.round((this.x * camWidth) / width);
    this.yCoordToGetFromCam = Math.round((this.y * camHeight) / height);
    this.c = color(255, 255, 255);
    this.previousColor = (255, 255, 255);

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

    console.log("number of squares is: " + squares.length)
    console.log(squares)

}