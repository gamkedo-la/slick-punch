var audioFormat;
var musicEnabled = true;
var firstSong;
var punchSound;
var jumpSound;
var kickSound;
let arrayOfBackgroundSongs = ["./sound/deepdark", "./sound/Dilse house", "./sound/slickPunchJam", "./sound/slickPunchJam2"];
function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadAndPlayNewBackgroundSong() {
	randomBackgroundSongArrayIndex = getRandomInt(0,arrayOfBackgroundSongs.length - 1);
	randomSong = arrayOfBackgroundSongs[randomBackgroundSongArrayIndex];

	whichSong.src = randomSong + audioFormat;
	whichSong.volume = 0.8;
	whichSong.loop = true;
	whichSong.play();

	if (musicEnabled == false) {
		whichSong.pause();
		whichSong.currentTime = 0;
	}
}


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


function playPunchSound() {
	punchSound.volume = 0.1;
	punchSound.play();
}

function playJumpSound() {
	jumpSound.volume = 0.5;
	jumpSound.play();
}

// function playLandSound() {
// 	jumpSound.volume = 0.5;
// 	jumpSound.play();
// }

// function playHitSound() {
// 	jumpSound.volume = 0.5;
// 	jumpSound.play();
// }

// When adding new audio, make sure to declare a variable at the top of the script
// Then add it here, and set the file name, the rest is easy!
function loadSounds() {
	setFormat();
	firstSong = new Audio("./src/sound/deepdark" + audioFormat);
	punchSound = new Audio("./src/sound/punch" + audioFormat);
	jumpSound = new Audio("./src/sound/jump" + audioFormat);
	kickSound = new Audio("./src/sound/Kick" + audioFormat);
}
