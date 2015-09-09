var capture;
var innerSquareSizePercent = 0.50;
var transparancyOfInnerSquare = 0.75;
var camWidth;
var camHeight;
var arrayOfDivisibles;
var currentDivisibleIndex; // which item in the array
var squares; // contains many Square class objects
// var d = pixelDensity;


var testImg;
var testImgWidth, testImgHeight;

function preload() {
    testImg = loadImage("ttt.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    capture = createCapture(VIDEO);
    capture.size(320, 240); // 320, 240
    capture.hide();
    camWidth = capture.width;
    camHeight = capture.height;

    testImgWidth = testImg.width;
    testImgHeight = testImg.height;

    //# delete this
    // test = new Square(10, 10, 10);

    arrayOfDivisibles = getDivisibleIntegers(camWidth, camHeight);
    currentDivisibleIndex = arrayOfDivisibles.length - 1;
    console.log(arrayOfDivisibles);
    console.log(currentDivisibleIndex);

    // reconfigure();
    // console.log(squares);
}

function draw() {
    // background(255);
    // image(capture, 0, 0, camWidth, camHeight); //#
    // image(testImg, 0, 0, testImgWidth, testImgHeight);
    // rect(0, 0, 600, 450);//#
    // displayFrameRate();

    //# sandbox
    // var c = capture.get(); //# why doesn't this work!?!?!?!
    // loadPixels();
    // console.log([pixels[(10*width*d+10)*d]]);
    // console.log(pixels);
    // var rgbaArray = capture.get(50, 50);
    // var rgbaArray = get(mouseX, mouseY);
    // console.log(rgbaArray);
    // background(rgbaArray);
    // updateAndDisplaySquares();
}

function displayFrameRate() {
    var fr = Math.round(frameRate());
    fill(255, 80);
    //   stroke(255, 80);
    textSize(20);
    text(fr, 20, 20);
}

function reconfigure() {
    squares = []; //# should this be  [] or {}?
    var squareSize = arrayOfDivisibles[currentDivisibleIndex];
    var numXSquares = width / squareSize;
    var numYSquares = height / squareSize;
    var numberOfSquares = numXSquares * numYSquares;

    for (var i = 0; i < numXSquares; i++) {
        for (var j = 0; j < numYSquares; j++) {
            var squareTopLeftX = i * squareSize;
            var squareTopLeftY = j * squareSize;
            var square = new Square(squareSize, squareTopLeftX, squareTopLeftY);
            squares.push(square);
        }
    }

}

function updateAndDisplaySquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].update();
        // squares[i].display();
    }
}

// gets divisible integers of the width and height
function getDivisibleIntegers(int1, int2) {
    var arr = [];
    if (int1 > int2) {
        for (var i = 3; i < int1; i++) {
            if (int1 % i === 0) {
                if (int2 % i === 0) {
                    arr.push(i);
                }
            }
        }
    } //# why is 'i' already defined?
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

    this.update = function() {
        this.previousColor = this.c;
        // console.log('first');
        this.c = capture.get(this.xCoordToGetFromCam, this.yCoordToGetFromCam);
        // console.log(this.c);

        // console.log(this.xCoordToGetFromCam);
        // console.log("prep");
        // this.c = capture.get();
        // console.log("test");
        // console.log(this.c);
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