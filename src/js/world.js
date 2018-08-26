
//Convert all constant to enum
const WORLD_W = 35;
const WORLD_H = 35;
// const WORLD_W = 50;
// const WORLD_H = 50;
const WORLD_COLS = 23;
const WORLD_ROWS = 15;
var tileCollisionRect; // Used for displaying currently colliding rect
// Used for frame animation. Update to more optimized format
var frameRow = 0;
var worldGrid = [];
var currentLevel = 1; // This needs to get incremented every time a level is completed
var enemiesAliveInLevel = 0;

const WORLD_BACKGROUND = -1;
const DOUBLE_PLATFORM_LEFT_TOP = 0;
const DOUBLE_PLATFORM_MIDDLE_TOP = 1;
const DOUBLE_PLATFORM_RIGHT_TOP = 2;
const DOUBLE_PLATFORM_LEFT_BOTTOM = 3;
const DOUBLE_PLATFORM_MIDDLE_BOTTOM = 7;
const DOUBLE_PLATFORM_RIGHT_BOTTOM = 5;
const SINGLE_CENTER = 4;
const SINGLE_PLATFORM_LEFT = 6;
const SINGLE_PLATFORM_MIDDLE = 7;
const SINGLE_PLATFORM_RIGHT = 8;
// TILE_BOUNDARY_1 does not support collision check
const TILE_BOUNDARY_1 = 9;
const TILE_BOUNDARY_2 = 10;
const TILE_BOUNDARY_3 = 11;
const TILE_BOUNDARY_4 = 12;
const TILE_BOUNDARY_5 = 13;
const TILE_BOUNDARY_6 = 14;
const SLIME_PIT_LEFT_TOP = 15;
const SLIME_PIT_MIDDLE_TOP = 16;
const SLIME_PIT_RIGHT_TOP = 17;
const SLIME_PIT_LEFT_TOP_ANIM = -15;
const SLIME_PIT_MIDDLE_TOP_ANIM = -16;
const SLIME_PIT_RIGHT_TOP_ANIM = -17;
const SLIME_PIT_LEFT_CENTER = 18;
const SLIME_PIT_MIDDLE_CENTER = 19;
const SLIME_PIT_RIGHT_CENTER = 20;
const SLIME_PIT_LEFT_BOTTOM = 21;
const SLIME_PIT_MIDDLE_BOTTOM = 22;
const SLIME_PIT_RIGHT_BOTTOM = 23;
const RED_TILE = 24;
const GREEN_VINE_WEBS = 25;
const WORLD_BACKGROUND_BROWN = 26;
const THORNS = 27;
const VINES_POISONOUS = 28;
// const EMPTY_SPACE = 29 //empty spot in the tile set, add yours here and to slickTileset2!
const SLIME_CEILING_LEFT = 29;
const SLIME_CEILING_MIDDLE = 30;
const SLIME_CEILING_RIGHT = 31;
const PICKUP = 32;
const DOOR_RED = 33;
const DOOR_GREEN = 34;
const DOOR_BLUE = 35;
const DOOR_LOWER = 36;
const KEY_RED = 37;
const KEY_GREEN = 38;
const KEY_BLUE = 39;
const PLATFORM_RIGHT = 40;
const PLATFORM_LEFT = 41;
const PLATFORM_UP = 42;
const PLATFORM_DOWN = 43;
const PLATFORM_DESTINATION = 49;
const DEATH_ZONE = 50;
const BRICK_WITH_SLIME_1 = 51;
const BRICK_WITH_SLIME_2 = 52;
const BRICK_WITH_SLIME_3 = 53;
const BRICK_WITH_SLIME_4 = 54;
var PLATFORM_SPEEDS = [];
PLATFORM_SPEEDS[PLATFORM_RIGHT] = vector.create(1, 0);
PLATFORM_SPEEDS[PLATFORM_LEFT] = vector.create(-1, 0);
PLATFORM_SPEEDS[PLATFORM_UP] = vector.create(0, -1);
PLATFORM_SPEEDS[PLATFORM_DOWN] = vector.create(0, 1);
// const WORLD_PLATFORM = 1;
const WORLD_PLAYERSTART = -2;
const WORLD_ENEMY_DUMB_START = -3;
const WORLD_ENEMY_DUMB_DEST = -6;
const WORLD_GOAL = -7;
const WORLD_FLYING_ENEMY = -5;
const WORLD_VENOM_DOG = -8;
const CRATE = -9;
const SLIME_DRIP = -10;
const PLAYER_CHECKPOINT = -11;
const INDICATOR_CHECKPOINT = -12;

const slimeLeftBlobSprite = new SpriteSheetClass(slimeLeftBlobAnim, WORLD_W, WORLD_H, true, 8, 5); // 8 frames, 5 ticks
const slimeMiddleBlobSprite = new SpriteSheetClass(slimeMiddleBlobAnim, WORLD_W, WORLD_H, true, 8, 20); // 8 frames
const slimeRightBlobSprite = new SpriteSheetClass(slimeRightBlobAnim, WORLD_W, WORLD_H, true, 8, 5); // 8 frames, 5 ticks
const diamondSprite = new SpriteSheetClass(diamondPickupAnim, WORLD_W / 2, WORLD_H / 2, true, 2, 18); // 2 frames, 18 ticks
const redKeySprite = new SpriteSheetClass(redKeyAnimation, 32, 32, true, 2, 18); // 2 frames, 18 ticks
const greenKeySprite = new SpriteSheetClass(greenKeyAnimation, 32, 32, true, 2, 18); // 2 frames, 18 ticks
const blueKeySprite = new SpriteSheetClass(blueKeyAnimation, 32, 32, true, 2, 18); // 2 frames, 18 ticks
/*const blueKeySprite = new SpriteSheetClass(blueKeyAnimation, 32, 32, true, 2, 60); // 2 frames, 60 ticks*/ // same as above?

function intializeCollidableObjects() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	itemArr = []; // emptying array before filling in
	for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = worldGrid[arrayIndex];

			// spawn dangerous tiles
			if (tileHarms(tileKindHere) || isPickable(tileKindHere) || tileIsDoor(tileKindHere)) {
				itemArr.push(new ItemClass(drawTileX,
					drawTileY,
					WORLD_W,
					WORLD_H,
					tileKindHere,
					arrayIndex
				));
			}

			// spawn enemies
			if (tileKindHere == WORLD_VENOM_DOG) {
				console.log('spawning a venom dog!');
				var venomDog = new venomDogClass(drawTileX, drawTileY);
				venomDog.init(venomDogIdle, "Venom Dog"); // so it gets remembered in entityList[]
				venomDog.changeState('isPatrolling');
			} else if (tileKindHere == WORLD_FLYING_ENEMY) {
				console.log('spawning a flying enemy!');
				var flyingEnemy = new flyingEnemyClass(drawTileX, drawTileY);
				flyingEnemy.spriteAnim = flyingEnemy.flyingAnim;
				flyingEnemy.init(flyingEnemyAnim, "Flying Enemy"); // so it gets remembered in entityList[]
			} else if (tileKindHere == WORLD_ENEMY_DUMB_START) {
				console.log("spawning a zombie");
				var dumbEnemy1 = new dumbEnemyClass(drawTileX, drawTileY);
				dumbEnemy1.init(dumbEnemyWalkAnim, "Dumb Enemy");
			}

			drawTileX += WORLD_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	}

	enemiesAliveInLevel = 0;
	for (var i = entityList.length-1; i >= 0; i--) { // need to iterate backwards if ever splicing from it
		if (entityList[i].removeMe == false  && entityList[i].name != "Player" && entityList[i].state[DEAD] == false) {
			enemiesAliveInLevel++;
		}
	}
}

function returnAnimatedTileSprites(tileKindHere) {
	switch (tileKindHere) {
		case SLIME_PIT_LEFT_TOP_ANIM:
			return slimeLeftBlobSprite;
		case SLIME_PIT_MIDDLE_TOP_ANIM:
			return slimeMiddleBlobSprite;
		case SLIME_PIT_RIGHT_TOP_ANIM:
			return slimeRightBlobSprite;
		case KEY_RED:
			return redKeySprite;
		case KEY_GREEN:
			return greenKeySprite;
		case KEY_BLUE:
			return blueKeySprite;
		case PICKUP:
			return diamondSprite;
		case PICKUP:
			return diamondSprite;
	}
}

function returnTileTypeAtColRow(col, row) {
	if (col >= 0 && col < WORLD_COLS &&
		row >= 0 && row < WORLD_ROWS) {
		var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		return worldGrid[trackIndexUnderCoord];
	} else {
		console.log("TileHere is" + worldGrid[rowColToArrayIndex(col, row)]);
	}
}

function tileHarms(tile) {
	return (tile == SLIME_PIT_LEFT_TOP ||
		tile == SLIME_PIT_MIDDLE_TOP ||
		tile == SLIME_PIT_RIGHT_TOP ||
		tile == SLIME_PIT_LEFT_TOP_ANIM ||
		tile == SLIME_PIT_MIDDLE_TOP_ANIM ||
		tile == SLIME_PIT_RIGHT_TOP_ANIM ||
		tile == SLIME_PIT_LEFT_CENTER ||
		tile == SLIME_PIT_MIDDLE_CENTER ||
		tile == SLIME_PIT_RIGHT_CENTER ||
		tile == SLIME_PIT_LEFT_BOTTOM ||
		tile == SLIME_PIT_MIDDLE_BOTTOM ||
		tile == SLIME_PIT_LEFT_TOP ||
		tile == SLIME_PIT_RIGHT_BOTTOM ||
		tile == RED_TILE ||
		tile == GREEN_VINE_WEBS ||
		tile == THORNS ||
		tile == VINES_POISONOUS)
}

function tileIsDoor(tile) {
	return (tile == DOOR_BLUE ||
		tile == DOOR_GREEN ||
		tile == DOOR_RED ||
		tile == DOOR_LOWER);
}

function rowColToArrayIndex(col, row) {
	return col + WORLD_COLS * row;
}

function tileVisible(tx, ty) {
	//console.log("tileVisible "+tx+","+ty+" must be inside " + camPanX+","+camPanY+" and "+camPanX+canvas.width+","+camPanY+canvas.height);
	return (
		(tx >= camPanX - WORLD_W) &&
		(ty >= camPanY - WORLD_H) &&
		(tx <= camPanX + canvas.width) &&
		(ty <= camPanY + canvas.height));
}

function drawWorld() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;

	for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = worldGrid[arrayIndex];
			//converting to see what this tile kind here index means
			//Used for TIleset
			var tilesetRow = tileKindHere > 0 ? Math.floor(tileKindHere / 3) : 0;
			var tilesetCol = tileKindHere > 0 ? Math.floor(tileKindHere % 3) : 0; //Here 3 is columns in tileset

			if (tileKindHere != WORLD_BACKGROUND && tileKindHere != WORLD_ENEMY_DUMB_DEST && tileKindHere != PLAYER_CHECKPOINT) {
				if (isTileAnimated(tileKindHere)) {
					var animatedTile = returnAnimatedTileSprites(tileKindHere);
					animatedTile.update();
					animatedTile.draw(animatedTile.frameIndex, frameRow, drawTileX + WORLD_W / 2, drawTileY + WORLD_H / 2, false, false);
				}
				else {
					if (tileKindHere == WORLD_GOAL) {
						canvasContext.drawImage(goal, drawTileX, drawTileY);
					}
					if (tileKindHere == DOOR_BLUE) {
						canvasContext.drawImage(doorBlue, drawTileX, drawTileY);
					}
					if (tileKindHere == DOOR_GREEN) {
						canvasContext.drawImage(doorGreen, drawTileX, drawTileY);
					}
					if (tileKindHere == DOOR_RED) {
						canvasContext.drawImage(doorRed, drawTileX, drawTileY);
					}
					if (tileKindHere == DOOR_LOWER) {
						canvasContext.drawImage(doorLower, drawTileX, drawTileY);
					}
					if (tileKindHere == DEATH_ZONE) {
						canvasContext.drawImage(deathZone, drawTileX, drawTileY);
					}
					if (tileKindHere == INDICATOR_CHECKPOINT) {
						canvasContext.drawImage(checkpointIndicPic, drawTileX, drawTileY);
					}
					if (tileKindHere == BRICK_WITH_SLIME_1) {
						canvasContext.drawImage(brickWithSlime1, drawTileX, drawTileY);
					}
					if (tileKindHere == BRICK_WITH_SLIME_2) {
						canvasContext.drawImage(brickWithSlime2, drawTileX, drawTileY);
					}
					if (tileKindHere == BRICK_WITH_SLIME_3) {
						canvasContext.drawImage(brickWithSlime3, drawTileX, drawTileY);
					}
					if (tileKindHere == BRICK_WITH_SLIME_4) {
						canvasContext.drawImage(brickWithSlime4, drawTileX, drawTileY);
					}
					else {
						canvasContext.drawImage(slickTileSet,
							tilesetCol * WORLD_W, tilesetRow * WORLD_H, // top-left corner of tile art, multiple of tile width for clipped image
							WORLD_W, WORLD_H, // get full tile size from source
							drawTileX, drawTileY, // x,y top-left corner for image destination
							WORLD_W, WORLD_H); // stretch or shrink coordinates
					}

				}
			}

			drawTileX += WORLD_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	} // end of for each row
} // end of drawWorld func

function placeEntityOnWorldTileType(whichEntity, tileTypeToCheck) {
	whichEntity.pos = findCenterPositionOfTileType(tileTypeToCheck);
	setTileAtPositionToType(whichEntity.pos, WORLD_BACKGROUND);
}

function findCenterPositionOfTileType(tileTypeToCheck) {
	var tileCenterPosition = vector.create(0, 0);
	var arrayIndex = 0;
	for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
			if (worldGrid[arrayIndex] == tileTypeToCheck) {
				tileCenterPosition.x = eachCol * WORLD_W + WORLD_W / 2;
				tileCenterPosition.y = eachRow * WORLD_H + WORLD_H / 2;
				return tileCenterPosition;
			} // end of player start if
			arrayIndex++
		} // end of col for
	} // end of row for
	console.log("NO TILE FOUND, type: (" + tileTypeToCheck + ")");
}

function setTileAtPositionToType(position, newType) {
	// assumes valid position
	var arrayIndex = positionToIndex(position);
	worldGrid[arrayIndex] = newType;
}

function isTileAnimated(tile) {
	return (
		tile == SLIME_PIT_LEFT_TOP_ANIM ||
		tile == SLIME_PIT_MIDDLE_TOP_ANIM ||
		tile == SLIME_PIT_RIGHT_TOP_ANIM ||
		tile == PICKUP ||
		tile == KEY_RED ||
		tile == KEY_BLUE ||
		tile == KEY_GREEN
	);

}

function isPlatformAtPixelCoord(hitPixelX, hitPixelY) {
	var tileCol = hitPixelX / WORLD_W;
	var tileRow = hitPixelY / WORLD_H;
	// using Math.floor to round down to the nearest whole number
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	if (tileCol >= 0 && tileCol <= WORLD_COLS &&
		tileRow >= 0 && tileRow <= WORLD_ROWS) {

		var tileIndex = rowColToArrayIndex(tileCol, tileRow);
		var tileHere = worldGrid[tileIndex];
		return istileCollidable(tileHere);
	}
}

//Just add any tile you don't want to act as collidable
function istileCollidable(tile) {
	return (
		tile != WORLD_BACKGROUND &&
		tile != PICKUP &&
		tile != WORLD_ENEMY_DUMB_DEST &&
		tile != KEY_RED &&
		tile != KEY_BLUE &&
		tile != KEY_GREEN &&
		tile != DEATH_ZONE &&
		tile != INDICATOR_CHECKPOINT &&
		tile != PLAYER_CHECKPOINT &&
		tile != PLATFORM_DESTINATION
	);
}

function isPickable(tile) {
	return (
		tile == PICKUP ||
		tile == KEY_RED ||
		tile == KEY_BLUE ||
		tile == KEY_GREEN
	);
}
