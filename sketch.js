let population; let test; let output;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(1);
	population = new Population(8, 4);
	test = [0.1, .5, .75, .2, .23, .98, .75, .384];
}

function draw() {
	background(100);
	population.visualize();
}
