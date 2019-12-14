let brain;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(1);
	brain = new Brain(8, 4);
}

function draw() {
	console.log(brain.toString());
	background(225);
	brain.visualize(0, 0, windowWidth, windowHeight);
}
