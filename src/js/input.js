const KEY_HELD_TIME_MAX = 15;
var keyHeld_Timer = KEY_HELD_TIME_MAX;

var keyHeld_Left = false; 
var keyHeld_Right = false;
var keyHeld_DashLeft = false; 
var keyHeld_DashRight = false;
var keyHeld_DashUp = false;
var keyHeld_Jump = false;
var keyHeld_Jump_Prev = false;
var keyHeld_Run = false;

var keyHeld_1 = false;
var keyHeld_2 = false;
var keyHeld_3 = false;
var keyHeld_4 = false;
var keyHeld_5 = false;
var keyHeld_6 = false;
var keyHeld_7 = false;
var keyHeld_8 = false;
var keyHeld_9 = false;
var keyHeld_0 = false;
var keyHeld_Minus = false;
var keyHeld_Equal = false;

var keyHeld_Q = false;
var keyHeld_W = false;
var keyHeld_E = false;
var keyHeld_R = false;
var keyHeld_T = false;
var keyHeld_Y = false;
var keyHeld_U = false;
var keyHeld_I = false;
var keyHeld_O = false;
var keyHeld_P = false;
var keyHeld_BracketLeft = false;
var keyHeld_BracketRight = false;

var keyHeld_A = false;
var keyHeld_S = false;
var keyHeld_D = false;
var keyHeld_F = false;
var keyHeld_G = false;
var keyHeld_H = false;
var keyHeld_J = false;
var keyHeld_K = false;
var keyHeld_L = false;
var keyHeld_Semicolon = false;
var keyHeld_Quote = false;

var keyHeld_Z = false;
var keyHeld_X = false;
var keyHeld_C = false;
var keyHeld_V = false;
var keyHeld_B = false;
var keyHeld_N = false;
var keyHeld_M = false;
var keyHeld_Comma = false;
var keyHeld_Period = false;
var keyHeld_Slash = false;

var keyHeld_ArrowUp = false;
var keyHeld_ArrowDown = false;
var keyHeld_ArrowLeft = false;
var keyHeld_ArrowRight = false;
var keyHeld_Enter = false;
var keyHeld_Space = false;
var keyHeld_Delete = false;

var keyHeld_Num1 = false;
var keyHeld_Num2 = false;
var keyHeld_Num3 = false;
var keyHeld_Num4 = false;
var keyHeld_Num5 = false;
var keyHeld_Num6 = false;
var keyHeld_Num7 = false;
var keyHeld_Num8 = false;
var keyHeld_Num9 = false;
var keyHeld_Num0 = false;
var keyHeld_Divide = false;
var keyHeld_Multiply = false;
var keyHeld_Subtract = false;
var keyHeld_Add = false;
var keyHeld_Decimal = false;
var keyHeld_Escape = false;

var mouseX = 0, mouseY = 0;
var clickWaiting = false;
var musicEnabled = true;

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

var mapEditorEnabled = false;

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
	setValuesForKey(evt, true);
}

function keyReleased(evt) {
	keySet(evt, player, false);
	setValuesForKey(evt, false);
	// if you want something to only be called once per key press, set
	// keyHeld_Timer to 0 (see KeyB for example)
	keyHeld_Timer = KEY_HELD_TIME_MAX; 
}

function setValuesForKey(evt, value) {
	// console.log("Key pressed: "+evt.keyCode);
	var keyUsedByGame = true;

	switch (evt.code) {

		case "Digit1":
			keyHeld_1 = value;
			break;
		case "Digit2":
			keyHeld_2 = value;
			break;
		case "Digit3":
			keyHeld_3 = value;
			break;
		case "Digit4":
			keyHeld_4 = value;
			break;
		case "Digit5":
			keyHeld_5 = value;
			break;
		case "Digit6":
			keyHeld_6 = value;
			break;
		case "Digit7":
			keyHeld_7 = value;
			break;
		case "Digit8":
			keyHeld_8 = value;
			break;
		case "Digit9":
			keyHeld_9 = value;
			break;
		case "Digit0":
			keyHeld_0 = value;
			break;
		case "Minus":
			keyHeld_Minus = value;
			break;
		case "Equal":
			keyHeld_Equal = value;
			break;

		case "KeyQ":
			keyHeld_Q = value;
			break;
		case "KeyW":
			keyHeld_W = value;
			break;
		case "KeyE":
			keyHeld_E = value;
			break;
		case "KeyR":
			keyHeld_R = value;
			break;
		case "KeyT":
			keyHeld_T = value;
			break;
		case "KeyY":
			keyHeld_Y = value;
			break;
		case "KeyU":
			keyHeld_U = value;
			break;
		case "KeyI":
			keyHeld_I = value;
			break;
		case "KeyO":
			debug = !debug;
			keyHeld_O = value;
			break;
		case "KeyP":
			if(windowState.mainMenu){
	  			startGame();
	  		}	
			keyHeld_P = value;
			break;
		case "BracketLeft":
			keyHeld_BracketLeft = value;
			break;
		case "BracketRight":
			keyHeld_BracketRight = value;
			break;

		case "KeyA":
			keyHeld_A = value;
			break;
		case "KeyS":
			if(windowState.mainMenu){
		  		setSoundSystem();
		  	}
			keyHeld_S = value;
			break;
		case "KeyD":
			musicEnabled = !musicEnabled;
			keyHeld_D = value;
			break;
		case "KeyF":
			keyHeld_F = value;
			break;
		case "KeyG":
			keyHeld_G = value;
			break;
		case "KeyH":
			if(windowState.mainMenu){
	  			openHelp();
	  		}
			keyHeld_H = value;
			break;
		case "KeyJ":
			keyHeld_J = value;
			break;
		case "KeyK":
			keyHeld_K = value;
			break;
		case "KeyL":
			keyHeld_L = value;
			break;
		case "Semicolon":
			keyHeld_Semicolon = value;
			break;
		case "Quote":
			keyHeld_Quote = value;
			break;


		case "KeyZ":
			keyHeld_Z = value;
			break;
		case "KeyX":
			keyHeld_X = value;
			break;
		case "KeyC":
			if(windowState.mainMenu){
		  		openCredits();
		  	}
			keyHeld_C = value;
			break;
		case "KeyV":
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				outputLevelToConsole();
				console.log("Level saved to clipboard, go add to level.js!");
			}
			keyHeld_V = value;
			break;
		case "KeyB":
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				mapEditorEnabled = !mapEditorEnabled;
				if (mapEditorEnabled) {
					console.log('Map Editor Enabled');
				} else {
					console.log('Map Editor Disabled');
				}
			}
			
			keyHeld_B = value;
			break;
		case "KeyN":
			keyHeld_N = value;
			break;
		case "KeyM":
			musicEnabled = !musicEnabled;
			keyHeld_M = value;
			break;
		case "Comma":
			keyHeld_Comma = value;
			break;
		case "Period":
			keyHeld_Period = value;
			break;
		case "Slash":
			keyHeld_Slash = value;
			break;


		case "ArrowUp":
			keyHeld_ArrowUp = value;
			break;
		case "ArrowDown":
			keyHeld_ArrowDown = value;
			break;
		case "ArrowLeft":
			keyHeld_ArrowLeft = value;
			break;
		case "ArrowRight":
			keyHeld_ArrowRight = value;
			break;
		case "Enter":
			menuBack();	
			keyHeld_Enter = value;
			break;
		case "Space":
			keyHeld_Space = value;
			break;
		case "Delete":
			keyHeld_Delete = value;
			break;

		case "Numpad1":
			keyHeld_Num1 = value;
			break;
		case "Numpad2":
			keyHeld_Num2 = value;
			break;
		case "Numpad3":
			keyHeld_Num3 = value;
			break;
		case "Numpad4":
			keyHeld_Num4 = value;
			break;
		case "Numpad5":
			keyHeld_Num5 = value;
			break;
		case "Numpad6":
			keyHeld_Num6 = value;
			break;
		case "Numpad7":
			keyHeld_Num7 = value;
			break;
		case "Numpad8":
			keyHeld_Num8 = value;
			break;
		case "Numpad9":
			keyHeld_Num9 = value;
			break;
		case "Numpad0":
			keyHeld_Num0 = value;
			break;
		case "NumpadDivide":
			keyHeld_Divide = value;
			break;
		case "NumpadMultiply":
			keyHeld_Multiply = value;
			break;
		case "NumpadSubtract":
			keyHeld_Subtract = value;
			break;
		case "NumpadAdd":
			keyHeld_Add = value;
			break;
		case "NumpadDecimal":
			keyHeld_Decimal = value;
			break;
		case "Escape":
			pause = !pause;
            if(pause) {
            	slickPunchJamMusic.pauseSound();
            } else {
            	slickPunchJamMusic.startOrStopMusic();
            }
			keyHeld_Escape = value;
			break;

		default : 
			keyUsedByGame = false;
			break;
	}

	// If you hit a key combination that is not used by the game, it will work on your browser
	if (keyUsedByGame) {
		evt.preventDefault();
	}

	/*
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
<<<<<<< HEAD
      case KEY_ESC:
          pause=!pause;
          if(pause)
          slickPunchJamMusic.pauseSound();
          else
          slickPunchJamMusic.startOrStopMusic();  
          break;
	}
=======
        case KEY_ESC:
            pause=!pause;
            if(pause)
            slickPunchJamMusic.pauseSound();
            else
            slickPunchJamMusic.startOrStopMusic();  
            break;
	}*/
// >>>>>>> 21fc25eac9bc25ef137091b8c08160a9212581d1
}