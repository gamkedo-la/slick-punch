// Flying enemy class

function flyingEnemyClass() {
    this.pos = vector.create(75, 75);
    this.speed = vector.create(0, 0);

    this.playerPic; // which picture to use
    this.name = "Flying Enemy";
    this.health = 1;

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
    this.ticksPerFrame = 5;
    this.spriteAnim = null;
    this.framesAnim = null;

    this.keyHeld_Right = false;
    this.keyHeld_Left = false;
    this.keyHeld_Down = false;
    this.keyHeld_Up = false;
    this.keyHeld_Attack = false;
    this.keyHeld_Jump = false;
    this.keyHeld_Defend = false;
    this.keyHeld_Up_lastframe = false;

    this.punchTimer = false;
    this.punchFrameCount = 4;

    this.controlKeyRight = null;
    this.controlKeyLeft = null;
    this.controlKeyUp = null;
    this.controlKeyDown = null;
    this.controlKeyAttack = null;
    this.controlKeyJump = null;
    this.controlKeyDefend = null;

    // Animation generation. 
    this.flyingAnim = new SpriteSheetClass(flyingEnemyAnim, this.width, this.height, 3); // 3 frames
    /*
        this.walkAnim = new SpriteSheetClass(playerWalkAnim, this.width, this.height, 10); // 10 frames
        this.punchAnim = new SpriteSheetClass(playerPunchAnim, this.width, this.height, this.punchFrameCount); //4frames
        this.idleAnim = new SpriteSheetClass(playerIdleAnim, this.width, this.height, 7); //7 frames
        this.idleJumpAnim = new SpriteSheetClass(playerIdleJumpAnim, this.width, this.height, 5); //6 frames
        this.leftJabAnim = new SpriteSheetClass(playerLeftJabAnim, this.width, this.height, 7); //7 frames
        this.walkJumpAnim = new SpriteSheetClass(playerWalkJumpAnim, this.width, this.height, 5); //5 frames
        this.highKickAnim = new SpriteSheetClass(playerHighKickAnim, this.width, this.height, 6); //6 frames
        this.crouchAnim = new SpriteSheetClass(playerCrouchAnim, this.width, this.height, 4, 4, false); //4 frames
        this.explosiveFallAnim = new SpriteSheetClass(playerIdleJumpAnim, this.width, this.height, 8); //8 frames
        this.hurtAnim = new SpriteSheetClass(playerHurtAnim, this.width, this.height, 3); //3 frames
        this.FlipAnim = new SpriteSheetClass(playerFlipAnim, this.width, this.height, 5); //5 frames
        this.rollAnim = new SpriteSheetClass(playerRollAnim, this.width, this.height, 7); //7 frames
        this.crouchedKickAnim = new SpriteSheetClass(playerCrouchedKickAnim, this.width, this.height, 4); //4 frames
        this.uppercutAnim = new SpriteSheetClass(playerUppercutAnim, this.width, this.height, 6); //4 frames
        this.deadAnim = new SpriteSheetClass(playerDeadAnim, this.width, this.height, 8); //8 frames
        this.attackAnimArr = [this.highKickAnim, this.leftJabAnim, this.punchAnim]
    */




    //Used for animation.
    //TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
    this.frameRow = 0;

    //Used to track sound play and pause.
    /*
    this.justPunched = false;
    this.justJumped = false;
    this.justKicked = false;
    this.doubleJumpCount = 0;
    */

    this.checkAnimationCompletion = function () {

    }

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
            setTimeout(this.resetDeadHAnimation.bind(this), 500);
        }

        this.resetHurtTimeout = setTimeout(this.resetHurtAnimation.bind(this), 1000);

    }

    this.resetHurtAnimation = function () {
        this.state.isHurt = false;
    }

    this.move = function () {

        this.boundingBox.width = this.width / 3;
        this.boundingBox.height = this.height;
        this.boundingBox.x = this.pos.x - this.boundingBox.width / 2;
        this.boundingBox.y = this.pos.y - this.boundingBox.height / 2;


        if (this.state['isFlying']) {

            this.speed.x = Math.cos(performance.now()) * 10;
            this.speed.y = Math.cos(performance.now()) * 10;

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

