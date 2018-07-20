var canvas, canvasContext;
var player = new playerClass();
var enemy = new dumbEnemyClass();
var flyingEnemies = []; // an array of flyingEnemy
var score;
var debug = false;
var enemyObjArr = [];
var gameRunning = false;
//Might be redundant
var timeStarted;
var timeStartedActive;
var timeElapsedInSeconds = 0;
var frameCount = 0;

window.onload = function () {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, 'white');
	loadImages();
	loadSounds();
	mainMenu.initialize();
};

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 60;
	setInterval(updateAll, 1000 / framesPerSecond);
	setupInput();
	loadLevel(levelOne);
}

function spawnFlyingEnemies() {
	flyingEnemies = [];
	console.log("Spawning flying enemies...");
	// spawn flying enemies by scanning the level data
	var spawnCounter = 0;
	for (var px, py, eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			if (worldGrid[arrayIndex] == WORLD_FLYING_ENEMY) {
				worldGrid[arrayIndex] = WORLD_BACKGROUND;
				spawnCounter++;
				px = eachCol * WORLD_W + WORLD_W / 2;
				py = eachRow * WORLD_H + WORLD_H / 2;
				flyingEnemies.push(new flyingEnemyClass(px, py));
			}
		}
	}
	console.log("Flying enemies spawned: " + spawnCounter);
}

function loadLevel(whichLevel) {
	worldGrid = whichLevel.slice();
	platformList.parseWorld();
	player.reset(playerPic, "Player", 3);
	enemy.reset(enemyPic, "dumb Enemy", 5);
	score = 0;
	spawnFlyingEnemies();
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	if(gameRunning){
		cameraFollow();
		player.move();
		enemy.move();

		if (!enemy.remove) {
			enemy.move();
		}
		for (var num = 0; num < flyingEnemies.length; num++) {
			flyingEnemies[num].move();
		}
		playBGM(currentLevel);
		platformList.update();
	}
}

function drawAll() {
	 if (!gameRunning) {
        mainMenuStates();
    } else {
		canvasContext.drawImage(scrollBackground, 0, 0);
		canvasContext.save(); // needed to undo this .translate() used for scroll
		// this next line is like subtracting camPanX and camPanY from every
		// canvasContext draw operation up until we call canvasContext.restore
		// this way we can just draw them at their "actual" position coordinates
		canvasContext.translate(-camPanX, -camPanY);
		drawWorld();
		platformList.draw();
		player.draw();
		enemy.draw();
		// if (!enemy.remove) {
		// 	enemy.draw();
		// }
		for (var num = 0; num < flyingEnemies.length; num++) {
			flyingEnemies[num].draw();
		}
		if (debug) {
			strokedRect(player.boundingBox.x, player.boundingBox.y, player.boundingBox.width, player.boundingBox.height, "2", "yellow");
			colorCircle(player.pos.x, player.pos.y, 2, "green");
			if (tileCollisionRect != undefined) {
				strokedRect(tileCollisionRect.x, tileCollisionRect.y, tileCollisionRect.width, tileCollisionRect.height, "2", "green");
			}
			// for(int i = 0 ; i < enemyObjArr.length; i++ ){
			// 	console.log("hey");
			// 	// strokedRect(enemyObjArr[i].x, enemyObjArr[i].y, enemyObjArr[i].width, enemyObjArr[i].height, "2", "red"); 
			// }
		}
		canvasContext.restore();
		drawUI();
	}
} 

function startGame() {
    windowState.help = false;
    windowState.mainMenu = false;
    timeStarted = new Date().getTime();
    timeStartedActive = timeStarted;
    timeElapsedInSeconds = 0;
    frameCount = 0;
    gameRunning = true;
}
