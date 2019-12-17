let brain;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(1);
	brain = new Brain(8, 4);
	nodeRadius = windowHeight / 20;
	nodePadding = windowHeight / 15;
	visualizeX = 0;
	visualizeY = 0;
	visualizeWidth = windowWidth;
	visualizeHeight = windowHeight;
}

function draw() {
	console.log(brain.toString());
	background(225);
	brain.visualize(0, 0, windowWidth, windowHeight);
	if(frameCount == 2){
		brain.mutateAddConnection();
	} else if (frameCount == 3){
		brain.mutateAddNode();
	}
}
