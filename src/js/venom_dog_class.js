
// Venom Dog Class

const ENEMY_VENOMDOG_RELOAD_FRAMES = 90;
const DOG_ATTACK_DISTANCE = 128; // maximum distance from the player to warrant an attack
const DOG_ATTACK_FREQUENCY = 0.015; // chance per frame of attacking player if in range
const VENOMDOG_ATTACK_SPEED = 4; // lunging speed while attacking player
const VENOMDOG_CANHITPLAYER_DIST = 30; // close enough to bite the player?
const VENOMDOG_MAX_ATTACK_TICKS = 60; // max time in an attack before going back to patrol

function venomDogClass(x, y) {

  if (SHOW_ENTITY_DEBUG) {
    console.log("Spawning a venom dog at " + x + "," + y);
  }

  this.pos = vector.create(x, y);
  this.speed = vector.create(0, 0);
  this.playerPic;
  this.name = "Venom Dog";
  this.health = 3;
  this.reloadFrames = 0;
  this.spawnPoint = vector.create(x, y);

  const VENOMDOG_HORIZ_RANGE = 300; // px from spawnPoint
  const VENOMDOG_VERT_RANGE = 0; // can it move up/down?
  const VENOMDOG_HORIZ_MAX_SPEED = 2; // in px per frame
  const VENOMDOG_VERT_MAX_SPEED = 0; // no up/down movement
  const VENOMDOG_SPEED_SCALE = 1000; // how fast we change speed (bigger is slower, longer, wider motion)

  this.state = {
    'isFlying': false,
    'isOnGround': false,
    'isIdle': false, // starting state?
    'isInMotion': false,
    'isMovingLeft': false,
    'isCrouching': false,
    'isFacingUp': false,
    'isAttacking': false, // once we bark, lunge at player!
    'isDefending': false,
    'isAnimating': false,
    'isHurt': false,
    'isDead': false,
    'isPatrolling': true // walk back and forth horizontally, with stops at the ends
  };

  this.boundingBox = {}

  this.radius = 35;
  this.width = 240;
  this.height = 120;
  this.ang = 0;
  this.removeMe = false;

  this.tickCount = 0;
  this.ticksPerFrame = 15;
  this.currentAttackTicks = 0;
  this.spriteAnim = null;
  this.framesAnim = null;

  // Animation generation. 
  this.idleAnim = new SpriteSheetClass(venomDogIdle, this.width, this.height, true, 2, 13);
  this.walkAnim = new SpriteSheetClass(venomDogWalk, this.width, this.height, true, 2, 13); // FIXME no art for this
  this.biteAnim = new SpriteSheetClass(venomDogBite, this.width, this.height, true, 5, 13);
  this.frameRow = 0;

  //sets all values of state object to false
  this.setStateToFalse = function () {
    for (key in this.state) {
      this.state[key] = false;
    }
  };

  //sets value of given key pf state object to value passed
  this.setStateValueTo = function (key, val) {
    if (this.state.hasOwnProperty(key)) {
      // console.log("Setting" + key + ":" + val);
      this.state[key] = val;
    }
  };

  this.changeState = function (key) {
    this.setStateToFalse(); // clear others
    //this.setStateValueTo(key, true); // doesnt work?
    this.state[key] = true;
  }

  this.resetHurt = function () {
    this.state.isHurt = false;
  }

  this.takeDamage = function (howMuch) {
    console.log("venom dog damage received: HP = " + this.health + " - " + howMuch);
    if (this.health > 0 && !this.state.isHurt) {
      this.health -= howMuch;
      this.state.isHurt = true;
      dogEnemyHitEffect(this.pos.x, this.pos.y);
      // knockback
      this.pos.x += Math.random() * 8 - 4;
      this.pos.y += Math.random() * 8 - 6;
    }
    if (this.health <= 0) {
      console.log("VENOM DOG HAS 0 HP");
      dogEnemyDeathEffect(this.pos.x, this.pos.y);
      this.pos.x = -9999999;
      this.pos.y = -9999999;
      this.state.isDead = true;
    }
    this.resetHurtTimeout = setTimeout(this.resetHurt.bind(this), 1000);
  }

  this.move = function () {

    this.boundingBox.width = this.width;
    this.boundingBox.height = this.height;
    this.boundingBox.x = this.pos.x - this.boundingBox.width / 2;
    this.boundingBox.y = this.pos.y - this.boundingBox.height / 2;

    if (this.state.isDead) return;

    // measure distance to the player
    var distFromPlayer = utils.distance(player.pos, this.pos);

    // close enough to warrant an attack, perhaps?
    if (distFromPlayer < DOG_ATTACK_DISTANCE) {
      if (Math.random() < DOG_ATTACK_FREQUENCY) {
        console.log('GRRRR! venom dog feels like attacking from a distance of ' + Math.round(distFromPlayer));
        strangeEnemySound.play(); // TODO: make a bark sfx
        this.changeState('isAttacking');
      }
    }

    // close enough to hit?
    if (this.reloadFrames > 0) {
      this.reloadFrames--;
    } else {
      if (player.state.isAttacking && (distFromPlayer < 80)) {
        this.takeDamage(1);
        this.reloadFrames = ENEMY_VENOMDOG_RELOAD_FRAMES;
      }
      // close enough to get hit?
      else if (!player.state.isAttacking && distFromPlayer < 40) {
        player.takeDamage(1);
        this.reloadFrames = ENEMY_VENOMDOG_RELOAD_FRAMES;
      }
    }

    if (this.state.isPatrolling) { // walk back and forth horizontally with stops between direction changes

      var phaseOffset = this.spawnPoint.x * 5555 + this.spawnPoint.x * 3213; // randomish
      this.speed.x = Math.cos((performance.now() + phaseOffset) / VENOMDOG_SPEED_SCALE) * VENOMDOG_HORIZ_MAX_SPEED;
      this.speed.y = Math.sin((performance.now() + phaseOffset) / VENOMDOG_SPEED_SCALE) * VENOMDOG_VERT_MAX_SPEED;
      // complete stop in a range so it appears to move less similar to the flying enemy
      if (Math.abs(this.speed.x) < 1) this.speed.x = 0;

    }
    else if (this.state.isAttacking) { // lunging at the player!
      this.currentAttackTicks++;
      if (this.currentAttackTicks > VENOMDOG_MAX_ATTACK_TICKS) {
        this.currentAttackTicks = 0; // reset for next time
        this.changeState("isPatrolling"); // leave attacking state
      }
      this.speed.x = (player.pos.x > this.pos.x ? VENOMDOG_ATTACK_SPEED : -VENOMDOG_ATTACK_SPEED);
      if (distFromPlayer <= VENOMDOG_CANHITPLAYER_DIST) {
        console.log("venom dog successfully bit the player!");
        this.changeState("isPatrolling"); // leave attacking state
      }
    }
    else { // probably isDead

      this.speed.x = 0;
      this.speed.y = 0;
      this.doubleJumpCount = 0;

    }

    // stay within wander range - even if attacking!
    var minx = this.spawnPoint.x - VENOMDOG_HORIZ_RANGE / 2;
    var maxx = this.spawnPoint.x + VENOMDOG_HORIZ_RANGE / 2;
    var miny = this.spawnPoint.y - VENOMDOG_VERT_RANGE / 2;
    var maxy = this.spawnPoint.y + VENOMDOG_VERT_RANGE / 2;
    if (this.pos.x < minx) this.pos.x = minx;
    if (this.pos.x > maxx) this.pos.x = maxx;
    if (this.pos.y < miny) this.pos.y = miny;
    if (this.pos.y > maxy) this.pos.y = maxy;

    /*
  // Checking collisions
  if (this.speed.y < 0 && isPlatformAtPixelCoord(this.pos.x, this.pos.y - this.boundingBox.height / 2)) {
      this.pos.y = (Math.floor(this.pos.y / WORLD_H)) * WORLD_H + this.boundingBox.height / 2;
      this.speed.y = 0;
  }
 
  if (this.speed.x < 0 && isPlatformAtPixelCoord(this.pos.x - this.boundingBox.width / 2, this.pos.y)) {
      this.pos.x = (Math.floor(this.pos.x / WORLD_W)) * WORLD_W + this.boundingBox.width / 2;
      this.speed.x = 0;
  }
 
  if (this.speed.x > 0 && isPlatformAtPixelCoord(this.pos.x + this.boundingBox.width / 2, this.pos.y)) {
      this.pos.x = (1 + Math.floor(this.pos.x / WORLD_W)) * WORLD_W - this.boundingBox.width / 2;
      this.speed.x = 0;
  }
  */

    this.pos.addTo(this.speed);

    //playerWorldHandling(this);

    if (this.spriteAnim != null) {
      this.spriteAnim.update();
    }

    // this.boundingBox = {
    // 	x: this.pos.x - this.width/4,
    // 	y: this.pos.y - this.height/2,
    // 	width: this.width/2,
    // 	height: this.height
    // }
    // this.incrementTick();

  } // end of player.move function



  this.draw = function () {

    if (this.state.isDead) { // don't draw
      return;
    }

    if (this.state['isFlying']) {
      this.spriteAnim = this.flyingAnim;
    }

    if (this.state['isIdle']) {
      this.spriteAnim = this.idleAnim;
    }

    if (this.state['isPatrolling']) {
      if (Math.abs(this.speed.x) > 0) {
        this.spriteAnim = this.walkAnim;
      } else {
        this.spriteAnim = this.idleAnim;
      }
    }

    if (this.state['isAttacking']) {
      this.spriteAnim = this.biteAnim;
    }


    /*
    if (this.state['isIdle']) {
        this.spriteAnim = this.idleAnim;
    }
    if (this.state['isHurt']) {
        this.spriteAnim = this.hurtAnim;
    }
 
    if (this.state['isDead']) {
        this.spriteAnim = this.deadAnim;
    }
    */

    // this code looks backwards, but it is just to match the dog sprite art which faces left by default
    this.state.isMovingLeft = this.speed.x > 0; // flips sprite if needed
    this.state.isMovingRight = (!this.state.isMovingLeft);

    //final drawing of sprite.
    if (this.spriteAnim != null) {
      //TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
      this.spriteAnim.draw(this.spriteAnim.frameIndex, this.frameRow, this.pos.x, this.pos.y, this.ang, this.state.isMovingLeft);
      // console.log(this.spriteAnim.frameIndex);

    }

  }
} // VENOMDOG Class

venomDogClass.prototype = Object.create(entityClass.prototype); // inherit the ini() function etc


/* old code for reference


function venomDogClass() {
    Object.getPrototypeOf(venomDogClass.prototype).constructor.call(this);
    this.toggleDirection = false;
    this.attackPower = ENEMY_DUMB_ATTACK_POWER;
    //Control keys for dumbEnemy
    this.keyHeld_Right = false;
    this.keyHeld_Left = false;
    this.keyHeld_Attack = false;

    this.width = 240;
    this.height = 120;
    // Animation generation. 
    this.idleAnim = new SpriteSheetClass(venomDogIdle, this.width, this.height, true, 2, 13); // 10 frames
    // this.walkAnim = new SpriteSheetClass(dumbEnemyWalkAnim, this.width, this.height, true, 2, 6); // 10 frames

}

venomDogClass.prototype = Object.create(entityClass.prototype);

venomDogClass.prototype.move = function () {
    this.boundingBox.width = this.width / 3;
    this.boundingBox.height = this.height;
    this.boundingBox.x = this.pos.x - this.boundingBox.width / 2;
    this.boundingBox.y = this.pos.y - this.boundingBox.height / 2;

    var current_direction;
    if (this.toggleDirection) {
        this.keyHeld_Left = false;
        this.keyHeld_Right = true;
        current_direction = this.keyHeld_Right;
    }
    else {
        this.keyHeld_Left = true;
        this.keyHeld_Right = false;
        current_direction = this.keyHeld_Left;
    }
    // Unique to
    if (utils.distance(player.pos, this.pos) < 60 ){
        this.keyHeld_Left = false;
        this.keyHeld_Right = false;
        this.keyHeld_Attack = Math.random() < 0.2;
        this.state.isMovingLeft = (player.pos.x - this.pos.x) > 0 ? false : true;
        player.takeDamage(this.attackPower);
    }
    else {
        this.keyHeld_Attack = false;
    }

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
      this.speed.setX(-DUMB_RUN_SPEED);
    }
    //Right movement
    else if (this.keyHeld_Right) {
      //this.setStateToFalse();
      this.setStateValueTo(IN_MOTION, true);
      this.setStateValueTo(MOVING_LEFT, false);
      this.speed.setX(DUMB_RUN_SPEED);
      // this.speed.x = PLAYER_RUN_SPEED;
    }
    else {
      this.setStateValueTo(IN_MOTION, false);
      this.setStateValueTo(IDLE, true);
    }

     if (this.keyHeld_Attack) {
        this.setStateValueTo(IDLE, false);
        this.setStateValueTo(IN_MOTION, false);
        this.setStateValueTo(ATTACKING, true);
        kickSound.play();

        this.boundingBox.width = this.width / 1.5;
        this.boundingBox.x = this.pos.x - this.boundingBox.width / 2;
      }
      else {
        this.setStateValueTo(ATTACKING, false);
      }

    if (this.state.isOnGround && this.state.isAttacking) {
        this.speed.x = 0;
    }


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
    entityWorldHandling(this);




    if (this.spriteAnim != null) {
      this.spriteAnim.update();
    }
} // end of player.move function


venomDogClass.prototype.draw = function () {
    this.spriteAnim = this.idleAnim;
   
    //final drawing of sprite.
    if (this.spriteAnim != null) {
        //TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
        this.spriteAnim.draw(this.spriteAnim.frameIndex, this.frameRow, this.pos.x, this.pos.y, this.ang, this.state.isMovingLeft);
        // console.log(this.spriteAnim.frameIndex);
    }
}

*/