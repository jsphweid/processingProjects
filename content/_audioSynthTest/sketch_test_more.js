var oscArray;
var goUp = true;

function setup() {
	createCanvas(windowWidth, windowHeight);
	oscArray = [];

	// make 3 osc's
	for (var i = 0; i < 3; i++) {
		var osc = new p5.Oscillator();
		osc.setType('sine');
		osc.freq(getRandomInt(40, 500));
		osc.amp(0); // initialize with 0 amp
		osc.start();
		oscArray.push(osc);
	}
}


function changeAmpTo(collectiveAimedAmp) {
	for (var i = 0; i < oscArray.length; i++) {
		oscArray[i].amp(collectiveAimedAmp / oscArray.length, 1);
	}
}

function newRandomFreqs() {
	for (var  i = 0; i < oscArray.length; i++) {
		oscArray[i].freq(getRandomInt(0, mouseX));
	}
}

function mouseClicked() {
	newRandomFreqs();
}

function updateAmps() {
	for (var i = 0; i < oscArray.length; i++) {
		mapped = map(mouseY, 0, window.height, 1 / oscArray.length, 0);
		oscArray[i].amp(mapped);
	}
	console.log(mapped);
	console.log("window height is: " + window.height);


}

function draw() {

	updateAmps();
	background(255);
	// console.log(osc.getAmp());


}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

