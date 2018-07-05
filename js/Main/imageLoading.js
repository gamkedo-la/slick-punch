var playerPic = document.createElement("img");
var enemyPic = document.createElement("img");

var playerJumpAnim = document.createElement("img");
var playerPunchAnim = document.createElement("img");
var playerWalkAnim = document.createElement("img");
var playerLeftJabAnim = document.createElement("img");
var scrollBackground = document.createElement("img");
var playerWalkJumpAnim = document.createElement("img");
var playerIdleJumpAnim = document.createElement("img");
var playerHighKickAnim = document.createElement("img");
var playerIdleAnim = document.createElement("img");
var playerCrouchAnim = document.createElement("img");
var playerDeadAnim = document.createElement("img");
var playerexplosiveFallAnim = document.createElement("img"); //playerExplosiveFall.png'
var playerHurtAnim = document.createElement("img"); //playerHurtsheet.png'
var playerFlipAnim = document.createElement("img"); //playerJumpFlip.png'
var playerRollAnim = document.createElement("img"); //playerRollsheet.png
var playerCrouchedKickAnim = document.createElement("img"); //playerCrouchedKicksheet.png
var playerNormalKickAnim = document.createElement("img"); //playerNormalKick.png
var playerUppercutAnim = document.createElement("img"); //playerUppercutSheet.png

var slimeLeftBlobAnim = document.createElement("img");
var slimeMiddleBlobAnim = document.createElement("img");
var slimeRightBlobAnim = document.createElement("img");


var diamondPickupAnim = document.createElement("img"); //pickup.png'
var crateBox = document.createElement("img"); //crate.png'
var flyingEnemyAnim = document.createElement("img"); //flyingEnemy.png'

var slickTileSet = document.createElement("img");
var platformTileSet = document.createElement("img");

var trackPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady(f) {
	picsToLoad--;
	console.log(picsToLoad, f);
	if (picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady.bind(this, fileName);
	imgVar.src = "images/" + fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
	var imageList = [
		{ varName: playerPic, theFile: "player.png" },
		{ varName: enemyPic, theFile: "enemy.png" },
		{ varName: playerPunchAnim, theFile: "playerPunchsheet.png" },
		{ varName: playerWalkAnim, theFile: "playerWalksheet.png" },
		{ varName: slickTileSet, theFile: "slickTileset2.png" },
		{ varName: platformTileSet, theFile: "platformTileSet.png" },
		{ varName: playerLeftJabAnim, theFile: "playerLeftJabsheet.png" },
		{ varName: playerWalkJumpAnim, theFile: "playerWalkJumpsheet.png" },
		{ varName: playerIdleAnim, theFile: "playerIdlesheet.png" },
		{ varName: playerIdleJumpAnim, theFile: "playerIdleJumpsheet.png" },
		{ varName: playerHighKickAnim, theFile: "playerHighKicksheet.png" },
		{ varName: playerCrouchAnim, theFile: "playerCrouchSheet.png" },


		{ varName: playerexplosiveFallAnim, theFile: "playerExplosiveFall.png" },
		{ varName: playerHurtAnim, theFile: "playerHurtsheet.png" },
		{ varName: playerFlipAnim, theFile: "playerJumpFlip.png" },
		{ varName: playerDeadAnim, theFile: "playerDeadsheet.png" },
		{ varName: playerRollAnim, theFile: "playerRollsheet.png" },
		{ varName: playerCrouchedKickAnim, theFile: "playerCrouchedKicksheet.png" },
		{ varName: playerNormalKickAnim, theFile: "playerNormalKick.png" },
		{ varName: playerUppercutAnim, theFile: "playerUppercutsheet.png" },
		{ varName: diamondPickupAnim, theFile: "pickup.png" },
		{ varName: crateBox, theFile: "crate.png" },
		{ varName: flyingEnemyAnim, theFile: "flyingEnemy.png" },
		{ varName: slimeLeftBlobAnim, theFile: "slimeLeftBloop.png" },
		{ varName: slimeMiddleBlobAnim, theFile: "slimeMiddleBloop.png" },
		{ varName: slimeRightBlobAnim, theFile: "slimeRightBloop.png" },


		{ varName: scrollBackground, theFile: "background.png" },
		// { trackType: WORLD_GOAL, theFile: "goal.png" },
		{ trackType: WORLD_BACKGROUND, theFile: "background35.png" },
		// { trackType: WORLD_PLATFORM, theFile: "platform.png" },
		// { trackType: WORLD_HAZARD, theFile: "hazard.png" },
		// {trackType: WORLD_GOAL, theFile: "track_goal.png"}

	];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
		}
	}
}
