const playerPic = document.createElement("img");
const enemyPic = document.createElement("img");
const playerJumpAnim = document.createElement("img");
const playerPunchAnim = document.createElement("img");
const playerWalkAnim = document.createElement("img");
const playerLeftJabAnim = document.createElement("img");
const scrollBackground = document.createElement("img");
const playerWalkJumpAnim = document.createElement("img");
const playerIdleJumpAnim = document.createElement("img");
const playerHighKickAnim = document.createElement("img");
const playerIdleAnim = document.createElement("img");
const playerCrouchAnim = document.createElement("img");
const playerDeadAnim = document.createElement("img");
const playerexplosiveFallAnim = document.createElement("img");
const playerHurtAnim = document.createElement("img");
const playerFlipAnim = document.createElement("img");
const playerRollAnim = document.createElement("img");
const playerCrouchedKickAnim = document.createElement("img");
const playerNormalKickAnim = document.createElement("img");
const playerUppercutAnim = document.createElement("img");
const slimeLeftBlobAnim = document.createElement("img");
const slimeMiddleBlobAnim = document.createElement("img");
const slimeRightBlobAnim = document.createElement("img");
const diamondPickupAnim = document.createElement("img");
const crateBox = document.createElement("img");
const flyingEnemyAnim = document.createElement("img");
const slickTileSet = document.createElement("img");
const platformTileSet = document.createElement("img");
const menuBackground = document.createElement("img");
const menuBackgroundEmpty = document.createElement("img");
const redKeyAnimation = document.createElement("img");
const greenKeyAnimation = document.createElement("img");
const blueKeyAnimation = document.createElement("img");
const venomDog = document.createElement("img");
const venomDogIdle = document.createElement("img");
const doorAnimationRed = document.createElement("img");
const doorAnimationBlue = document.createElement("img");
const doorAnimationGreen = document.createElement("img");
const goal = document.createElement("img");
const heartEmpty = document.createElement("img");
const heartHalf = document.createElement("img");
const heartFull = document.createElement("img");
const particlePic = document.createElement("img");

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
		{ varName: menuBackground, theFile: "menuImage.png" },
		{ varName: doorAnimationRed, theFile: "doorYellow.png" },
		{ varName: doorAnimationBlue, theFile: "doorBlue.png" },
		{ varName: doorAnimationGreen, theFile: "doorGreen.png" },

		{ varName: redKeyAnimation, theFile: "keyRed.png" },
		{ varName: greenKeyAnimation, theFile: "keyGreen.png" },
		{ varName: blueKeyAnimation, theFile: "keyBlue.png" },
		// { varName: venomDog, theFile: "venomDog2.png" },		
		// { varName: venomDogIdle, theFile: "venomDog2Idle.png" },	
		{ varName: goal, theFile: "goal.png" },
		{ varName: menuBackgroundEmpty, theFile: "menuBackgroundEmpty.png" },
		{ varName: heartEmpty, theFile: "EmptyHeart.png" },
		{ varName: heartHalf, theFile: "HalfHeart.png" },
		{ varName: heartFull, theFile: "Heart.png" },
		// { trackType: WORLD_GOAL, theFile: "goal.png" },
		// { trackType: WORLD_BACKGROUND, theFile: "background35.png" },
		// { trackType: WORLD_PLATFORM, theFile: "platform.png" },
		// { trackType: WORLD_HAZARD, theFile: "hazard.png" },
		// {trackType: WORLD_GOAL, theFile: "track_goal.png"}

		{ varName: particlePic, theFile: "particle.png" },

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
