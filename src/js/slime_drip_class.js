function slimeDripClass() {
    Object.getPrototypeOf(slimeDripClass.prototype).constructor.call(this);
    this.toggleDirection = false;
    this.width = 35;
    this.height = 35;
    this.spawnedBall = false;
    // Animation generation. 
    this.idleAnim = new SpriteSheetClass(slimeBallDripAnim, WORLD_W, WORLD_H, true, 8, 16);
}

slimeDripClass.prototype = Object.create(entityClass.prototype);

slimeDripClass.prototype.move = function () {
  if (this.spriteAnim != null) {
      this.spriteAnim.update();
      if (this.spriteAnim.frameIndex == 0) {
          this.spawnedBall = false;
      } 
      if (this.spriteAnim.frameIndex == 7 &&
          !this.spawnedBall) {
        this.spawnedBall = true;
        var Xoffset = 1;
        var slimeBall = new slimeBallClass(this.pos.x + Xoffset,this.pos.y + WORLD_H/3); // hard coded for proof of concept
        entityList.push(slimeBall);
      }
      
  }
}

slimeDripClass.prototype.draw = function () {
    if (this.state[IDLE]) {
        this.spriteAnim = this.idleAnim;
    }
   
    //final drawing of sprite.
    if (this.spriteAnim != null) {
        this.spriteAnim.draw(this.spriteAnim.frameIndex, this.frameRow, this.pos.x, this.pos.y, this.ang);
        // console.log(this.spriteAnim.frameIndex);
    }
}