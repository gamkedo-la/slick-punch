function playerClass() {

  Object.getPrototypeOf(playerClass.prototype).constructor.call(this);
  //Tracking input keys to player movement
  this.keyHeld_Right = false;
  this.keyHeld_Left = false;
  this.keyHeld_Down = false;
  this.keyHeld_Up = false;
  this.keyHeld_Attack = false;
  this.keyHeld_Jump = false;
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

  // Animation generation. 
  this.walkAnim = new SpriteSheetClass(playerWalkAnim, this.width, this.height, true, 10, 4); // 10 frames 4 ticks
  this.idleAnim = new SpriteSheetClass(playerIdleAnim, this.width, this.height, true, 7, 4); //7 frames
  this.idleJumpAnim = new SpriteSheetClass(playerIdleJumpAnim, this.width, this.height, true, 5, 4); //6 frames
  this.walkJumpAnim = new SpriteSheetClass(playerWalkJumpAnim, this.width, this.height, true, 5, 4); //5 frames
  this.crouchAnim = new SpriteSheetClass(playerCrouchAnim, this.width, this.height, false, 4, 4); //4 frames
  this.rollAnim = new SpriteSheetClass(playerRollAnim, this.width, this.height, true, 7, 4); //7 frames
  this.explosiveFallAnim = new SpriteSheetClass(playerIdleJumpAnim, this.width, this.height, true, 8, 4); //8 frames
  this.hurtAnim = new SpriteSheetClass(playerHurtAnim, this.width, this.height, true, 3, 8, 4); //3 frames
  this.deadAnim = new SpriteSheetClass(playerDeadAnim, this.width, this.height, true, 8, 4); //8 frames
  this.resetOrSetNonLoopingAnim();
  this.attackArr = [this.punchAnim, this.leftJabAnim, this.highKickAnim];
  this.doubleJumpCount = 0;
}

playerClass.prototype = Object.create(entityClass.prototype);

playerClass.prototype.resetOrSetNonLoopingAnim = function() {
  this.punchAnim = new SpriteSheetClass(playerPunchAnim, this.width, this.height, false, 7, 4); //4frames
  this.crouchAnim = new SpriteSheetClass(playerCrouchAnim, this.width, this.height, false, 4, 4); //4 frames
  this.deadAnim = new SpriteSheetClass(playerDeadAnim, this.width, this.height, false, 8); //8 frames
  this.leftJabAnim = new SpriteSheetClass(playerLeftJabAnim, this.width, this.height, false, 7, 4); //7 frames
  this.highKickAnim = new SpriteSheetClass(playerHighKickAnim, this.width, this.height, false, 6, 4); //6 frames
  this.crouchedKickAnim = new SpriteSheetClass(playerCrouchedKickAnim, this.width, this.height, false, 4, 6); //4 frames
  this.uppercutAnim = new SpriteSheetClass(playerUppercutAnim, this.width, this.height, false, 6, 4); //4 frames
  this.flipAnim = new SpriteSheetClass(playerFlipAnim, this.width, this.height, false, 5, 3); //5 frames
  this.attackAnim = this.punchAnim;
}

playerClass.prototype.setupInput = function (upKey, rightKey, downKey, leftKey, attackKey, jumpKey, defendKey) {
  this.controlKeyUp = upKey;
  this.controlKeyRight = rightKey;
  this.controlKeyDown = downKey;
  this.controlKeyLeft = leftKey;
  this.controlKeyAttack = attackKey;
  this.controlKeyJump = jumpKey;
  this.controlKeyDefend = defendKey;
}

playerClass.prototype.resetAttackFrameIndex = function(){
    this.punchAnim.frameIndex = 0;
    this.leftJabAnim.frameIndex = 0;
    this.highKickAnim.frameIndex = 0;
    this.crouchedKickAnim.frameIndex = 0;
    this.uppercutAnim.frameIndex = 0;
    this.flipAnim.frameIndex = 0;
    this.attackAnim = this.attackArr[Math.floor(Math.random()*this.attackArr.length)];
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
  if ((this.keyHeld_Down  || this.keyHeld_Up) && this.state[ON_GROUND]) {
    //Up for uppercut
    this.setStateValueTo(IDLE, false);
    this.setStateValueTo(CROUCHING, true);
    this.boundingBox.height = this.height / 1.5;
    this.boundingBox.y = this.pos.y - this.boundingBox.height / 3;  
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
  }
  else if(this.spriteAnim!=null && this.spriteAnim.cycleComplete){
    this.setStateValueTo(ATTACKING, false);
    this.resetAttackFrameIndex();
  }
 
  //Remove this code if you want to reverse kick with movement. 
  if (this.state[ON_GROUND] && this.state[ATTACKING]) {
    this.speed.x = 0;
  }

  if (this.keyHeld_Jump && !this.keyHeld_Up_lastframe) {
    // this.setStateToFalse();
    this.keyHeld_Up_lastframe = true;
    if (this.state['isOnGround']) { // regular jump
      jumpSound.play();
      this.speed.setY(this.speed.getY() - JUMP_POWER);
      this.setStateValueTo(ON_GROUND, false);
    }
    else if (this.doubleJumpCount < MAX_AIR_JUMPS) { // in the air?
      jumpSound.play();
      this.speed.setY(0);
      this.speed.setY(this.speed.getY() - JUMP_POWER);
      this.doubleJumpCount++;
      this.setStateValueTo(ON_GROUND, false);
    }
    else {
      console.log("Ignoring triple jump...");
    }
  }

  if (this.state[ON_GROUND] && this.state[IN_MOTION]) {
    walkFX(this.pos.x, this.pos.y + 110); // dust as we walk
  }

  if (!this.state[ON_GROUND]) {
    fallFX(this.pos.x, this.pos.y + 110); // trail when we are jumping/falling
  }

  // avoid multiple jumps from the same keypress
  this.keyHeld_Up_lastframe = this.keyHeld_Jump;

  this.entityPlatformHandling();
  platformList.checkCollisions(this);
  this.pos.addTo(this.speed);
  this.playerWorldHandling();

  if (this.spriteAnim != null) {
    this.spriteAnim.update();
  }
  
}

playerClass.prototype.playerCollides = function (obj) {
  return utils.rectIntersect(obj.boundingBox, this.boundingBox);
}

playerClass.prototype.playerWorldHandling = function () {
  for (var i = 0; i < itemArr.length; i++) {
    boundingBox = itemArr[i].boundingBox;
    if (utils.rectIntersect(boundingBox, this.boundingBox)) {
      itemArr[i].returnEffect();
    }
  }

  var playerTrackCol = Math.floor(this.pos.x / WORLD_W);
  var playerTrackRow = Math.floor(this.pos.y / WORLD_H);

  // Tile center position = 0,0 draw position + worldW/2 - width/2 - simillarly for height.. 
  // Once we have tile position we can create a bounding box for it which can be used in collision detection.

  var healthInterval;
  var tileindex = rowColToArrayIndex(playerTrackCol, playerTrackRow);
  //I have player bounding box. 
  // All I have to do 
  if (playerTrackCol >= 0 && playerTrackCol < WORLD_COLS &&
    playerTrackRow >= 0 && playerTrackRow < WORLD_ROWS) {

    var tileHere = returnTileTypeAtColRow(playerTrackCol, playerTrackRow);

      if (tileHere == DEATH_ZONE) {
        this.takeDamage(this.health);

      }
      if (tileHere == KEY_RED ) {
        this.key_red = true;
        console.log("Got a Red key");
        worldGrid[tileindex] = -1;
        playerKeySound.play();
      }
      if (tileHere == KEY_BLUE) {
        this.key_blue = true;
        console.log("Got a Blue key");
        worldGrid[tileindex] = -1;
        playerKeySound.play();
      }
      if (tileHere == KEY_GREEN) {
        this.key_green = true;
        console.log("Got a green key");
        worldGrid[tileindex] = -1;
        playerKeySound.play();
      }

  }
}

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
  //is Jumping or falling
  if (!this.state[ON_GROUND]) {
    this.spriteAnim = this.idleJumpAnim;
    
  }
  if (this.state[ATTACKING]) {
    this.spriteAnim = this.attackAnim;
    // this.spriteAnim = this.attackArr[Math.floor(Math.random()*this.attackArr.length)];
    // this.cycleComplete = false;
    if (this.state[CROUCHING] && this.state[ON_GROUND]) {
      if (this.keyHeld_Up) {
        this.spriteAnim = this.uppercutAnim;
      }
      else{
         this.spriteAnim = this.crouchedKickAnim;
      }
    }
    if(!this.state[ON_GROUND]){
      this.spriteAnim = this.flipAnim;
    }
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
