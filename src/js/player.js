const GROUND_FRICTION = 0.7;
const AIR_RESISTANCE = 0.975;
const PLAYER_RUN_SPEED = 3.0;
const JUMP_POWER = 8;
const DOUBLE_JUMP_POWER = 10; // we need more force to counteract gravity in air
const GRAVITY = 0.55;
const MAX_AIR_JUMPS = 1; // double jump
const PLAYER_COLLISION_PADDING = 5;

//constants created instead of just texts to make sure no one 
//mispells and assigns different state
const ON_GROUND = 'isOnGround';
const IDLE = 'isIdle';
const IN_MOTION = 'isInMotion';
const MOVING_LEFT = 'isMovingLeft';
const CROUCHING = 'isCrouching';
const FACING_UP = 'isFacingUp';
const ATTACKING = 'isAttacking';
const DEFENDING = 'isDefending';
const ANIMATING = 'isAnimating';
const HURT = 'isHurt'
const DEAD = 'isDead'
const FLYING = 'isFlying'

//Has collision code for platform 
//Had properties that help check player Collision
const FLYING_ENEMY_HEALTH = 1;
const PLAYER_HEALTH = 3;
const DUMB_WALK_ENEMY = 1;
const RUNNING_ZOMBIE_ENEMY = 1; 

const PLAYER_ATTACK_POWER = 1;


function playerClass() {
	this.pos = vector.create(75, 75);
	this.speed = vector.create(0, 0);
	this.playerPic; // which picture to use
	this.name;
	this.health;

	// @todo split up attack-state into multiple states to make playing sounds/animation easier
	this.state = {
		'isOnGround': true,
		'isIdle': true,
		'isInMotion': false,
		'isMovingLeft': false, //Required to set character flip.
		'isCrouching': false,
		'isFacingUp': false, //Might be redundant
		'isAttacking': false, //combo punches, kick on 3 continuos punch
		'isDefending': false,
		'isAnimating': false, // Used to set state between animation and final.
		'isHurt': false,
		'isDead': false,
		'isFlying': false
	};

	// window.state = this.state;
	//For collision
	this.boundingBox = {}
	this.width = 80;
	this.height = 80;
	this.ang = 0;
	this.removeMe = false;

	//Needed for keeping trak of player animation 
	this.tickCount = 0;
	this.ticksPerFrame = 5;
	this.spriteAnim = null;
	this.framesAnim = null;

	//Tracking input keys to player movement
	this.keyHeld_Right = false;
	this.keyHeld_Left = false;
	this.keyHeld_Down = false;
	this.keyHeld_Up = false;
	this.keyHeld_Attack = false;
	this.keyHeld_Jump = false;
	this.keyHeld_Defend = false;

	// don't jump >1x per keypress
	this.keyHeld_Up_lastframe = false;

	//Set for tracking punch sound
	this.punchTimer = false;
	this.punchFrameCount = 4;

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
	this.punchAnim = new SpriteSheetClass(playerPunchAnim, this.width, this.height, false, this.punchFrameCount); //4frames
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
	this.attackAnimArr = [this.highKickAnim, this.leftJabAnim, this.punchAnim]

	//Used for animation.
	//TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
	this.frameRow = 0;
	this.doubleJumpCount = 0;

}

//sets all values of state object to false
playerClass.prototype.setStateToFalse = function () {
  for (key in this.state) {
    this.state[key] = false;
  }
};

//sets value of given key pf state object to value passed
playerClass.prototype.setStateValueTo = function (key, val) {
  if (this.state.hasOwnProperty(key)) {
    // console.log("Setting" + key + ":" + val);
    this.state[key] = val;
  }
};

playerClass.prototype.setupInput = function (upKey, rightKey, downKey, leftKey, attackKey, jumpKey, defendKey) {
  this.controlKeyUp = upKey;
  this.controlKeyRight = rightKey;
  this.controlKeyDown = downKey;
  this.controlKeyLeft = leftKey;
  this.controlKeyAttack = attackKey;
  this.controlKeyJump = jumpKey;
  this.controlKeyDefend = defendKey;
}

 playerClass.prototype.takeDamage = function (howMuch) {
  console.log("Damage received: " + howMuch);
  if (this.health > 0 && !this.state[HURT]) {
    this.health -= howMuch;
    this.state[HURT] = true;
    playerHitEffect(this.pos.x, this.pos.y);
  }
  if (this.health <= 0) {
    console.log("PLAYER HAS 0 HP - todo: gameover/respawn");
    this.state[DEAD] = true;
    playerDeathEffect(this.pos.x, this.pos.y);
    setTimeout(this.resetGame.bind(this), 1000);
  }
  this.resetHurtTimeout = setTimeout(this.resetHurtAnimation.bind(this), 500);
}

 playerClass.prototype.resetHurtAnimation = function () {
  this.state[HURT] = false;
}

 playerClass.prototype.resetGame = function () {
  loadLevel(levelOne)
}

 playerClass.prototype.init = function (whichImage, playerName) {
  this.name = playerName;
  this.playerPic = whichImage;
  this.health = PLAYER_HEALTH;
  this.doubleJumpCount = 0;
  this.attackPower = PLAYER_ATTACK_POWER;
  this.state = {
    'isOnGround': true,
    'isIdle': true,
    'isInMotion': false,
    'isMovingLeft': false, //Required to set character flip.
    'isCrouching': false,
    'isFacingUp': false, //Might be redundant
    'isAttacking': false, //combo punches, kick on 3 continuos punch
    'isDefending': false,
    'isAnimating': false, // Used to set state between animation and final.
    'isHurt': false,
    'isDead': false,
    'isFlying': false
  };
  this.setEntityPosition(WORLD_PLAYERSTART);
} // end of playerReset func




 playerClass.prototype.setEntityPosition = function(entityWorldIndex){
  for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if (worldGrid[arrayIndex] == entityWorldIndex) {
        worldGrid[arrayIndex] = WORLD_BACKGROUND;
        // this.ang = -Math.PI/2;
        this.pos.x = eachCol * WORLD_W + WORLD_W / 2;
        this.pos.y = eachRow * WORLD_H + WORLD_H / 2;
        return;
      } // end of player start if
    } // end of col for
  } // end of row for
  console.log("NO" + this.name + "START FOUND!");
}

 playerClass.prototype.move = function () {
  this.boundingBox.width = this.width / 3;
  this.boundingBox.height = this.height;
  this.boundingBox.x = this.pos.x - this.boundingBox.width / 2;
  this.boundingBox.y = this.pos.y - this.boundingBox.height / 2;

  if (this.state[ON_GROUND]) {
    // this.speed.x *= GROUND_FRICTION;
    this.speed.setX(this.speed.x * GROUND_FRICTION);
    this.doubleJumpCount = 0;
  }
  else { 
    // in the air
    this.speed.setX(this.speed.x * AIR_RESISTANCE);
    this.speed.setY(this.speed.y + GRAVITY);
    // improve this
    if (this.speed.y > this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING) {
      this.speed.y = this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING;
    }
  }
  //Left movement
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
  if (this.keyHeld_Down) {
    //Up for uppercut
    this.setStateValueTo(IDLE, false);
    this.setStateValueTo(CROUCHING, true);
    this.boundingBox.height = this.height / 2;
    this.boundingBox.y = this.pos.y - this.boundingBox.height / 2;
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
    // if(utils.distance(player.pos,this.pos) < 60){
    //           player.takeDamage(1);
    //       }
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

  //Checking if player is falling or jumping.
  //Get bounding box border coordinates and perform the same functionality for each point
  if (this.speed.y < 0 && 
    (isPlatformAtPixelCoord(this.pos.x + this.boundingBox.width/2, this.pos.y - this.boundingBox.height / 2) ||
    isPlatformAtPixelCoord(this.pos.x - this.boundingBox.width/2, this.pos.y - this.boundingBox.height / 2))) {
      this.pos.setY((Math.floor(this.pos.y / WORLD_H)) * WORLD_H + this.boundingBox.height / 2);
      this.speed.setY(0);
  }

  if (this.speed.y > 0 && isPlatformAtPixelCoord(this.pos.x, this.pos.y + this.boundingBox.height / 2 - PLAYER_COLLISION_PADDING * 2)) {
    this.pos.setY((1 + Math.floor(this.pos.y / WORLD_H)) * WORLD_H - this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING); 
    this.setStateValueTo(ON_GROUND, true);
    this.speed.setY(0);
  }
  //checks for air/empty space
  else if (!isPlatformAtPixelCoord(this.pos.x, this.pos.y + this.height / 2 + PLAYER_COLLISION_PADDING * 2)) {
    this.setStateValueTo(ON_GROUND, false);
  }
  //Sideways collision
  if (this.speed.x < 0 && 
    (isPlatformAtPixelCoord(this.pos.x - this.boundingBox.width / 2, this.pos.y + this.boundingBox.height/4) ||
    isPlatformAtPixelCoord(this.pos.x - this.boundingBox.width / 2, this.pos.y - this.boundingBox.height/4))){
    this.pos.x = (Math.floor(this.pos.x / WORLD_W)) * WORLD_W + this.boundingBox.width / 2;
  }

  if (this.speed.x > 0 && 
    (isPlatformAtPixelCoord(this.pos.x + this.boundingBox.width / 2, this.pos.y + this.boundingBox.height/4) ||
     isPlatformAtPixelCoord(this.pos.x + this.boundingBox.width / 2, this.pos.y - this.boundingBox.height/4))) {
    this.pos.x = (1 + Math.floor(this.pos.x / WORLD_W)) * WORLD_W - this.boundingBox.width / 2;
  }

  this.pos.addTo(this.speed) // same as above, but for vertical
  playerWorldHandling(this);

  if (this.spriteAnim != null) {
    this.spriteAnim.update();
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
