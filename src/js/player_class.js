function playerClass() {

  Object.getPrototypeOf(playerClass.prototype).constructor.call(this);

	//Tracking input keys to player movement
	this.keyHeld_Right = false;
	this.keyHeld_Left = false;
	this.keyHeld_Down = false;
	this.keyHeld_Up = false;
	this.keyHeld_Attack = false;
	this.keyHeld_Jump = false;
	this.keyHeld_Defend = false;
  this.attackPower = PLAYER_ATTACK_POWER;

	// don't jump >1x per keypress
	this.keyHeld_Up_lastframe = false;
	//Control keys for player
	this.controlKeyRight = null;
	this.controlKeyLeft = null;
	this.controlKeyUp = null;
	this.controlKeyDown = null;
	this.controlKeyAttack = null;
	this.controlKeyJump = null;
	this.controlKeyDefend = null;

	// Animation generation. 
	this.walkAnim = new SpriteSheetClass(playerWalkAnim, this.width, this.height, true, 10); // 10 frames
	this.punchAnim = new SpriteSheetClass(playerPunchAnim, this.width, this.height, false, 4); //4frames
	this.idleAnim = new SpriteSheetClass(playerIdleAnim, this.width, this.height, true, 7); //7 frames
	this.idleJumpAnim = new SpriteSheetClass(playerIdleJumpAnim, this.width, this.height, true, 5); //6 frames
	this.leftJabAnim = new SpriteSheetClass(playerLeftJabAnim, this.width, this.height, true, 7); //7 frames
	this.walkJumpAnim = new SpriteSheetClass(playerWalkJumpAnim, this.width, this.height, true, 5); //5 frames
	this.highKickAnim = new SpriteSheetClass(playerHighKickAnim, this.width, this.height, true, 6); //6 frames
	this.crouchAnim = new SpriteSheetClass(playerCrouchAnim, this.width, this.height, false, 4, 4); //4 frames
	this.explosiveFallAnim = new SpriteSheetClass(playerIdleJumpAnim, this.width, this.height, true, 8); //8 frames
	this.hurtAnim = new SpriteSheetClass(playerHurtAnim, this.width, this.height, true, 3, 8); //3 frames
	this.FlipAnim = new SpriteSheetClass(playerFlipAnim, this.width, this.height, true, 5); //5 frames
	this.rollAnim = new SpriteSheetClass(playerRollAnim, this.width, this.height, true, 7); //7 frames
	this.crouchedKickAnim = new SpriteSheetClass(playerCrouchedKickAnim, this.width, this.height, true, 4); //4 frames
	this.uppercutAnim = new SpriteSheetClass(playerUppercutAnim, this.width, this.height, true, 6); //4 frames
	this.deadAnim = new SpriteSheetClass(playerDeadAnim, this.width, this.height, true, 8); //8 frames

	// Need  a key for punches, Other for kick 
	// Combo moves on multiple sucessful hits. 

	//TODO : Used for combo moves
	// this.attackAnimArr = [this.highKickAnim, this.leftJabAnim, this.punchAnim];
	this.doubleJumpCount = 0;
}

playerClass.prototype = Object.create(entityClass.prototype);

playerClass.prototype.setupInput = function (upKey, rightKey, downKey, leftKey, attackKey, jumpKey, defendKey) {
  this.controlKeyUp = upKey;
  this.controlKeyRight = rightKey;
  this.controlKeyDown = downKey;
  this.controlKeyLeft = leftKey;
  this.controlKeyAttack = attackKey;
  this.controlKeyJump = jumpKey;
  this.controlKeyDefend = defendKey;
}

playerClass.prototype.move = function () {
  this.setInitialBoundingBox(this.width / 4, this.height);
  this.setWorldPhysics();

  //Left and Right movement
  if (this.keyHeld_Left) {
    //this.setStateToFalse(); //setting every value of object to false; // might be buggy
    this.setStateValueTo(IN_MOTION, true);
    this.setStateValueTo(MOVING_LEFT, true);
    this.speed.setX(-PLAYER_RUN_SPEED);
  }
  //Right movement
  else if (this.keyHeld_Right) {
    //this.setStateToFalse();
    this.setStateValueTo(IN_MOTION, true);
    this.setStateValueTo(MOVING_LEFT, false);
    this.speed.setX(PLAYER_RUN_SPEED);
    // this.speed.x = PLAYER_RUN_SPEED;
  }
  else {
    this.setStateValueTo(IN_MOTION, false);
    this.setStateValueTo(IDLE, true);
  }
  //For crouched movement 
  if (this.keyHeld_Down && this.state[ON_GROUND]) {
    //Up for uppercut
    this.setStateValueTo(IDLE, false);
    this.setStateValueTo(CROUCHING, true);
    this.boundingBox.height = this.height / 1.5;
    this.boundingBox.y = this.pos.y - this.boundingBox.height/1.5;
  }
  else {
    //Down for spin kick
    this.setStateValueTo(CROUCHING, false);
    this.setStateValueTo(IDLE, true);
  }

  if (this.keyHeld_Attack) {
    this.setStateValueTo(IDLE, false);
    this.setStateValueTo(IN_MOTION, false);
    this.setStateValueTo(ATTACKING, true);
    punchSound.play();
    this.boundingBox.width = this.width / 1.5;
    this.boundingBox.x = this.pos.x - this.boundingBox.width / 2;

    if (this.keyHeld_Up && this.state.isCrouching) {
      this.speed.y -= 0.05;
      this.state.isOnGround = false;
    }
  }
  else {
    this.setStateValueTo(ATTACKING, false);
  }
  //TODO: convert this.speed.x -> this.speed.getX
  //Remove this code if you want to reverse kick with movement. 
  if (this.state[ON_GROUND] && this.state[ATTACKING]) {
        this.speed.x = 0;
  }
  if (this.keyHeld_Jump && !this.keyHeld_Up_lastframe) {
    // this.setStateToFalse();
    this.keyHeld_Up_lastframe = true;
    if (this.state['isOnGround']) { // regular jump
      jumpSound.play();
      this.speed.setY( this.speed.getY() - JUMP_POWER);
      this.setStateValueTo(ON_GROUND, false);
    }
    else if (this.doubleJumpCount < MAX_AIR_JUMPS) { // in the air?
      jumpSound.play();
      this.speed.setY(0);
      this.speed.setY( this.speed.getY() - JUMP_POWER);
      this.doubleJumpCount++;
      this.setStateValueTo(ON_GROUND, false);
    } 
    else {
      console.log("Ignoring triple jump...");
    }
  }
  // avoid multiple jumps from the same keypress
  this.keyHeld_Up_lastframe = this.keyHeld_Jump;
  
  this.entityCollisionHandling();
  this.pos.addTo(this.speed);
  this.playerWorldHandling();

  if (this.spriteAnim != null) {
    this.spriteAnim.update();
  }
}

playerClass.prototype.playerCollides = function(obj){
  return utils.rectIntersect(obj.boundingBox, this.boundingBox);
}

playerClass.prototype.playerWorldHandling = function () {}

 playerClass.prototype.draw = function () { 
  //TODO : Jump, Attack animation should work Only once
  //TODO : Reset punch animation loop 
  if (this.state[IDLE]) {
    this.spriteAnim = this.idleAnim;
  }

  if (this.state[IN_MOTION]) {
    this.spriteAnim = this.walkAnim;
  }

  if (this.state[HURT]) {
    this.spriteAnim = this.hurtAnim;
  }

  if (this.state[DEAD]) {
    this.spriteAnim = this.deadAnim;
  }

  if (this.state[CROUCHING]) {
    this.spriteAnim = this.crouchAnim;
    if (this.state.isInMotion) {
      this.spriteAnim = this.rollAnim;
    }
  }
  
  if (this.state[ATTACKING]) {
    this.spriteAnim = this.punchAnim;
    if (this.state.isCrouching) {
      if (this.keyHeld_Up) {
        this.spriteAnim = this.uppercutAnim;
      }
      else {
        this.spriteAnim = this.crouchedKickAnim;
      }
    }
  }

  //is Jumping or falling
  if (!this.state[ON_GROUND]) {
    this.spriteAnim = this.idleJumpAnim;
    if (this.keyHeld_Up) {
      this.spriteAnim = this.FlipAnim;
    }
  }

  if (this.state[ATTACKING] && !this.state[ON_GROUND]) {
    this.spriteAnim = this.highKickAnim;
    // this.attackAnimArr[Math.floor(Math.random()*this.attackAnimArr.length)];
  }

  //TODO: Once crouch animation complete. Call a function to draw in fixed state instead of animation. 
  //final drawing of sprite.
  if (this.spriteAnim != null) {
    //TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
    this.spriteAnim.draw(this.spriteAnim.frameIndex, this.frameRow, this.pos.x, this.pos.y, this.ang, this.state.isMovingLeft);
    // console.log(this.spriteAnim.frameIndex);
  }
}


// function tileNearbyCollisionCheck(tileLeftHere, tileRightHere, tileUnderHere, tileOverHere, tileType, playerTrackCol, playerTrackRow) {
//   tileCollisionRect = {
//     x: (playerTrackCol) * WORLD_W,
//     y: playerTrackRow * WORLD_H,
//     width: WORLD_W,
//     height: WORLD_H
//   };
//   if (tileLeftHere == tileType) {
//     tileCollisionRect.x = (playerTrackCol - 1) * WORLD_W;
//   }
//   if (tileRightHere == tileType) {
//     tileCollisionRect.x = (playerTrackCol + 1) * WORLD_W;
//   }
//   if (tileUnderHere == tileType) {
//     tileCollisionRect.y = (playerTrackRow + 1) * WORLD_H;
//   }
//   if (tileOverHere == tileType) {
//     tileCollisionRect.y = (playerTrackRow - 1) * WORLD_H;
//   }
// }
