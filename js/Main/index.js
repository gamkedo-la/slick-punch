var canvas, canvasContext;

var player = new playerClass();
var enemy = new playerClass();

window.onload = function () {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0, 0, canvas.width, canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, 'white');

	loadImages();
	loadSounds();
}

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 60;
	setInterval(updateAll, 1000 / framesPerSecond);

	setupInput();

	loadLevel(levelOne);
}

function loadLevel(whichLevel) {
	worldGrid = whichLevel.slice();
	player.reset(playerPic, "Player");
	enemy.reset(enemyPic, "Enemy");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	cameraFollow();
	player.move();
	if (!enemy.remove) {
		enemy.move();
	}
	
	playBGM(currentLevel);

	
}

function drawAll() {
	canvasContext.save(); // needed to undo this .translate() used for scroll
	// this next line is like subtracting camPanX and camPanY from every
	// canvasContext draw operation up until we call canvasContext.restore
	// this way we can just draw them at their "actual" position coordinates

	canvasContext.translate(-camPanX, -camPanY);
	drawWorld();
	player.draw();
	if (!enemy.remove) {
		enemy.draw();
	}

	canvasContext.restore();
} 