var osc;

function setup() {
	osc = new p5.Oscillator();
	osc.setType('sine');
	osc.amp(0); // initialize with 0 amp
	osc.start();
	// osc.amp(0.1, 2); // go to amp 0.5 over 0.1 seconds
}

var goUp = true;

function mouseClicked() {
	// repick new note
	// osc.freq(getRandomInt(80, 800));

	if (goUp) 
		osc.amp(1, 1);
	else
		osc.amp(0, 1);
	goUp = !goUp;
}

function draw() {

	background(255);
	console.log(osc.getAmp());


}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

