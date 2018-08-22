const playerPic = document.createElement("img");
const enemyPic = document.createElement("img");
const playerJumpAnim = document.createElement("img");
const playerPunchAnim = document.createElement("img");
const playerWalkAnim = document.createElement("img");
const playerLeftJabAnim = document.createElement("img");
const scrollBackground = document.createElement("img");
const scrollBackground2 = document.createElement("img");
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
const slimeBallPic = document.createElement("img");
const slimeBallDripAnim = document.createElement("img");
const slimeLeftBlobAnim = document.createElement("img");
const slimeMiddleBlobAnim = document.createElement("img");
const slimeRightBlobAnim = document.createElement("img");
const diamondPickupAnim = document.createElement("img");
const crateBoxPic = document.createElement("img");
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
const doorLower = document.createElement("img");
const goal = document.createElement("img");
const heartEmpty = document.createElement("img");
const heartHalf = document.createElement("img");
const heartFull = document.createElement("img");
const particlePic = document.createElement("img");
const dumbEnemyWalkAnim = document.createElement("img");
const dumbEnemyAttackAnim = document.createElement("img");
const deathZone = document.createElement("img");
const checkpointIndicPic = document.createElement("img");

var imageList = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady(f) {
	picsToLoad--;
	console.log(picsToLoad, f);
	if (picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

var iii = 46;
function beginLoadingImage(imgObj) {
	console.log('start', iii--, imgObj.theFile);
	imgObj.varName.onload = countLoadedImagesAndLaunchIfReady.bind(this, imgObj.theFile);
	imgObj.varName.src = "src/images/" + imgObj.theFile;

}

function loadImageForTrackCode(trackCode, fileName) {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
	imageList = [
    //Still frames
		{ varName: playerPic, theFile: "player.png" },
		{ varName: enemyPic, theFile: "enemy.png" },
    //player SpriteSheet
		{ varName: playerPunchAnim, theFile: "playerPunchsheet2.png" },
		{ varName: playerWalkAnim, theFile: "playerWalksheet.png" },
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
    //Flying enemy
    { varName: flyingEnemyAnim, theFile: "flyingEnemy.png", width: 35, height: 35, tileKindHere: 1 },
    //Tilesheet
    { varName: platformTileSet, theFile: "platformTileSet.png" },
    { varName: slickTileSet, theFile: "slickTileset2.png" },
    { varName: deathZone, theFile: "deathZone.png" },

    //Destroyable Objects
    { varName: diamondPickupAnim, theFile: "pickup.png", width: 35, height: 35},
    { varName: crateBoxPic, theFile: "crate.png", width: 35, height: 35},
    { varName: crateBoxAnim, theFile: "crateAnim.png", width: 35, height: 35},
	   //Slime animation
		{ varName: slimeLeftBlobAnim, theFile: "slimeLeftBloop.png", width: 35, height: 35},
		{ varName: slimeMiddleBlobAnim, theFile: "slimeMiddleBloop.png", width: 35, height: 35 },
		{ varName: slimeRightBlobAnim, theFile: "slimeRightBloop.png", width: 35, height: 35},
		{ varName: slimeBallPic, theFile: "slimeball.png", width: 35, height: 35 },
		{ varName: slimeBallDripAnim, theFile: "slimedrip.png", width: 35, height: 35},
		//Doors
		{ varName: doorRed, theFile: "doorRed.png", width: 35, height: 35},
		{ varName: doorBlue, theFile: "doorBlue.png", width: 35, height: 35},
		{ varName: doorGreen, theFile: "doorGreen.png", width: 35, height: 35},
    { varName: doorLower, theFile: "doorLower.png", width: 35, height: 35},
    //Keys Animtaion
		{ varName: redKeyAnimation, theFile: "KeyRed.png", width: 35, height: 35},
		{ varName: greenKeyAnimation, theFile: "KeyGreen.png", width: 35, height: 35},
		{ varName: blueKeyAnimation, theFile: "KeyBlue.png", width: 35, height: 35},
    //Dumb Enemy animation
    { varName: dumbEnemyWalkAnim, theFile: "enemyWalkSprite.png" },
    { varName: dumbEnemyAttackAnim, theFile: "enemyPunchSprite.png" },
    //Venom Dog animation
		{ varName: venomDogPic, theFile: "venomdog2.png", width: 35, height: 35},
		{ varName: venomDogIdle, theFile: "venomdog2Idle.png", width: 35, height: 35},
    //goal
		{ varName: goal, theFile: "goal.png", width: 35, height: 35},
    //MenuBackground
    { varName: scrollBackground, theFile: "background.png", width: 35, height: 35},
		{ varName: scrollBackground2, theFile: "arenal.png", width: 35, height: 35},
    { varName: menuBackground, theFile: "menuImage.png", width: 35, height: 35},
		{ varName: menuBackgroundEmpty, theFile: "menuBackgroundEmpty.png", width: 35, height: 35},
		//Heart images
    { varName: heartEmpty, theFile: "EmptyHeart.png", width: 35, height: 35},
		{ varName: heartHalf, theFile: "HalfHeart.png", width: 35, height: 35 },
		{ varName: heartFull, theFile: "Heart.png", width: 35, height: 35 },
		// { trackType: WORLD_GOAL, theFile: "goal.png" },
		// { trackType: WORLD_BACKGROUND, theFile: "background35.png" },
		// { trackType: WORLD_PLATFORM, theFile: "platform.png" },
		// { trackType: WORLD_HAZARD, theFile: "hazard.png" },
		// {trackType: WORLD_GOAL, theFile: "track_goal.png"}
		{ varName: particlePic, theFile: "particle.png" },
    { varName: checkpointIndicPic, theFile: "boneSprite.png" },
];
	picsToLoad = imageList.length;
	console.log('to load:', picsToLoad);

	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i]);
		}
	}
}
