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

//TODO : Make attacks more smooth
//TODO : COmbo moves
function setupInput() {
	// canvas.addEventListener('mousemove', updateMousePos);
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	// greenCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
	player.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_Z, KEY_X, KEY_C );
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
		whichPlayer.keyHeld_Attack = setTo;
		// if(setTo == false){
		// 	//Wait for attack to complete and then set attack state to false;
		// 	setTimeout(function(){},1000);
		// 	// This has a problem. I still need to take care of in the end frame test

		// }
	}
	if(keyEvent.keyCode == whichPlayer.controlKeyJump) {
		whichPlayer.keyHeld_Jump = setTo;
	}
	if(keyEvent.keyCode == whichPlayer.controlKeyDefend) {
		whichPlayer.keyHeld_Defend = setTo;
	}
}

// I want the animation to complete even if I release the button
function keyPressed(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, player, true);
	//Attack mode as soon as you press key 
	//Shouldn't work if kept pressed. 

	// if(evt.keyCode == KEY_Z && player.state.isAttacking == false){		
		
	// }
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
		  	if(windowState.credits){
		  		windowState.mainMenu = true;
		  		windowState.credits = false;
		  	}
		  	if(windowState.help){
		  		windowState.mainMenu = true;
		  		windowState.help = false;
		  	}
		  	if(windowState.sound){
		  		windowState.mainMenu = true;
		  		windowState.sound = false;
		  	}	
		  	break;	
	}
}