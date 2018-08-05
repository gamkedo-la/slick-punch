const DUMB_RUN_SPEED = 0.8;

function dumbEnemyClass() {
    Object.getPrototypeOf(dumbEnemyClass.prototype).constructor.call(this);
    this.toggleDirection = false;
    this.attackPower = ENEMY_DUMB_ATTACK_POWER;
    //Control keys for dumbEnemy
    this.keyHeld_Right = false;
    this.keyHeld_Left = false;
    this.keyHeld_Attack = false;

    // Animation generation. 
    this.walkAnim = new SpriteSheetClass(playerWalkAnim, this.width, this.height, true, 10, 10); // 10 frames
    this.punchAnim = new SpriteSheetClass(playerPunchAnim, this.width, this.height, true, 4); //4frames
    this.idleAnim = new SpriteSheetClass(playerIdleAnim, this.width, this.height, true, 7); //7 frames
}

dumbEnemyClass.prototype = Object.create(entityClass.prototype);

dumbEnemyClass.prototype.move = function () {
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

    if (utils.distance(player.pos, this.pos) < 60) {
        this.keyHeld_Left = false;
        this.keyHeld_Right = false;
        this.keyHeld_Attack = Math.random() * 2 < 0.2;
        this.state.isMovingLeft = (player.pos.x - this.pos.x) > 0 ? false : true;
        player.takeDamage(this.attackPowerpp);
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
        punchSound.play();
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


dumbEnemyClass.prototype.draw = function () {
    if (this.state['isInMotion']) {
        this.spriteAnim = this.walkAnim;
    }

    if (this.state['isAttacking']) {
        this.spriteAnim = this.punchAnim;
        if (this.state.isCrouching) {
            if (this.keyHeld_Up) {
                this.spriteAnim = this.uppercutAnim;
            }
            else {
                this.spriteAnim = this.crouchedKickAnim;
            }
        }
        // this.attackAnimArr[Math.floor(Math.random()*this.attackAnimArr.length)];
    }
    //Once crouch animation complete. Call a function to draw in fixed state instead of animation. 
    //final drawing of sprite.
    if (this.spriteAnim != null) {
        //TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
        this.spriteAnim.draw(this.spriteAnim.frameIndex, this.frameRow, this.pos.x, this.pos.y, this.ang, this.state.isMovingLeft);
        // console.log(this.spriteAnim.frameIndex);
    }
}