// Player Movement
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38; 
const KEY_RIGHT_ARROW = 39; 
const KEY_DOWN_ARROW = 40; 
const KEY_Z = 90; 
const KEY_X = 88;
// Toggle music
const KEY_M = 77; 
// Toggle Debug
const KEY_D = 68;
// Used for menu Screen
const KEY_C = 67;
const KEY_H = 72;
const KEY_O = 79;
const KEY_P = 80;
const KEY_S = 83;
const KEY_ENTER = 13;
const KEY_ESC = 27;

var mouseX = 0, mouseY = 0;
var clickWaiting = false;
var musicEnabled = true;

//TODO : Make attacks more smooth
//TODO : COmbo moves
function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('mousedown', catchMouseInput);
	canvas.addEventListener('mouseup', releaseMouseInput);
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	// greenCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
	player.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_Z, KEY_X);
} 

function catchMouseInput() {
	clickWaiting = true;
}
function releaseMouseInput() {
	clickWaiting = false;
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();

    // account for the margins, canvas position on page, scroll amount, etc.
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
}

function keySet(keyEvent, whichPlayer, setTo) {
	if(keyEvent.keyCode == whichPlayer.controlKeyLeft) {
		whichPlayer.keyHeld_Left = setTo;
	}
	if(keyEvent.keyCode == whichPlayer.controlKeyRight) {
		whichPlayer.keyHeld_Right = setTo;
	}
	if(keyEvent.keyCode == whichPlayer.controlKeyUp) {
		whichPlayer.keyHeld_Up = setTo;
	}
	if(keyEvent.keyCode == whichPlayer.controlKeyDown) {
		// console.log("setting" + whichPlayer.keyHeld_Down + "to : " + setTo);
		whichPlayer.keyHeld_Down = setTo;
	}
	if(keyEvent.keyCode == whichPlayer.controlKeyAttack) {
    // if attack is being played. Wait for it to be completed.
		whichPlayer.keyHeld_Attack = setTo;
	}
	if(keyEvent.keyCode == whichPlayer.controlKeyJump) {
		whichPlayer.keyHeld_Jump = setTo;
	}
}

// I want the animation to complete even if I release the button
function keyPressed(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, player, true);
	evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, player, false);
	switch(evt.keyCode){
		case KEY_M:
			musicEnabled = !musicEnabled;
			break;
		case KEY_D:
			musicEnabled = !musicEnabled;
			break;
		case KEY_O:
			debug = !debug;
			break;
		case KEY_C:
			if(windowState.mainMenu){
		  			openCredits();
		  	}
		  	break;
		case KEY_H:
			if(windowState.mainMenu){
	  			openHelp();
	  		}
	  		break;
	  	case KEY_P:
	  		if(windowState.mainMenu){
	  			startGame();
	  		}	
	  		break;
	  	case KEY_S:
	  		if(windowState.mainMenu){
		  		setSoundSystem();
		  	}
	  		break;
	  	case KEY_ENTER:
		  	menuBack();	
		  	break;
        case KEY_ESC:
            pause=!pause;
            if(pause)
            slickPunchJamMusic.pauseSound();
            else
            slickPunchJamMusic.startOrStopMusic();  
            break;
	}
}