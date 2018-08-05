// const GROUND_FRICTION = 0.7;
// const AIR_RESISTANCE = 0.975;
const DUMB_RUN_SPEED = 0.8;
// const JUMP_POWER = 8;
// const DOUBLE_JUMP_POWER = 10; // we need more force to counteract gravity in air
// const GRAVITY = 0.55;
// const MAX_AIR_JUMPS = 1; // double jump
// const PLAYER_COLLISION_PADDING = 5;


function dumbEnemyClass() {
    this.pos = vector.create(75, 75);
    this.speed = vector.create(0, 0);
    this.playerPic; // which picture to use
    this.name = "dumb Enemy";
    this.health = 3;
    this.toggleDirection = false;

    // @todo split up attack-state into multiple states to make playing sounds/animation easier
    this.state = {
        'isOnGround': true,
        'isIdle': true,
        'isInMotion': false,
        'isMovingLeft': false, //Required to set character flip.
        'isAttacking': false, //combo punches, kick on 3 continuos punch
        'isAnimating': false, // Used to set state between animation and final.
        'isDead': false
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

    this.punchFrameCount = 4;

    //Control keys for player
    this.keyHeld_Right = false;
    this.keyHeld_Left = false;
    this.keyHeld_Attack = false;

    // Animation generation. 
    this.walkAnim = new SpriteSheetClass(playerWalkAnim, this.width, this.height, true, 10, 10); // 10 frames
    this.punchAnim = new SpriteSheetClass(playerPunchAnim, this.width, this.height, true, this.punchFrameCount); //4frames
    this.idleAnim = new SpriteSheetClass(playerIdleAnim, this.width, this.height, true, 7); //7 frames
    //TODO : Used for combo moves
    this.attackAnimArr = [this.highKickAnim, this.leftJabAnim, this.punchAnim]

    //Used for animation.
    //TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
    this.frameRow = 0;

    //Used to track sound play and pause.
    this.justPunched = false;
    this.justJumped = false;
    this.justKicked = false;
    this.doubleJumpCount = 0;

    //TODO : Might not need this
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
        console.log("Damage received: " + howMuch);
        if (this.health > 0 && !this.state.isHurt) {
            this.health -= howMuch;
            this.state.isHurt = true;
            enemyHitEffect(this.pos.x, this.pos.y);
        }
        if (this.health <= 0) {
            console.log("Enemy HAS 0 HP - todo: gameover/respawn");
            this.state.isDead = true;
            setTimeout(this.resetDeadAnimation.bind(this), 500);
            enemyDeathEffect(this.pos.x, this.pos.y);
        }
        this.resetHurtTimeout = setTimeout(this.resetHurtAnimation.bind(this), 1000);
    }


    this.resetHurtAnimation = function () {
        this.state.isHurt = false;
    }

    this.resetDeadAnimation = function () {
        // loadLevel(levelOne);
    }


    this.reset = function (whichImage, playerName, health) {
        this.name = playerName;
        this.playerPic = whichImage;
        this.health = health;
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
            'isDead': false

        };
        this.counter = 0;
        for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if (worldGrid[arrayIndex] == WORLD_ENEMY_DUMB_START) {
                    worldGrid[arrayIndex] = WORLD_BACKGROUND;
                    // this.ang = -Math.PI/2;
                    this.pos.x = eachCol * WORLD_W + WORLD_W / 2;
                    this.pos.y = eachRow * WORLD_H + WORLD_H / 2;
                    return;
                } // end of player start if
            } // end of col for
        } // end of row for
        console.log("NO ENEMY START FOUND!");
    } // end of playerReset func


    this.move = function () {

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
            this.keyHeld_Attack = Math.random() > 0.2;
            this.state.isMovingLeft = (player.pos.x - this.pos.x) > 0 ? false : true;

            player.takeDamage(1);
        }
        else {
            this.keyHeld_Attack = false;
        }

        if (this.state['isOnGround']) {
            this.speed.x *= GROUND_FRICTION;
            this.doubleJumpCount = 0;
        }
        else { // in the air
            this.speed.x *= AIR_RESISTANCE;
            this.speed.y += GRAVITY;
            // improve this
            if (this.speed.y > this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING) {
                this.speed.y = this.boundingBox.height / 2 + PLAYER_COLLISION_PADDING;
            }
        }


        //Left movement
        if (this.keyHeld_Left) {
            //this.setStateToFalse(); //setting every value of object to false; // might be buggy
            this.setStateValueTo("isInMotion", true);
            this.setStateValueTo("isMovingLeft", true);
            this.speed.x = -DUMB_RUN_SPEED;
        }
        //Right movement
        else if (this.keyHeld_Right) {
            //this.setStateToFalse();
            this.setStateValueTo("isInMotion", true);
            this.setStateValueTo("isMovingLeft", false);
            this.speed.x = DUMB_RUN_SPEED;
        }
        else {
            this.setStateValueTo("isInMotion", false);
            this.setStateValueTo("isIdle", true);
        }

        if (this.keyHeld_Attack) {
            this.setStateValueTo("isIdle", false);
            this.setStateValueTo("isInMotion", false);
            this.setStateValueTo("isAttacking", true);
            if (!this.punchTimer) {
                this.punchTimer = this.punchFrameCount;
                // playPunchSound();
            }
            else {
                this.punchTimer--;
            }
            this.boundingBox.width = this.width / 1.5;
            this.boundingBox.x = this.pos.x - this.boundingBox.width / 2;

            if (this.keyHeld_Up && this.state.isCrouching) {
                // this.speed.y -= 0.05;
                // this.state.isOnGround = false;
            }
        }
        else {
            this.setStateValueTo("isAttacking", false);
            this.punchTimer = false;
        }


        // avoid multiple jumps from the same keypress
        this.keyHeld_Up_lastframe = this.keyHeld_Jump;
        if (!this.state.isAttacking) {
            this.justPunched = false;
        } else {
            this.justPunched = true;
        }

        if (this.state['isOnGround']) {
            this.justJumped = false;
        }
        else {
            this.justJumped = true;
        }

        if (this.state.isOnGround && this.state.isAttacking) {
            this.speed.x = 0;
        }

        //Checking if player is falling or jumping.
        if (this.speed.y < 0 && isPlatformAtPixelCoord(this.pos.x, this.pos.y - this.boundingBox.height / 2)) {
            this.pos.y = (Math.floor(this.pos.y / WORLD_H)) * WORLD_H + this.boundingBox.height / 2;
            this.speed.y = 0;
        }

        if (this.speed.y > 0 && isPlatformAtPixelCoord(this.pos.x, this.pos.y + this.height / 2 - PLAYER_COLLISION_PADDING * 2)) {

            this.pos.y = (1 + Math.floor(this.pos.y / WORLD_H)) * WORLD_H - this.height / 2 + PLAYER_COLLISION_PADDING;
            this.setStateValueTo("isOnGround", true);
            this.speed.y = 0;
        }

        //checks for air/empty space
        else if (!isPlatformAtPixelCoord(this.pos.x, this.pos.y + this.height / 2 + PLAYER_COLLISION_PADDING * 2)) {
            // if(!this.state.isAttacking && !this.state.isCrouching){
            //  this.setStateValueTo("isOnGround", false);

            // }
            this.setStateValueTo("isOnGround", false);
        }

        if (this.speed.x < 0 && isPlatformAtPixelCoord(this.pos.x - this.boundingBox.width / 2, this.pos.y)) {
            this.pos.x = (Math.floor(this.pos.x / WORLD_W)) * WORLD_W + this.boundingBox.width / 2;
        }

        if (this.speed.x > 0 && isPlatformAtPixelCoord(this.pos.x + this.boundingBox.width / 2, this.pos.y)) {
            this.pos.x = (1 + Math.floor(this.pos.x / WORLD_W)) * WORLD_W - this.boundingBox.width / 2;
        }

        this.pos.addTo(this.speed) // same as above, but for vertical
        playerWorldHandling(this);
        if (this.spriteAnim != null) {
            this.spriteAnim.update();

        }
        // this.boundingBox = {
        //  x: this.pos.x - this.width/4,
        //  y: this.pos.y - this.height/2,
        //  width: this.width/2,
        //  height: this.height
        // }
        // this.incrementTick();
    } // end of player.move function



    this.draw = function () {
        //TODO : Each animation should take atmost 1 sec to complete. 
        //TODO : Clean all code. 
        //TODO : Jump, Attack animation should work Only once
        //TODO : Crouch should run once and stick to that position. 

        if (this.state['isInMotion']) {
            this.spriteAnim = this.walkAnim;
        }

        if (this.state['isHurt']) {
            this.spriteAnim = this.hurtAnim;
        }

        if (this.state['isDead']) {
            this.spriteAnim = this.deadAnim;
        }
        // if (this.state['isInMotion'] && this.state['isCrouching']) {
        // }
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
}

