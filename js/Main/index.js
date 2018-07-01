var canvas, canvasContext;

var player = new playerClass();
var enemy = new playerClass();

var score;
var debug = false;

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
	player.reset(playerPic, "Player", 10);
	enemy.reset(enemyPic, "Enemy", 5);
	score = 0;
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


	canvasContext.drawImage(scrollBackground, 0, 0);




	canvasContext.save(); // needed to undo this .translate() used for scroll
	// this next line is like subtracting camPanX and camPanY from every
	// canvasContext draw operation up until we call canvasContext.restore
	// this way we can just draw them at their "actual" position coordinates
	
	canvasContext.translate(-camPanX, -camPanY);
	drawWorld();
	player.draw();

	// if (!enemy.remove) {
	// 	enemy.draw();
	// }

	if(debug){
		strokedRect(player.boundingBox.x,player.boundingBox.y,player.boundingBox.width,player.boundingBox.height, "2", "yellow"); 
		colorCircle(player.pos.x,player.pos.y, 2, "green");
	}
	

	canvasContext.restore();
	colorText(`Score : ${score}`,30 ,30, "yellow","30px Tahoma");
	colorText(`Health : ${player.health}` ,30 ,60, "yellow","30px Tahoma");
} 