function slimeDripClass() {
    Object.getPrototypeOf(slimeDripClass.prototype).constructor.call(this);
    this.toggleDirection = false;
    this.width = 35;
    this.height = 35;
    // Animation generation. 
    this.idleAnim = new SpriteSheetClass(slimeBallDripAnim, WORLD_W, WORLD_H, true, 8, 10);
}

slimeDripClass.prototype = Object.create(entityClass.prototype);

slimeDripClass.prototype.move = function () {
  if (this.spriteAnim != null) {
      this.spriteAnim.update();
      if (this.spriteAnim.frameIndex == 7) {
        //var slimeBall = new slimeBallClass(123, 75); // hard coded for proof of concept
        //entityList.push(slimeBall);
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