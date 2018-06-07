var audioFormat;
var musicEnabled = true;
var firstSong;
var punchSound;
var jumpSound;
var kickSound;

function setFormat() {
	var audio = new Audio();

	if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
	} else {
		audioFormat = ".ogg";
	}
}

// This runs every frame, so it should play the song again once it ends.
// We can have multiple songs, and specify which levels we'd like those songs to play on.
function playBGM(whichLevel) {
	var whichSong;

	if (whichLevel == 1) {
		whichSong = firstSong;
		whichSong.volume = 0.8;
		whichSong.loop = true;
		whichSong.play();
	} else {
		console.log('audio for level not found! add song to playBGM, and make sure to increment currentLevel every time we get to the end of a level!');
	}

	if (musicEnabled == false) {
		whichSong.pause();
		whichSong.currentTime = 0;
	}
}

function playPunchSound() {
	punchSound.volume = 0.1;
	punchSound.play();
}

function playJumpSound() {
	jumpSound.volume = 0.5;
	jumpSound.play();
}

// When adding new audio, make sure to declare a variable at the top of the script
// Then add it here, and set the file name, the rest is easy!
function loadSounds() {
	setFormat();
	firstSong = new Audio("./sound/deepdark" + audioFormat);
	punchSound = new Audio("./sound/punch" + audioFormat);
	jumpSound = new Audio("./sound/jump" + audioFormat);
	kickSound = new Audio("./sound/kick" + audioFormat);
}