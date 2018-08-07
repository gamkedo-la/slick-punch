//Sounds
const punchSound = new SoundOverlapsClass("punch");
const kickSound = new SoundOverlapsClass("kick");
const jumpSound = new SoundOverlapsClass("jump");
const enemyDieSound = new SoundOverlapsClass("enemy_die");
const enemyAttackSound = new SoundOverlapsClass("enemy_attack");
const enemyHitSound = new SoundOverlapsClass("enemy_hit");
const enemyHurtSound = new SoundOverlapsClass("enemy_hurt");
const healthBoostSound = new SoundOverlapsClass("health_boost");
const landOnGroundSound = new SoundOverlapsClass("land_on_ground");
const playerKeySound = new SoundOverlapsClass("player_coin");
const playerDieSound = new SoundOverlapsClass("player_die");
const playerHitSound = new SoundOverlapsClass("player_hit");
const scorePickupSound = new SoundOverlapsClass("score_pickup");
const strangeEnemySound = new SoundOverlapsClass("strange_enemy");
//Background Music
const deepdarkMusic = new backgroundMusicClass("deep_dark");
const dilseMusic = new backgroundMusicClass("dilse_house");
const fightingBossMusic = new backgroundMusicClass("fighting_boss2");
const gameOverMusic = new backgroundMusicClass("game_over");
const overDueGameMusic = new backgroundMusicClass("overdue_gameover");
const slickPunchJamMusic = new backgroundMusicClass("slickpunch_jam");
const slickPunchJam2Music = new backgroundMusicClass("slickpunch_jam2");
let audioFormat = "";
let currentBackgroundMusic;
// let soundVolume = document.getElementById('soundVolume').defaultValue;
// let musicVolume = document.getElementById('musicVolume').defaultValue;

let musicVolume = 1;
let soundVolume = 0.5;


function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
        audioFormat = ".mp3";
    } else {
        audioFormat = ".ogg";
    }
}

function backgroundMusicClass(filename) {

    let musicSound = null;

    this.loopSong = function() {
        setFormat(); // calling this to ensure that audioFormat is set before needed

        if (musicSound != null) {
            musicSound.pause();
            musicSound = null;
        }
        musicSound = new Audio("./src/audio/music/" + audioFormat.slice(1, audioFormat.length) + "/"  + filename + audioFormat);
        musicSound.volume = musicVolume;
        musicSound.loop = true;
        musicSound.play();
    }

    this.pauseSound = function() {
        if (musicSound != null) {
          musicSound.pause();
        }
    }

    this.isPlaying = function(){
        return !musicSound.paused;
    }

    this.startOrStopMusic = function() {
        if (musicSound.paused) {
            musicSound.play();
        } else {
            musicSound.pause();
        }
    }
}

function SoundOverlapsClass(filename) {
    setFormat();

    var altSoundTurn = false;
    var mainSound = new Audio("./src/audio/sounds/" + audioFormat.slice(1, audioFormat.length) + "/"  + filename + audioFormat);
    var altSound = new Audio("./src/audio/sounds/" + audioFormat.slice(1, audioFormat.length) + "/"  + filename + audioFormat);

    this.play = function() {
        if (altSoundTurn) {
            altSound.currentTime = 0;
            altSound.volume = soundVolume;
            altSound.play();
        } else {
            mainSound.currentTime = 0;
            mainSound.volume = soundVolume;
            mainSound.play();
        }

        this.altSoundTurn = !this.altSoundTurn; //toggling between true and false
    }
}

function getRandomVolume(){
	var min = 0.3;
	var max = 0.6;
	var randomVolume = Math.random() * (max - min) + min;
	return randomVolume.toFixed(2);
}

function updateSoundMusicLevel(){
  soundVolume = document.getElementById('soundVolume').value;
  musicVolume = document.getElementById('musicVolume').value;
  menuMusic.pauseSound();
  menuMusic.loopSong();
}
