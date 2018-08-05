const GROUND_FRICTION = 0.7;
const AIR_RESISTANCE = 0.975;
const RUN_SPEED = 3.0;
const JUMP_POWER = 8;
const DOUBLE_JUMP_POWER = 10; // we need more force to counteract gravity in air
const GRAVITY = 0.55;
const MAX_AIR_JUMPS = 1; // double jump
const PLAYER_COLLISION_PADDING = 5;

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

const FLYING_ENEMY_HEALTH = 1;
const FLYING_ENEMY_ATTACK_POWER = 2;

const RUNNING_ZOMBIE_ENEMY = 1; 
const RUNNING_ZOMBIE_ATTACK_POWER = 1.5; 

const PLAYER_ATTACK_POWER = 1.5;
const PLAYER_HEALTH = 3;

const ENEMY_DUMB_ATTACK_POWER = 1;
const ENEMY_DUMB_HEALTH = 1;

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
const IS_HURT = 'isHurt'
const IS_DEAD = 'isDead'
const IS_FLYING = 'isFlying'

function entityClass() {
	//Need to check which variables are used outside and only expose them in code. 
  this.pos = vector.create(75, 75);
	this.speed = vector.create(0, 0);
	this.pic; // which picture to use
	this.name;
	this.health;
	this.valueInWorldIndex = 999; //Change this when inheriting

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
	// Need  a key for punches, Other for kick 
	// Combo moves on multiple sucessful hits.
	//Used for animation.
	//TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
	this.frameRow = 0;
}

// Sets all values of state object to false
// Used in conjunction with setValue to as default state is Idle
entityClass.prototype.setStateToFalse = function (){
	for(key in this.state){
		this.state[key] = false;
	}
};

//sets value of given key of state object to value passed
entityClass.prototype.setStateValueTo = function (key, val){
	if(this.state.hasOwnProperty(key)){
		// console.log("Setting" + key + ":" + val);
		this.state[key] = val;
	}
};

//how much would be attack power for each entity
entityClass.prototype.takeDamage = function (howMuch) {
	console.log("Damage received:  " + howMuch + " by " + this.name);
	//TODO: Improve this. Currently only effects health till isHurt is active. 
	if (this.health > 0 && !this.state[HURT]) {
    this.health -= howMuch;
    this.state[HURT] = true;
    playerHitEffect(this.pos.x, this.pos.y);
  }
	if (this.health <= 0) {
		console.log("PLAYER HAS 0 HP - todo: gameover/respawn");
    this.state[DEAD] = true;
		if(	this.name == "Player"){
			setTimeout(this.resetGame.bind(this), 500);
		}
	}
	this.resetHurtTimeout = setTimeout(this.resetHurtAnimation.bind(this), 700);
}

playerClass.prototype.resetGame = function () {
  loadLevel(levelOne)
}

entityClass.prototype.resetHurtAnimation = function () {
  this.state[HURT] = false;
}

entityClass.prototype.init = function (whichImage, playerName) {
  this.name = playerName;
  this.pic = whichImage;
  this.doubleJumpCount = 0;
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
  var entityToWorldValue;
  switch(playerName){
    case "Player":
      entityToWorldValue = WORLD_PLAYERSTART;
      this.attackPower = PLAYER_ATTACK_POWER;
      this.health = PLAYER_HEALTH;
      break;
    case "Dumb Enemy":
      entityToWorldValue = WORLD_ENEMY_DUMB_START;
      this.attackPower = ENEMY_DUMB_ATTACK_POWER;
      this.health = ENEMY_DUMB_HEALTH;
      break;

  }
  this.setEntityPosition(entityToWorldValue);
} // end of playerReset func

entityClass.prototype.addEntityToWorld(){
	for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			if (worldGrid[arrayIndex] == this.valueInWorldIndex) {
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

