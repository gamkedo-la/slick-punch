function boxClass() {
    Object.getPrototypeOf(boxClass.prototype).constructor.call(this);
    this.toggleDirection = false;
    this.width = 35;
    this.height = 35;
    // Animation generation. 
    this.idleAnim = new SpriteSheetClass(crateBoxAnim, this.width, this.height, false, 1, 120);
    this.breakingAnim = new SpriteSheetClass(crateBoxAnim, this.width, this.height, false, 5, 10);
}

boxClass.prototype = Object.create(entityClass.prototype);

boxClass.prototype.move = function () {

  if (this.health <= 0) {
      this.state[HURT] = true;
      this.state[IDLE] = false;
  }

  if (player.state.isAttacking && (utils.distance(player.pos, this.pos) < 80) && this.state.isIdle) {
      this.takeDamage(1);
      this.breakingAnim.frameIndex = 1; 
  }

  if (this.spriteAnim != null) {
      this.spriteAnim.update();
  }
}

boxClass.prototype.draw = function () {
    if (this.state[IDLE]) {
        this.spriteAnim = this.idleAnim;
    }

    if (this.state[HURT]) {
        this.spriteAnim = this.breakingAnim;
    }
   
    //final drawing of sprite.
    if (this.spriteAnim != null) {
        this.spriteAnim.draw(this.spriteAnim.frameIndex, this.frameRow, this.pos.x, this.pos.y, this.ang);
        // console.log(this.spriteAnim.frameIndex);
    }
}