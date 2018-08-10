function slimeBallClass(posiitonX,positionY) {
    Object.getPrototypeOf(slimeBallClass.prototype).constructor.call(this);
    this.toggleDirection = false;
    this.width = 10;
    this.height = 16;
    this.pos = vector.create(posiitonX, positionY);
    // Animation generation. 
    this.idleAnim = new SpriteSheetClass(slimeBallPic, this.width, this.height, false, 2, 120);
}

slimeBallClass.prototype = Object.create(entityClass.prototype);

slimeBallClass.prototype.move = function () {

  if (this.spriteAnim != null) {
      this.spriteAnim.update();
  }
}

slimeBallClass.prototype.draw = function () {
    if (this.state[IDLE]) {
        this.spriteAnim = this.idleAnim;
    }
   
    //final drawing of sprite.
    if (this.spriteAnim != null) {
        this.spriteAnim.draw(this.spriteAnim.frameIndex, this.frameRow, this.pos.x, this.pos.y, this.ang);
        // console.log(this.spriteAnim.frameIndex);
    }
}