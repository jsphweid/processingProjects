var capture;
var camWidth;
var pd = 1; // pixel Density

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(1);

    capture = createCapture(VIDEO);
    capture.size(320, 240); // 320, 240
    capture.hide();
    camWidth = capture.width;
}

function draw() {
    background(255);
    drawAllPixels();
}

function drawAllPixels() {
    var x, y;
    capture.loadPixels();
    for (x = 0; x < 320; x++) {
        for (y = 0; y < 240; y++) {
            stroke([capture.pixels[(y*camWidth*pd+x)*pd],
                    capture.pixels[(y*camWidth*pd+x)*(pd+1)],
                    capture.pixels[(y*camWidth*pd+x)*(pd+2)],
                    capture.pixels[(y*camWidth*pd+x)*(pd+3)]])
            point(x, y);
        }
    }
}