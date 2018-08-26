const DUMB_RUN_SPEED = 0.6;
const ENEMY_DUMB_RELOAD_FRAMES = 90;

function dumbEnemyClass() {
    Object.getPrototypeOf(dumbEnemyClass.prototype).constructor.call(this);
    this.toggleDirection = false;
    this.attackPower = ENEMY_DUMB_ATTACK_POWER;
    //Control keys for dumbEnemy
    this.keyHeld_Right = false;
    this.keyHeld_Left = false;
    this.keyHeld_Attack = false;
    this.reloadFrames = 0;
    // Animation generation.
    this.width = 80;
    this.height = 80; 
    this.walkAnim = new SpriteSheetClass(dumbEnemyWalkAnim, this.width, this.height, true, 4, 30); // 3 frames
    this.punchAnim = new SpriteSheetClass(dumbEnemyAttackAnim, this.width, this.height, true, 3, 10); //3frames
}

dumbEnemyClass.prototype = Object.create(entityClass.prototype);

dumbEnemyClass.prototype.move = function () {
    this.setInitialBoundingBox(this.width/2  , this.height);
    this.setWorldPhysics();

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
        this.keyHeld_Attack = (this.reloadFrames <= 0);
        this.state.isMovingLeft = (player.pos.x - this.pos.x) > 0 ? false : true;
    }
    else {
        this.keyHeld_Attack = false;
    }

    //Left movement
    if (this.keyHeld_Left) {
      //this.setStateToFalse(); //setting every value of object to false; // might be buggy
      this.setStateValueTo(IN_MOTION, true);
      this.setStateValueTo(IDLE, false);
      this.setStateValueTo(MOVING_LEFT, true);
      this.speed.setX(-DUMB_RUN_SPEED);
    }
    //Right movement
    else if (this.keyHeld_Right) {
      //this.setStateToFalse();
      this.setStateValueTo(IN_MOTION, true);
      this.setStateValueTo(IDLE, false);
      this.setStateValueTo(MOVING_LEFT, false);
      this.speed.setX(DUMB_RUN_SPEED);
      // this.speed.x = PLAYER_RUN_SPEED;
    }
    else {
      this.setStateValueTo(IN_MOTION, false);
      this.setStateValueTo(IDLE, true);
    }

     if(this.reloadFrames > 0) {
        this.reloadFrames--;
        // console.log("countdown");
        this.setStateValueTo(IDLE, true);
        this.setStateValueTo(ATTACKING, false);
     } else if (this.keyHeld_Attack) {
        player.takeDamage(this.attackPower);
        this.reloadFrames = ENEMY_DUMB_RELOAD_FRAMES;
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

    this.entityPlatformHandling();
    this.pos.addTo(this.speed) // same as above, but for vertical
    this.enemyWorldHandling();

    if (this.spriteAnim != null) {
      this.spriteAnim.update();
    }
} // end of player.move function

dumbEnemyClass.prototype.enemyWorldHandling = function () {
    var worldCol = Math.floor(this.pos.getX() / WORLD_W);
    var worldRow = Math.floor(this.pos.getY() / WORLD_H);
    var tileHere = returnTileTypeAtColRow(worldCol, worldRow);

    if (tileHere == WORLD_ENEMY_DUMB_DEST) {
      this.toggleDirection = !this.toggleDirection;
    }
}

dumbEnemyClass.prototype.draw = function () {
    if (this.state[IN_MOTION]) {
        this.spriteAnim = this.walkAnim;
    }

    if (this.state[ATTACKING]) {
        this.spriteAnim = this.punchAnim;
    }
    //Once crouch animation complete. Call a function to draw in fixed state instead of animation. 
    //final drawing of sprite.
    if (this.spriteAnim != null) {
        //TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
        this.spriteAnim.draw(this.spriteAnim.frameIndex, this.frameRow, this.pos.x, this.pos.y, this.ang, this.state.isMovingLeft);
        //console.log(this.spriteAnim.frameIndex);
    }
}