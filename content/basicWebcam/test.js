// // OLD AND WRONG
// var capture;
// var camWidth, camHeight;
// var pd = 1; // pixel Density

// function setup() {
//     createCanvas(windowWidth, windowHeight);
//     frameRate(1);

//     capture = createCapture(VIDEO); // feed
//     capture.size(320, 240);
//     capture.hide();
//     camWidth = capture.width;
//     camHeight = capture.height;
// }

// function draw() {
//     background(255);
//     drawAllPixels();
// }

// function drawAllPixels() {
//     var x, y;
//     capture.loadPixels();
//     for (x = 0; x < camWidth; x++) {
//         for (y = 0; y < camHeight; y++) {
//             stroke([capture.pixels[(y*camWidth*pd+x)*pd],
//                     capture.pixels[(y*camWidth*pd+x)*(pd+1)],
//                     capture.pixels[(y*camWidth*pd+x)*(pd+2)],
//                     capture.pixels[(y*camWidth*pd+x)*(pd+3)]])
//             point(x, y);
//         }
//     }
// }

var capture;
var camWidth, camHeight;
var pd = 1; // pixel Density

function setup() {
    createCanvas(320, 240);
    frameRate(1);

    capture = createCapture(VIDEO); // feed
    capture.size(320, 240);
    capture.hide();
    // Assuming a 640 * 480 pixels camera
    camWidth = 640;
    camHeight = 480;
}

function draw() {
    background(255);
    drawAllPixels();
}

function drawAllPixels() {
    var x, y;
    capture.loadPixels();
    // Divide by 2 and multiply index by 8 is to reduce the final resolution
    for (y = 0; y < camHeight/2; y++) {
        for (x = 0; x < camWidth/2; x++) {
            var idx = 8 * (y * camWidth + x);
            stroke([capture.pixels[idx],
                        capture.pixels[idx+1],
                        capture.pixels[idx+2],
                        capture.pixels[idx+3]]);
            point(x, y);
        }
    }
}