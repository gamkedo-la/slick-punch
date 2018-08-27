var canvas, canvasContext;
var player = new playerClass();
// var venomDog;
var box = new boxClass();
// var slimeDrip = new slimeDripClass();
window.player = player;

const WIN_EDGE_X = 790; // walking past this x counts as advancing to next area

var score;
var debug = false;
var gameRunning = false;
var timeLimit = 30; //Level time limit in seconds. Set high for now to avoid running out of time while testing.
var timeRemaining;
//Might be redundant
var timeStarted;
var timeStartedActive;
var timeElapsedInSeconds = 0;
var frameCount = 0;
const FRAMES_PER_SECOND = 60;

var pause = false;
var winScreen = false;

window.onload = function () {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, 'white');
	loadImages();
	deepdarkMusic.loopSong();
	mainMenu.initialize();
};

function imageLoadingDoneSoStartGame() {
	setupInput();
	loadLevel();
	setInterval(updateAll, 1000 / FRAMES_PER_SECOND);
}

function loadLevel() {
	worldGrid = levelSet[currentLevel].slice();
	/* // overrode start pos, commented since 1 screen levels didn't need checkpoints
	if (player_checkpoint_index != -1) {
		worldGrid[worldGrid.indexOf(WORLD_PLAYERSTART)] = -1;
		worldGrid[player_checkpoint_index] = WORLD_PLAYERSTART;
	} */
	platformList.parseWorld();
	entityList = [];
	player.init(playerPic, "Player");
	
	// venomDog.init(venomDogIdle, "Venom Dog");
	box.init(crateBoxPic, "Box");
	// slimeDrip.init(slimeBallDripAnim, "Slime Drip");
	//slimeBall.init(crateBoxPic, "Box");
	intializeCollidableObjects();
	score = 0;
	timeRemaining = timeLimit;
}

function updateAll() {
	if(winScreen) {
		colorRect(0,0,canvas.width,canvas.height,"#444444");

		frameCount++; // since skipping draw timer it otherwise sits still
		// but we'll use the above to cycle animations on this screen
		var slowerFrameTick = Math.floor(frameCount/5);

		var bossW = 130, bossH = 154;
		var bossFrames = 11;
		var bossFrame = slowerFrameTick%bossFrames;
        canvasContext.drawImage(bossAnim,
                                 bossW*bossFrame, 0,
                                 bossW, bossH,
                                 canvas.width/2-bossW/2, canvas.height/2,
                                 bossW, bossH);

		var ogreW = 80, ogreH = 80;
		var ogreWalkFrames = 4;
		var ogreAttackFrames = 6;
		var ogreWalkFrame = slowerFrameTick%ogreWalkFrames;
		var ogreAttackFrame = slowerFrameTick%ogreAttackFrames;

	    canvasContext.drawImage(ogreWalkAnim,
                             ogreW*ogreWalkFrame, 0,
                             ogreW, ogreH,
                             canvas.width/4-ogreW/2, canvas.height/2,
                             ogreW, ogreH);

   		canvasContext.drawImage(ogreAttackAnim,
                             ogreW*ogreAttackFrame, 0,
                             ogreW, ogreH,
                             canvas.width*3/4-ogreW/2, canvas.height/2,
                             ogreW, ogreH);

		colorText("To be continued...",canvas.width/2,40,"white",
			"30px Arial",'center',1);
		colorText("Congratulations! You reached the Battle Mage and his Ogres!",canvas.width/2,80,"white",
			"20px Arial",'center',1);
		colorText("Thank you for playing. Click to reset.",canvas.width/2,canvas.height-30,"white",
			"20px Arial",'center',1);
	} else if (!pause) {
		moveAll();
		drawAll();
		particles.update();

		if(gameRunning && currentLevel == 0) {
			for(var i=0;i<helpText.length;i++) {
				colorText(helpText[i],50+2,140+i*25+2,"black",
					"25px Arial",'left',1);
				colorText(helpText[i],50 ,140+i*25,"white",
					"25px Arial",'left',1);
			}
		}

	} else {
		drawAll();
		colorText("- P A U S E D -",canvas.width/2+2,canvas.height/2+2,"black",
			"30px Arial",'center',1);
		colorText("- P A U S E D -",canvas.width/2,canvas.height/2,"white",
			"30px Arial",'center',1);
	}
}

function moveAll() {
	if (gameRunning) {
		if (mapEditorEnabled) {
			placeTilesOnButtonPress();
		}
		cameraFollow();

		var enemiesAlive = 0;
		for (var i = entityList.length-1; i >= 0; i--) { // need to iterate backwards if ever splicing from it
			if (entityList[i].removeMe) {
				entityList.splice(i, 1);
			} else if(entityList[i].recentlyDamaged > 0) {
				entityList[i].recentlyDamaged--; // cool off to avoid constant damage
			}
		}

	    for(var i = 0; i < entityList.length; i++){
	      if(entityList[i].name != "Player" &&
	      	entityList[i].name !=  "Slime Drip" &&
	      	entityList[i].name !=  "Box" &&
	      		entityList[i].state[DEAD] == false) {
	        enemiesAlive++;
	      }
	      entityList[i].move();
	    }
		platformList.update();
		updateItemList();
		if(player.pos.x > WIN_EDGE_X || // walked off right edge to next area?
			(enemiesAlive == 0 && enemiesAliveInLevel > 0)) { // there are enemies and all are defeated?
			nextLevelOrWin();
		}
	}
}

function nextLevelOrWin() {
	currentLevel++;
	if(currentLevel < levelSet.length) {
		loadLevel(levelSet[currentLevel]);
	} else {
		enterWinScreen();
	}
}

function enterWinScreen() {
	winScreen = true;
	slickPunchJamMusic.pauseSound();
	dilseMusic.loopSong();
}

function backToTitleScreen() {
	if(player.state.isDead == false) {
		slickPunchJamMusic.pauseSound();
		deepdarkMusic.loopSong();
	}

	player.resetOrSetNonLoopingAnim(); // resets death or other non-looping anims
	winScreen = false;
	windowState.mainMenu = true;
	gameRunning = false;
	pause = false;
	currentLevel = 0;
	loadLevel(); // see level.js
}

function doneWithWinScreen() {
	dilseMusic.pauseSound();
	slickPunchJamMusic.loopSong();

	backToTitleScreen();
}

function drawAll() {
	if (!gameRunning) {
		mainMenuStates();
	}
	else {
		canvasContext.drawImage(scrollBackground, 0, 0);
		canvasContext.save(); // needed to undo this .translate() used for scroll
		// this next line is like subtracting camPanX and camPanY from every
		// canvasContext draw operation up until we call canvasContext.restore
		// this way we can just draw them at their "actual" position coordinates
		canvasContext.translate(-camPanX, -camPanY);
		drawWorld();
		platformList.draw();
		//player.draw();
		// enemy.draw();
		// if (!enemy.remove) {
		// 	enemy.draw();
		// }
		for (var i = 0; i < entityList.length; i++) {
			entityList[i].draw();
		}

		if (debug) {
			// strokedRect(player.boundingBox.x, player.boundingBox.y, player.boundingBox.width, player.boundingBox.height, "2", "yellow");
			colorCircle(player.pos.x, player.pos.y, 2, "green");
			if (tileCollisionRect != undefined) {
				strokedRect(tileCollisionRect.x, tileCollisionRect.y, tileCollisionRect.width, tileCollisionRect.height, "2", "green");
			}
      for (var i = 0; i < entityList.length; i++) {
        boundingBox = entityList[i].boundingBox;
        strokedRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height, "2", "blue");
      }
			for (var i = 0; i < itemArr.length; i++) {
				boundingBox = itemArr[i].boundingBox;
				strokedRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height, "2", "blue");
			}
		}
		canvasContext.restore();
		drawUI();
		particles.draw();
	}
}

function startGame() {
	windowState.help = false;
	windowState.mainMenu = false;
	// timeRemaining = timeLimit;
	// timeStarted = new Date().getTime();
	// timeStartedActive = timeStarted;
	// timeElapsedInSeconds = 0;
	frameCount = 0;
	gameRunning = true;
	if(gameOverMusic.isPlaying) {
		gameOverMusic.pauseSound();
	}
	if(deepdarkMusic.isPlaying) {
		deepdarkMusic.pauseSound();
	}
	slickPunchJamMusic.loopSong();
	// loadAndPlayNewBackgroundSong();
	// console.log(whichSong.src);
}
