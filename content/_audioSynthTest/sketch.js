var osc;
var lastDate;
var arrayOfOsc = [];

function setup() {
	backgroundColor = color(255,0,255);
	textAlign(CENTER);
	frameRate(60);

	lastDate = new Date().getTime();
	lastDate = Math.floor(lastDate / 1000);
}

function reconfigureSound() {
	arrayOfOsc = [];

	// pick random array length
	var randomLength = getRandomInt(3, 30);

	var targetAmp = 1 / randomLength;
	console.log("target amp is: " + targetAmp);


	// fill it up with osc's
	for (var i = 0; i < randomLength; i++) {
		var osc = new p5.Oscillator();
		osc.setType('sine');
  		osc.freq(getRandomInt(30, 2000));
		osc.amp(0);
		arrayOfOsc.push(osc);

	}

	console.log(arrayOfOsc);

	for (var k = 0; k < randomLength; k++) {
		arrayOfOsc[k].start();
	}


	for (var j = 0; j < randomLength; j++) {
		arrayOfOsc[j].amp(targetAmp, .1); // is this wrong...>!?!?!? should fade away
	}
} 

function mouseClicked() {

	for (var i = 0; i < arrayOfOsc.length; i++) {
		arrayOfOsc[i].amp(0, 0.1);
	}
	sleep(200);
	
	for (var k = 0; k < arrayOfOsc.length; k++) {
		arrayOfOsc[k].stop();
	}
	sleep(10);
	reconfigureSound();
}

function sleep(milliseconds) {
	var currentTime = new Date().getTime();
	while (currentTime + milliseconds >= new Date().getTime()) {
	}
}

function draw() {

	background(255);
	displayFrameRate(127);

	// if (secondHasPassed()) {
	// 	console.log("is working");
	// }

}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function secondHasPassed() {
	var newDate = new Date().getTime();
	if (newDate > lastDate + 1000) {
		lastDate = newDate;
		return true;
	}
	return false;
}

function displayFrameRate(grayScaleColor) {
	grayScaleColor = 255 - grayScaleColor;
	var fr = Math.round(frameRate());
	fill(grayScaleColor, 80);
	textSize(20);
	text("FPS:", 20, 20);
	text(fr, 55, 20);
}