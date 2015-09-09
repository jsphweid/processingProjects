var amplitude, canvas, sound;
var averagingSmoothness = 100;
var bars = [];
var specDetails = {};
var avgAmpArr = [];
var avgSlider;
var bkgSlider;
var sliderXPos;
var sliderYPos;

function preload() {
    sound = loadSound('files/cosmos.mp3');
}

function setup() {
    canvas = createCanvas(windowWidth * 0.99, windowHeight * 0.8);

    avgSlider = createSlider(1, 100, 50);
    sliderXPos = width / 2;
    sliderYPos = height * 0.05;
    avgSlider.position(sliderXPos, sliderYPos)

    bkgSlider = createSlider(0, 100, 0);
    bkgSlider.position(sliderXPos, sliderYPos + 40)

    // begin playing sound file
    sound.setVolume(1);
    sound.play();

    // new amp object (?)
    amplitude = new p5.Amplitude();

    // new fft object (?) and add basic details
    fft = new p5.FFT();
    specDetails.spectrum = fft.analyze();
    specDetails.numBars = specDetails.spectrum.length;
    specDetails.barWidth = width / specDetails.numBars;

    // create the actual bar 'class' objects
    var xPosIncrement = 0;
    for (var i = 0; i < specDetails.numBars; i++) {
        var bar = new Bar(xPosIncrement)
        bars.push(bar);
        xPosIncrement += specDetails.barWidth;
    }

    // add pause / play functionality, perhaps make spacebar do the same...?
    canvas.mouseClicked(function() {
        if (sound.isPlaying()) {
            sound.pause();
        } else {
            sound.play();
        }
    })
}

function getAvgAmp() {
    var thisAmp = amplitude.getLevel();
    if (averagingSmoothness === 1) {
        return thisAmp;
    } else {
        avgAmpArr.unshift(thisAmp);
        while (avgAmpArr.length > averagingSmoothness) {
            avgAmpArr.pop();
        }
        var sum = 0;
        var arrLength = avgAmpArr.length;
        for (var i = 0; i < arrLength; i++) {
            sum += avgAmpArr[i];
        }
        return (sum / arrLength);
    }
}

function draw() {
    var sliderValue = avgSlider.value();
    var sliderValueBkg = bkgSlider.value();
    var ampBackground = 255 - map(getAvgAmp(), 0, 1, 0, 255) * (sliderValueBkg / 10);
    displayBackground(ampBackground);

    displaySliderText(ampBackground);
    displayFrameRate(ampBackground);
    displayBars(sliderValue);
}

function displaySliderText(ampBackground) {
    // var grayScale = 255 - ampBackground;
    fill(0, 90);
    text("reactivity vs. smoothness", sliderXPos - 160, sliderYPos + 8);
    text("background responsiveness", sliderXPos - 180, sliderYPos + 48);
}

function displayBars(averageTail) {
    specDetails.spectrum = fft.analyze();
    for (var i = 0; i < specDetails.spectrum.length; i++) {
        bars[i].addValueAndUpdateSize(specDetails.spectrum[i], averageTail); // change 5
                                                                            //to slider value
        var currentBarHeight = bars[i].getAvgFromArray();
        currentBarHeight = map(currentBarHeight, 0, 255, 0, 1);
        var currentYPos = height - (currentBarHeight * height);
        var h = height - currentYPos;
        rect(bars[i].xPos, currentYPos, bars[i].barWidth, h);
    }
}

function displayBackground(amp) {
    background(amp);
    strokeWeight(1);
    noFill();
    rect(0, 0, width, height);
}

function Bar(xPos) {
    this.xPos = xPos;
    this.barWidth = specDetails.barWidth;
    this.ampArray = [];

    this.getAvgFromArray =  function() {
        var arrayLength = this.ampArray.length;
        var sum = 0;
        for (var i = 0; i < arrayLength; i++) {
            sum += this.ampArray[i];
        }
        return (sum / arrayLength);
    }

    this.addValueAndUpdateSize = function(valueToAdd, requestedSize) {
        this.ampArray.unshift(valueToAdd);
        while (this.ampArray.length > requestedSize) {
            this.ampArray.pop(); 
        }
    }
}

function displayAmp(grayScaleColor) {
    fill(grayScaleColor, 40);
    textSize(20);
    text((map(amplitude.getLevel(), 0, 1, 0, 100)), 20, 50);
}

function displayFrameRate(grayScaleColor) {
    grayScaleColor = 255 - grayScaleColor;
    var fr = Math.round(frameRate());
    fill(grayScaleColor, 80);
    textSize(20);
    text("FPS:", 10, 20);
    text(fr, 55, 20);
}