const GROUND_FRICTION = 0.7;
const AIR_RESISTANCE = 0.975;
const RUN_SPEED = 3.0;
const JUMP_POWER = 8;
const DOUBLE_JUMP_POWER = 12; // we need more force to counteract gravity in air
const GRAVITY = 0.55;
const MAX_AIR_JUMPS = 1; // double jump

function playerClass() {
	this.pos = vector.create(75, 75);
	this.speed = vector.create(0, 0);

	this.playerPic; // which picture to use
	this.name = "Player Character";
	this.health = 5;

	this.state = {
		'isOnGround': true,
		'isIdle': true,
		'isWalking': false,
		'isMovingLeft': false,
		'isCrouching': false,
		'isFacingUp': false,
		'isAttacking': false,
		'isDefending': false,
		
	};

	this.radius = 35;
	this.width = 80;
	this.height = 80;
	this.ang = 0;
	this.health = 0;
	this.removeMe = false;

	this.tickCount = 0;
	this.ticksPerFrame = 5;
	this.spriteAnim = null;
	this.framesAnim = null;

	this.keyHeld_Right = false;
	this.keyHeld_Left = false;
	this.keyHeld_Down = false;
	this.keyHeld_Up = false;
	this.keyHeld_Up_lastframe = false; // don't jump >1x per keypress

	this.controlKeyRight = null;
	this.controlKeyLeft = null;
	this.controlKeyUp = null;
	this.controlKeyDown = null;


	// Animation generation. 
	this.walkSprite = new SpriteSheetClass(playerWalkAnim, this.width, this.height); // 10 frames
	this.punchSprite = new SpriteSheetClass(playerPunchAnim, this.width, this.height); //7frames
	this.idleAnim = new SpriteSheetClass(playerIdleAnim, this.width, this.height); //7 frames
	this.idleJumpAnim = new SpriteSheetClass(playerIdleJumpAnim, this.width, this.height); //6 frames
	this.leftJabAni = new SpriteSheetClass(playerLeftJabAnim, this.width, this.height); //7 frames
	this.walkJumpAnim = new SpriteSheetClass(playerWalkJumpAnim, this.width, this.height); //5 frames
	this.highKickAnim = new SpriteSheetClass(playerHighKickAnim, this.width, this.height); //6 frames
	this.crouchAnim = new SpriteSheetClass(playerCrouchAnim, this.width, this.height); //4 frames

	this.frameRow = 0;
	this.justPunched = false;
	this.justJumped = false;
	this.justKicked = false;

	this.doubleJumpCount = 0;

	// this.speed = RUN_SPEED;
	this.incrementTick = function () {

		this.tickCount++;

		if (this.tickCount / this.ticksPerFrame >= this.framesAnim) {
			this.tickCount = 0;
			if (this.state.isAttacking) {
				this.state.isAttacking = false; //play punching animation once per click punch btn
			}
		}
	};

	//sets all values of state object to false
	this.setStateToFalse = function (){
		for(key in this.state){
			this.state[key] = false;
		}
	};

	//sets value of given key pf state object to value passed
	this.setStateValueTo = function (key, val){
		if(this.state.hasOwnProperty(key)){
			// console.log("Setting" + key + ":" + val);
			this.state[key] = val;
		}
	};


	this.setupInput = function (upKey, rightKey, downKey, leftKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}

	this.takeDamage = function (howMuch) {
		console.log("Damage received: " + howMuch);
		this.health -= howMuch;
		if (this.health <= 0) {
			console.log("PLAYER HAS 0 HP - todo: gameover/respawn");
		}
	}

	this.reset = function (whichImage, playerName, health) {
		this.name = playerName;
		this.playerPic = whichImage;
		this.health = health;
		this.doubleJumpCount = 0;

		for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
			for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if (worldGrid[arrayIndex] == WORLD_PLAYERSTART) {
					worldGrid[arrayIndex] = WORLD_BACKGROUND;
					// this.ang = -Math.PI/2;
					this.pos.x = eachCol * WORLD_W + WORLD_W / 2;
					this.pos.y = eachRow * WORLD_H + WORLD_H / 2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");
	} // end of playerReset func

	this.move = function () {

		if (this.state['isOnGround']) {

			this.speed.x *= GROUND_FRICTION;
			this.doubleJumpCount = 0;

		} 

		else { // in the air
			this.speed.x *= AIR_RESISTANCE;
			this.speed.y += GRAVITY;

			if (this.speed.y > this.radius) { // cheap test to ensure can't fall through floor
				this.speed.y = this.radius;
			}
		}

		if (this.keyHeld_Left) {
			//this.setStateToFalse(); //setting every value of object to false; // might be buggy
			this.setStateValueTo("isWalking", true);
			this.setStateValueTo("isMovingLeft", true);
			this.speed.x = -RUN_SPEED;
		}

		else if (this.keyHeld_Right) {
			//this.setStateToFalse();
			this.setStateValueTo("isWalking", true);
			this.setStateValueTo("isMovingLeft", false);
			this.speed.x = RUN_SPEED;
		}

		else {
			// this.setStateToFalse();
			this.setStateValueTo("isIdle", true);
		}

		if (this.keyHeld_Up && !this.keyHeld_Up_lastframe) {
			// this.setStateToFalse();
			this.keyHeld_Up_lastframe = true;

			if (this.state['isOnGround']) { // regular jump
				//console.log("Normal Jump!");
				this.speed.y -= JUMP_POWER;
				// this.setStateToFalse();
				this.setStateValueTo("isOnGround", false);
			}
			else if (this.doubleJumpCount < MAX_AIR_JUMPS) { // in the air?
				//console.log("Double Jump!");
				this.speed.y -= DOUBLE_JUMP_POWER;
				this.doubleJumpCount++;
				// this.setStateToFalse();

				this.setStateValueTo("isOnGround", false);
			} else {
				//console.log("Ignoring triple jump...");
			}
		}

		// avoid multiple jumps from the same keypress
		this.keyHeld_Up_lastframe = this.keyHeld_Up;

		 if (this.justJumped == false) {
		 	playJumpSound();
		 }

		if (this.state.isAttacking) {
			this.state.isIdle = false;
			this.state.isWalking = false;
			if (this.name == "Player") {
				if (distance(enemy.pos.x, enemy.pos.y, this.pos.x, this.pos.y) < 30) {
					enemy.remove = true;
				}
			}
			if (this.justPunched == false) {
				playPunchSound();
			}
		}

		// We need to set "justPunched", so that we do not play the punch sound every frame
		if (!this.state.isAttacking) {
			this.justPunched = false;
		} else {
			this.justPunched = true;
		}

		if (this.state['isOnGround']) {
			this.justJumped = false;
		} 
		else {
			this.justJumped = true;
		}

		if (this.speed.y < 0 && isPlatformAtPixelCoord(this.pos.x, this.pos.y - this.radius) == 1) {
			this.pos.y = (Math.floor(this.pos.y / WORLD_H)) * WORLD_H + this.radius;
			this.speed.y = 0.0;
		}

		if (this.speed.y > 0 && isPlatformAtPixelCoord(this.pos.x, this.pos.y + this.radius) == 1) {
			this.pos.y = (1 + Math.floor(this.pos.y / WORLD_H)) * WORLD_H - this.radius;
			this.setStateValueTo("isOnGround", true);
			this.speed.y = 0;
		}
		else if (isPlatformAtPixelCoord(this.pos.x, this.pos.y + this.radius + 2) == 0) {
			this.setStateValueTo("isOnGround", false);
		}
		if (this.speed.x < 0 && isPlatformAtPixelCoord(this.pos.x - this.radius, this.pos.y) == 1) {
			this.pos.x = (Math.floor(this.pos.x / WORLD_W)) * WORLD_W + this.radius;
		}
		if (this.speed.x > 0 && isPlatformAtPixelCoord(this.pos.x + this.radius, this.pos.y) == 1) {
			this.pos.x = (1 + Math.floor(this.pos.x / WORLD_W)) * WORLD_W - this.radius;
		}


		this.pos.addTo(this.speed) // same as above, but for vertical
		playerWorldHandling(this);
		this.incrementTick();
	} // end of player.move function

	this.draw = function () {

		//TODO : Each animation should take atmost 1 sec to complete. 
		//TODO : Clean all code. 

		if (this.state['isIdle']) {
			this.spriteAnim = this.idleAnim;
			this.framesAnim = 7;
		}
	
		if (this.state['isWalking']) {
			this.spriteAnim = this.walkSprite;
			this.framesAnim = 10;
		}

		if (this.state['isAttacking']) {
			this.spriteAnim = this.punchSprite;
			this.framesAnim = 4;
			// this.spriteAnim.draw(Math.floor(this.tickCount / this.ticksPerFrame), this.frameRow, this.pos.x, this.pos.y, this.ang, this.state.movingLeft);
		}

		//Jump Animation
		// if (!this.state['isOnGround']) {
		// 	this.spriteAnim = this.idleJumpAnim;
		// 	this.framesAnim = 6;
		// 	// this.spriteAnim.draw(Math.floor(this.tickCount / this.ticksPerFrame), this.frameRow, this.pos.x, this.pos.y, this.ang, this.state.movingLeft);
		// }


		//final drawing of sprite.
		if (this.spriteAnim !=null) {
			this.spriteAnim.draw(Math.floor(this.tickCount / this.ticksPerFrame), this.frameRow, this.pos.x, this.pos.y, this.ang, this.state.isMovingLeft);
		}

		

	}
}

function isPlatformAtPixelCoord(hitPixelX, hitPixelY) {
	var tileCol = hitPixelX / WORLD_W;
	var tileRow = hitPixelY / WORLD_H;

	// using Math.floor to round down to the nearest whole number
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	// first check whether the jumper is within any part of the brick wall
	if (tileCol < 0 || tileCol >= WORLD_COLS ||
		tileRow < 0 || tileRow >= WORLD_ROWS) {
		return false;
	}

	var brickIndex = rowColToArrayIndex(tileCol, tileRow);
	return (worldGrid[brickIndex] >= 0);
}


