var playerPic = document.createElement("img");
var enemyPic = document.createElement("img");
var playerJumpAnim = document.createElement("img");
var playerPunchAnim = document.createElement("img");
var playerWalkAnim = document.createElement("img");

var trackPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: playerPic, theFile: "player.png"},
		{varName: enemyPic, theFile: "enemy.png"},
		{varName: playerJumpAnim, theFile: "playerDuck.png"},
		{varName: playerPunchAnim, theFile: "playerPunch.png"},
		{varName: playerWalkAnim, theFile: "playerWalk.png"},
		
		{trackType: WORLD_GOAL, theFile: "goal.png"},
		{trackType: WORLD_BACKGROUND, theFile: "background.png"},
		{trackType: WORLD_PLATFORM, theFile: "platform.png"},
		{trackType: WORLD_PLATFORM, theFile: "platform.png"},

	

		// {trackType: WORLD_GOAL, theFile: "track_goal.png"}

	];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
		}
	}
}