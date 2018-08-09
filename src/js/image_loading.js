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
const crateBoxAnim = document.createElement("img");
const flyingEnemyAnim = document.createElement("img");
const slickTileSet = document.createElement("img");
const platformTileSet = document.createElement("img");
const menuBackground = document.createElement("img");
const menuBackgroundEmpty = document.createElement("img");
const redKeyAnimation = document.createElement("img");
const greenKeyAnimation = document.createElement("img");
const blueKeyAnimation = document.createElement("img");
const venomDogPic = document.createElement("img");
const venomDogIdle = document.createElement("img");
const doorRed = document.createElement("img");
const doorBlue = document.createElement("img");
const doorGreen = document.createElement("img");
const goal = document.createElement("img");
const heartEmpty = document.createElement("img");
const heartHalf = document.createElement("img");
const heartFull = document.createElement("img");
const particlePic = document.createElement("img");
const dumbEnemyWalkAnim = document.createElement("img");
const dumbEnemyAttackAnim = document.createElement("img");
const doorLower = document.createElement("img");

var imageList = [];

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
	imgVar.src = "src/images/" + fileName;
  
  if(tileHarms(tileKindHere) || isPickable(tileKindHere)){
      for(var i = 0; i < imageList.length; i++){
          ObjectArr.push(new ObjectClass(tilesetCol * WORLD_W, 
                                     tilesetRow * WORLD_H,
                                     WORLD_W,
                                     WORLD_H,
                                     tileKindHere
                                    ));
      }
  }
}

function loadImageForTrackCode(trackCode, fileName) {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
	imageList = [
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
		{ varName: diamondPickupAnim, theFile: "pickup.png", width: 35, height: 35 },
		{ varName: crateBox, theFile: "crate.png", width: 35, height: 35},
		{ varName: crateBoxAnim, theFile: "crateAnim.png", width: 35, height: 35 },
		{ varName: flyingEnemyAnim, theFile: "flyingEnemy.png", width: 35, height: 35 },
		{ varName: slimeLeftBlobAnim, theFile: "slimeLeftBloop.png", width: 35, height: 35 },
		{ varName: slimeMiddleBlobAnim, theFile: "slimeMiddleBloop.png", width: 35, height: 35 },
		{ varName: slimeRightBlobAnim, theFile: "slimeRightBloop.png", width: 35, height: 35 },
		{ varName: scrollBackground, theFile: "background.png", width: 35, height: 35 },
		{ varName: menuBackground, theFile: "menuImage.png", width: 35, height: 35 },
		{ varName: doorRed, theFile: "doorYellow.png", width: 35, height: 35 },
		{ varName: doorBlue, theFile: "doorBlue.png", width: 35, height: 35 },
		{ varName: doorGreen, theFile: "doorGreen.png", width: 35, height: 35 },
    { varName: doorLower, theFile: "doorLower.png", width: 35, height: 35 },
    { varName: dumbEnemyWalkAnim, theFile: "enemyWalkSprite.png", width: 35, height: 35 },
    { varName: dumbEnemyAttackAnim, theFile: "enemyPunchSprite.png", width: 35, height: 35 },
		{ varName: redKeyAnimation, theFile: "keyRed.png", width: 35, height: 35 },
		{ varName: greenKeyAnimation, theFile: "keyGreen.png", width: 35, height: 35 },
		{ varName: blueKeyAnimation, theFile: "keyBlue.png", width: 35, height: 35 },
		{ varName: venomDogPic, theFile: "venomDog2.png", width: 35, height: 35 },		
		{ varName: venomDogIdle, theFile: "venomDog2Idle.png", width: 35, height: 35 },	
		{ varName: goal, theFile: "goal.png", width: 35, height: 35 },
		{ varName: menuBackgroundEmpty, theFile: "menuBackgroundEmpty.png", width: 35, height: 35 },
		{ varName: heartEmpty, theFile: "EmptyHeart.png", width: 35, height: 35 },
		{ varName: heartHalf, theFile: "HalfHeart.png", width: 35, height: 35 },
		{ varName: heartFull, theFile: "Heart.png", width: 35, height: 35 },
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
		} 
	}
}
