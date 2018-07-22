// Flying enemy class

function flyingEnemyClass(x, y) {

    console.log("Spawning a flyingEnemy at " + x + "," + y);

    this.pos = vector.create(x, y);
    this.speed = vector.create(0, 0);

    this.playerPic; // which picture to use
    this.name = "Flying Enemy";
    this.health = 1;

    this.spawnPoint = vector.create(x, y);
    const FLYING_HORIZ_RANGE = 100; // px from spawnPoint
    const FLYING_VERT_RANGE = 25;
    const FLYING_HORIZ_MAX_SPEED = 2; // in px per frame
    const FLYING_VERT_MAX_SPEED = 0.5;
    const FLYING_SPEED_SCALE = 400; // how fast we change speed

    this.state = {
        'isFlying': true,
        'isOnGround': false,
        'isIdle': true,
        'isInMotion': false,
        'isMovingLeft': false,
        'isCrouching': false,
        'isFacingUp': false,
        'isAttacking': false,
        'isDefending': false,
        'isAnimating': false,
        'isHurt': false,
        'isDead': false
    };

    this.boundingBox = {}

    this.radius = 35;
    this.width = 80;
    this.height = 80;
    this.ang = 0;
    this.removeMe = false;

    this.tickCount = 0;
    this.ticksPerFrame = 15;
    this.spriteAnim = null;
    this.framesAnim = null;

    // Animation generation. 
    this.flyingAnim = new SpriteSheetClass(flyingEnemyAnim, this.width, this.height, true, 3); // 3 frames
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


    this.takeDamage = function (howMuch) {
        console.log("flyingEnemy damage received: " + howMuch);
        if (this.health > 0 && !this.state.isHurt) {
            this.health -= howMuch;
            this.state.isHurt = true;
        }
        if (this.health <= 0) {
            console.log("FLYING ENEMY HAS 0 HP - todo: gameover/respawn");
            this.state.isDead = true;
        }
    }

    this.move = function () {

        this.boundingBox.width = this.width;
        this.boundingBox.height = this.height;
        this.boundingBox.x = this.pos.x - this.boundingBox.width / 2;
        this.boundingBox.y = this.pos.y - this.boundingBox.height / 2;

        if(utils.distance(player.pos,this.pos) < 30){
            if(player.state.isAttacking){
                this.takeDamage(1);
            }
            else{
                player.takeDamage(1);
            }
        }

        if (this.state['isFlying']) {

            var phaseOffset = this.spawnPoint.x * 5555 + this.spawnPoint.x * 3213; // randomish
            this.speed.x = Math.cos((performance.now() + phaseOffset) / FLYING_SPEED_SCALE) * FLYING_HORIZ_MAX_SPEED;
            this.speed.y = Math.sin((performance.now() + phaseOffset) / FLYING_SPEED_SCALE) * FLYING_VERT_MAX_SPEED;

        }
        else { // probably isDead

            this.speed.x = 0;
            this.speed.y = 0;
            this.doubleJumpCount = 0;

        }

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

        // stay within wander range
        var minx = this.spawnPoint.x - FLYING_HORIZ_RANGE / 2;
        var maxx = this.spawnPoint.x + FLYING_HORIZ_RANGE / 2;
        var miny = this.spawnPoint.y - FLYING_VERT_RANGE / 2;
        var maxy = this.spawnPoint.y + FLYING_VERT_RANGE / 2;
        if (this.pos.x < minx) this.pos.x = minx;
        if (this.pos.x > maxx) this.pos.x = maxx;
        if (this.pos.y < miny) this.pos.y = miny;
        if (this.pos.y > maxy) this.pos.y = maxy;


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

        if (this.state['isFlying']) {
            this.spriteAnim = this.flyingAnim;
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

        //final drawing of sprite.
        if (this.spriteAnim != null) {
            //TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
            this.spriteAnim.draw(this.spriteAnim.frameIndex, this.frameRow, this.pos.x, this.pos.y, this.ang, this.state.isMovingLeft);
            // console.log(this.spriteAnim.frameIndex);

        }

    }
} // flyingEnemy Class

