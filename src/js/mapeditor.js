// Map Editor by Brandon Trumpold
// Press B to toggle map editor on, you'll see a confirmation in the console once it's on
// To change tiles in and out, simply change out the right side of the equation worldGrid[mouseIndex] = whateverYouWantToChangeTileTo;
// After setting up the level to your liking, press V on your keyboard to save the world to your clipboard, then go to level.js and paste to update/add

function colRowToArrayIndex(col, row) {
	return col + (row * WORLD_COLS);
}

function placeTilesOnButtonPress() {
	mouseCol = Math.floor(mouseX / WORLD_W); // 35 is the tile width and height
	mouseRow = Math.floor(mouseY / WORLD_H);
	 // some reason it's selecting 2 rows down, subtracting the 2 rows for now due to crunch time
	mouseIndex = colRowToArrayIndex(mouseCol, mouseRow) - (WORLD_COLS * 2);


	if (keyHeld_C) {
		worldGrid[mouseIndex] = WORLD_BACKGROUND; // removes tile
	}

	if (keyHeld_1) {
		worldGrid[mouseIndex] = WORLD_BACKGROUND; // you can set this to any tile type located in the top of world.js
	}

	if (keyHeld_2) {
		worldGrid[mouseIndex] = DOUBLE_PLATFORM_LEFT_TOP;
	}

	if (keyHeld_3) {
		worldGrid[mouseIndex] = DOUBLE_PLATFORM_MIDDLE_TOP;
	}

	if (keyHeld_4) {
		worldGrid[mouseIndex] = DOUBLE_PLATFORM_RIGHT_TOP;
	}

	if (keyHeld_5) {
		worldGrid[mouseIndex] = DOUBLE_PLATFORM_LEFT_BOTTOM;
	}

	if (keyHeld_6) {
		worldGrid[mouseIndex] = DOUBLE_PLATFORM_MIDDLE_BOTTOM;
	}

	if (keyHeld_7) {
		worldGrid[mouseIndex] = DOUBLE_PLATFORM_RIGHT_BOTTOM;
	}

	if (keyHeld_8) {
		worldGrid[mouseIndex] = SINGLE_CENTER;
	}

	if (keyHeld_9) {
		worldGrid[mouseIndex] = SINGLE_PLATFORM_LEFT;
	}

	if (keyHeld_0) {
		worldGrid[mouseIndex] = SINGLE_PLATFORM_MIDDLE;
	}

	if (keyHeld_Minus) {
		worldGrid[mouseIndex] = SINGLE_PLATFORM_RIGHT;
	}

	if (keyHeld_Equal) {
		worldGrid[mouseIndex] = SLIME_PIT_MIDDLE_CENTER;
	}

	if (keyHeld_Q) {
		worldGrid[mouseIndex] = SLIME_PIT_LEFT_TOP;
	}

	if (keyHeld_W) {
		worldGrid[mouseIndex] = SLIME_PIT_MIDDLE_TOP;
	}

	if (keyHeld_E) {
		worldGrid[mouseIndex] = SLIME_PIT_RIGHT_TOP;
	}

	if (keyHeld_Y) {
		worldGrid[mouseIndex] = SLIME_PIT_LEFT_TOP_ANIM;
	}

	if (keyHeld_U) {
		worldGrid[mouseIndex] = SLIME_PIT_MIDDLE_TOP_ANIM;
	}

	if (keyHeld_I) {
		worldGrid[mouseIndex] = SLIME_PIT_RIGHT_TOP_ANIM;
	}

	if (keyHeld_O) {
		worldGrid[mouseIndex] = SLIME_PIT_LEFT_CENTER;
	}

	if (keyHeld_P) {
		worldGrid[mouseIndex] = SLIME_CEILING_RIGHT;
	}

	if (keyHeld_BracketLeft) {
		worldGrid[mouseIndex] = SLIME_CEILING_LEFT;
	}

	if (keyHeld_BracketRight) {
		worldGrid[mouseIndex] = SLIME_CEILING_MIDDLE;
	}

	if (keyHeld_A) {
		worldGrid[mouseIndex] = SLIME_PIT_RIGHT_CENTER;
	}

	if (keyHeld_S) {
		worldGrid[mouseIndex] = SLIME_PIT_LEFT_BOTTOM;
	}

	if (keyHeld_D) {
		worldGrid[mouseIndex] = SLIME_PIT_MIDDLE_BOTTOM;
	}

	if (keyHeld_F) {
		worldGrid[mouseIndex] = SLIME_PIT_RIGHT_BOTTOM;
	}

	if (keyHeld_H) {
		worldGrid[mouseIndex] = RED_TILE;
	}

	if (keyHeld_J) {
		worldGrid[mouseIndex] = GREEN_VINE_WEBS;
	}

	if (keyHeld_K) {
		worldGrid[mouseIndex] = WORLD_BACKGROUND_BROWN;
	}

	if (keyHeld_L) {
		worldGrid[mouseIndex] = THORNS;
	}

	if (keyHeld_Semicolon) {
		worldGrid[mouseIndex] = VINES_POISONOUS;
	}

	if (keyHeld_Quote) {
		worldGrid[mouseIndex] = PICKUP;
	}

	if (keyHeld_Num1) {
		worldGrid[mouseIndex] = BRICK_WITH_SLIME_1;
	}
	if (keyHeld_Num2) {
		worldGrid[mouseIndex] = BRICK_WITH_SLIME_2;
	}
	if (keyHeld_Num3) {
		worldGrid[mouseIndex] = BRICK_WITH_SLIME_3;
	}
	if (keyHeld_Num4) {
		worldGrid[mouseIndex] = BRICK_WITH_SLIME_4;
	}

}

const copyToClipboard = str => {
  var textElement = document.createElement('textarea');
  textElement.value = str;
  textElement.setAttribute('readonly', '');
  textElement.style.position = 'absolute';
  textElement.style.left = '-9999px';
  document.body.appendChild(textElement);
  textElement.select();
  document.execCommand('copy');
  document.body.removeChild(textElement);
};

function outputLevelToConsole() {
	var levelData = JSON.stringify(worldGrid);
	copyToClipboard(levelData);
}
