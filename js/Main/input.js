

//For current movement.
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87; 


const KEY_A = 65; // Object 1
const KEY_S = 83; // Object 2
const KEY_D = 68; // Object 3
const KEY_M = 77; // For music
const KEY_Z = 90; // Attack
const KEY_X = 88; //Jump
const Key_C = 67; // Defend

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	// greenCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
	player.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
} 

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	// cheat / hack to test car in any position
	/*carX = mouseX;
	carY = mouseY;
	carSpeedX = 4;
	carSpeedY = -4;*/
}

function keySet(keyEvent, whichPlayer, setTo) {
	if(keyEvent.keyCode == whichPlayer.controlKeyLeft) {
		whichPlayer.keyHeld_Left = setTo;
	}
	if(keyEvent.keyCode == whichPlayer.controlKeyRight) {
		whichPlayer.keyHeld_Right = setTo;
	}
	if(keyEvent.keyCode == whichPlayer.controlKeyUp) {
		// if(whichCar.state['onGround']){
			whichPlayer.keyHeld_Up = setTo;
		// }
	}
	if(keyEvent.keyCode == whichPlayer.controlKeyDown) {
		whichPlayer.keyHeld_Down = setTo;
	}

}

function keyPressed(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	// keySet(evt, greenCar, true);
	keySet(evt, player, true);
	if(evt.keyCode == KEY_Z){
		player.setStateToFalse();
		player.setStateValueTo("isAttacking", true);
	}
	evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	// keySet(evt, greenCar, false);
	keySet(evt, player, false);

	if (evt.keyCode == KEY_M) {
		musicEnabled = !musicEnabled;
	}

	if(player.tickCount > 0){

		player.setStateToFalse();
		player.setStateValueTo("isIdle", true);
	}
}