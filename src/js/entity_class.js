const SHOW_ENTITY_DEBUG = false;
//For player;
const GROUND_FRICTION = 0.7;
const AIR_RESISTANCE = 0.975;
const JUMP_POWER = 8;
const DOUBLE_JUMP_POWER = 10; // we need more force to counteract gravity in air
const GRAVITY = 0.65;
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
const HURT = 'isHurt';
const DEAD = 'isDead';
const FLYING = 'isFlying';

const FLYING_ENEMY_HEALTH = 1;
const FLYING_ENEMY_ATTACK_POWER = 2;
const RUNNING_ZOMBIE_ENEMY = 1;
const RUNNING_ZOMBIE_ATTACK_POWER = 1.5;
const ENEMY_DUMB_HEALTH = 1;
const ENEMY_DUMB_ATTACK_POWER = 1;
const PLAYER_ATTACK_POWER = 1.5;
const PLAYER_HEALTH = 6;
const PLAYER_RUN_SPEED = 3.0;
const ENEMY_VENOM_DOG_HEALTH = 10;
const ENEMY_VENOM_DOG_ATTACK_POWER = 1;
const BOX_HEALTH = 0.5;

//Manages the list of entity
let entityList = [];

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
    'isMovingLeft': false,
    'isCrouching': false,
    'isFacingUp': false, //Might be redundant
    'isAttacking': false,
    'isDefending': false,
    'isAnimating': false,
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
entityClass.prototype.setStateToFalse = function () {
  for (key in this.state) {
    this.state[key] = false;
  }
};

//sets value of given key of state object to value passed
entityClass.prototype.setStateValueTo = function (key, val) {
  if (this.state.hasOwnProperty(key)) {
    this.state[key] = val;
  }
};

//how much would be attack power for each entity
entityClass.prototype.takeDamage = function (howMuch) {
  if (SHOW_ENTITY_DEBUG) {
    console.log("Damage received:  " + howMuch + " by " + this.name);
  }
  //TODO: Improve this. Currently only effects health till isHurt is active. 
  if (this.health > 0 && !this.state[HURT]) {
    this.health -= howMuch;
    this.state[HURT] = true;
    playerHitEffect(this.pos.x, this.pos.y);
  }
  if (this.name == "Player") {
    playerHitSound.play();
    if (this.health <= 0) {
      this.state[DEAD] = true;
      playerDieSound.play();
      setTimeout(this.resetGame.bind(this), 500);
    }
  }
  this.resetHurtTimeout = setTimeout(this.resetHurtAnimation.bind(this), 700);
}

entityClass.prototype.resetGame = function () {
  backToTitleScreen();
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
    'isFlying': false,
    'isOnPlatform': false
  };
  switch (playerName) {
    case "Player":
      this.valueInWorldIndex = WORLD_PLAYERSTART;
      this.health = PLAYER_HEALTH;
      break;
    case "Dumb Enemy":
      this.valueInWorldIndex = WORLD_ENEMY_DUMB_START;
      this.health = ENEMY_DUMB_HEALTH;
      break;
    case "Venom Dog":
      this.valueInWorldIndex = WORLD_VENOM_DOG;
      this.health = ENEMY_VENOM_DOG_HEALTH;
      break;
    case "Box":
      this.valueInWorldIndex = CRATE;
      this.health = BOX_HEALTH;
      break;
    case "Slime Drip":
      this.valueInWorldIndex = SLIME_DRIP;
      this.health = BOX_HEALTH;
      break;
    case "Slime Ball":
      this.valueInWorldIndex = null;
      this.health = BOX_HEALTH;
      break;
  }
  this.addEntityToWorldTile();
  entityList.push(this);
  if (SHOW_ENTITY_DEBUG) {
    console.log(playerName + " spawned");
  }
} // end of playerReset func

entityClass.prototype.addEntityToWorldTile = function () {
  for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if (worldGrid[arrayIndex] == this.valueInWorldIndex &&
        worldGrid[arrayIndex] != null) {
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

//x,y -> leftmost top, topmost point 
entityClass.prototype.setInitialBoundingBox = function (width, height) {
  this.boundingBox.width = width;
  this.boundingBox.height = height;
  this.boundingBox.x = this.pos.x - this.boundingBox.width / 2;
  this.boundingBox.y = this.pos.y - this.boundingBox.height / 2;
}

entityClass.prototype.setWorldPhysics = function () {
  if (this.state[ON_GROUND]) {
    this.speed.x *= GROUND_FRICTION;
    this.speed.setX(this.speed.x * GROUND_FRICTION);
  }
  if (this.state[ON_GROUND]) {
    this.doubleJumpCount = 0;
  }
  else if (!this.state[ON_GROUND]) {
    // in the air
    this.speed.setX(this.speed.getX() * AIR_RESISTANCE);
    this.speed.setY(this.speed.getY() + GRAVITY);
  }

}

entityClass.prototype.entityPlatformHandling = function () {
  const DEBUGCOLLISION = false; // lots of console spam tohelp

  //Checking if player is falling or jumping.
  //Get bounding box border coordinates and perform the same functionality for each point
  const jumping = this.speed.getY() < 0;
  const moving_left = this.speed.getX() < 0;
  const moving_right = this.speed.getX() > 0;
  const falling_down = this.speed.getY() > 0;

  //check collision bug that allows wall climbing. Shoudn't occur

  //Sideways collision
  if (moving_left &&
    (isPlatformAtPixelCoord(this.pos.getX() - this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 4) ||
      isPlatformAtPixelCoord(this.pos.getX() - this.boundingBox.width / 2, this.pos.getY() - this.boundingBox.height / 4))) {
    this.pos.setX((Math.floor(this.pos.getX() / WORLD_W)) * WORLD_W + this.boundingBox.width / 2);
    if (DEBUGCOLLISION) console.log('moving left and hit a wall.');
  }
  if (moving_right &&
    (isPlatformAtPixelCoord(this.pos.getX() + this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 4) ||
      isPlatformAtPixelCoord(this.pos.getX() + this.boundingBox.width / 2, this.pos.getY() - this.boundingBox.height / 4))) {
    this.pos.setX((1 + Math.floor(this.pos.getX() / WORLD_W)) * WORLD_W - this.boundingBox.width / 2);
    if (DEBUGCOLLISION) console.log('moving right and hit a wall.');
  }

  // vertical collision
  if (jumping &&
    (isPlatformAtPixelCoord(this.pos.getX() + this.boundingBox.width / 2, this.pos.getY() - this.boundingBox.height / 2) ||
      isPlatformAtPixelCoord(this.pos.getX() - this.boundingBox.width / 2, this.pos.getY() - this.boundingBox.height / 2))) {
    // this.pos.setY((Math.floor(this.pos.getY() / WORLD_H)) * WORLD_H + this.boundingBox.height / 2);
    this.speed.setY(0);
    this.setStateValueTo(ON_GROUND, false);
    if (DEBUGCOLLISION) console.log('jumping and hit head on ceiling');
  }

  if (falling_down &&
    (isPlatformAtPixelCoord(this.pos.getX() + this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 2 - PLAYER_COLLISION_PADDING * 2) ||
      isPlatformAtPixelCoord(this.pos.getX() - this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 2 - PLAYER_COLLISION_PADDING * 2))) {


    this.pos.setY((1 + Math.floor(this.pos.getY() / WORLD_H)) * WORLD_H - this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING);
    this.setStateValueTo(ON_GROUND, true);
    this.speed.setY(0);
    if (DEBUGCOLLISION) console.log('falling down and hit a floor: stopping falling.');
  }
  //checks for air/empty space if the above was false // FIXME is this a bug? should this not be an ELSE?
  else if (!isPlatformAtPixelCoord(this.pos.getX() - this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING * 2) &&
    !isPlatformAtPixelCoord(this.pos.getX() + this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING * 2) &&
    !isPlatformAtPixelCoord(this.pos.getX() - this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 2 - PLAYER_COLLISION_PADDING * 2) &&
    !isPlatformAtPixelCoord(this.pos.getX() + this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 2 - PLAYER_COLLISION_PADDING * 2)
  ) {
    this.setStateValueTo(ON_GROUND, false);
    //if (DEBUGCOLLISION) console.log('did not hit floor while falling and nothing below us: in air'); // happen every frame while falling
  }

  //Pushing player if only one leg is on platform
  if (this.state[MOVING_LEFT]) {
    if (isPlatformAtPixelCoord(this.pos.getX() - this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING * 2) &&
      !isPlatformAtPixelCoord(this.pos.getX(), this.pos.getY() + this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING * 2)
    ) {
      if (DEBUGCOLLISION) console.log('moving left one leg hit?');
      this.pos.setX(this.pos.getX() - PLAYER_COLLISION_PADDING)
    }
    if (isPlatformAtPixelCoord(this.pos.getX() + this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING * 2) &&
      !isPlatformAtPixelCoord(this.pos.getX(), this.pos.getY() + this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING * 2)
    ) {
      if (DEBUGCOLLISION) console.log('moving left and other leg hit?');
      this.pos.setX(this.pos.getX() - PLAYER_COLLISION_PADDING / 2)
    }
  }
  else {
    if (isPlatformAtPixelCoord(this.pos.getX() + this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING * 2) &&
      !isPlatformAtPixelCoord(this.pos.getX(), this.pos.getY() + this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING * 2)
    ) {
      if (DEBUGCOLLISION) console.log('moving right one leg hit?');
      this.pos.setX(this.pos.getX() + PLAYER_COLLISION_PADDING)
    }
    if (isPlatformAtPixelCoord(this.pos.getX() - this.boundingBox.width / 2, this.pos.getY() + this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING * 2) &&
      !isPlatformAtPixelCoord(this.pos.getX(), this.pos.getY() + this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING * 2)
    ) {
      if (DEBUGCOLLISION) console.log('moving right and other leg hit?');
      this.pos.setX(this.pos.getX() + PLAYER_COLLISION_PADDING / 2)
    }
  }
}
