// const GROUND_FRICTION = 0.7;
// const AIR_RESISTANCE = 0.975;
// const RUN_SPEED = 3.0;
// const JUMP_POWER = 8;
// const DOUBLE_JUMP_POWER = 10; // we need more force to counteract gravity in air
// const GRAVITY = 0.55;
// const MAX_AIR_JUMPS = 1; // double jump
// const PLAYER_COLLISION_PADDING = 5;

//Has collision code for platform 
//Had properties that help check player Collision
const FLYING_ENEMY_HEALTH = 1;
const PLAYER_HEALTH = 3;
const DUMB_WALK_ENEMY = 1;
const RUNNING_ZOMBIE_ENEMY = 1; 

function entityClass() {
	//Need to check which variables are used outside and only expose them in code. 
    this.pos = vector.create(75, 75);
	this.speed = vector.create(0, 0);
	this.playerPic; // which picture to use
	this.name = "Entity";
	this.health = 5;
	this.valueInWorldIndex = 999; //Change this when inhereiting

	// @todo split up attack-state into multiple states to make playing sounds/animation easier
	this.state = {
	    'isOnGround': true,
		'isIdle': true,
		'isInMotion': false,
		'isMovingLeft': false,  // Required to set character flip.
		'isCrouching': false,
		'isFacingUp': false,    // Might be redundant
		'isAttacking': false,   // Combo punches, kick on 3 continuos punch
		'isDefending': false,
		'isAnimating' : false,  // Used to set state between animation and final.
		'isHurt': false,
		'isDead': false,
		"isFlying": false;
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
	// Need  a key for punches, Other for kick 
	// Combo moves on multiple sucessful hits.
	//Used for animation.
	//TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
	this.frameRow = 0;

	//Used to track sound play and pause.
	this.justPunched = false;
	this.justJumped = false;
	this.justKicked = false;
	this.doubleJumpCount = 0;

	//TODO : Might not need this
	this.checkAnimationCompletion = function(){}

	//sets all values of state object to false
	this.setStateToFalse = function (){
		for(key in this.state){
			this.state[key] = false;
		}
	};

	//sets value of given key pf state object to value passed
	this.setStateValueTo = function (key, val){
		if(this.state.hasOwnProperty(key)){
			// console.log("Setting" + key + ":" + val);
			this.state[key] = val;
		}
	};

	this.takeDamage = function (howMuch) {
		console.log("Damage received:  " + howMuch + " by " + this.name);
		//TODO: Improve this. Currently only effects health till isHurt is active. 
		if(this.health > 0 && !this.state.isHurt){
			this.health -= howMuch;
			this.state.isHurt = true;
		}
		if (this.health <= 0) {
			console.log("PLAYER HAS 0 HP - todo: gameover/respawn");
			this.state.isDead = true;
			if(	this.name == "Player"){
				setTimeout(this.resetDeadAnimation.bind(this), 500);
			}
		}
		this.resetHurtTimeout = setTimeout(this.resetHurtAnimation.bind(this), 700);
	}

	this.resetHurtAnimation = function(){
		this.state.isHurt = false;
	}

	this.resetDeadAnimation = function(){
		//Reset level data as well. 
		loadLevel(levelOne)
	}

	this.reset = function () {
		this.health = health;
		this.state = {
			'isOnGround': true,
			'isIdle': true,
			'isInMotion': false,
			'isMovingLeft': false, //Required to set character flip.
			'isCrouching': false,
			'isFacingUp': false, //Might be redundant
			'isAttacking': false, //combo punches, kick on 3 continuos punch
			'isDefending': false,
			'isAnimating' : false, // Used to set state between animation and final.
			'isHurt': false,
			'isDead': false
		};
		addEntityToWorld();
	} // end of playerReset func


	function addEntityToWorld(){
		for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
			for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if (worldGrid[arrayIndex] == this.valueInWorldIndex) {
					worldGrid[arrayIndex] = WORLD_BACKGROUND;
					// this.ang = -Math.PI/2;
					this.pos.x = eachCol * WORLD_W + WORLD_W / 2;
					this.pos.y = eachRow * WORLD_H + WORLD_H / 2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO" + this.name + "START FOUND!");
	}

	this.move = function () {
		this.boundingBox.width = this.width/3;
		this.boundingBox.height = this.height;
		this.boundingBox.x = this.pos.x - this.boundingBox.width/2;
		this.boundingBox.y = this.pos.y - this.boundingBox.height/2;
	} // end of player.move function

	this.draw = function () {
		//TODO : Each animation should take atmost 1 sec to complete. 
		//TODO : Clean all code. 
		//TODO : Jump, Attack animation should work Only once
		if (this.state['isIdle']) {
			this.spriteAnim = this.idleAnim;
			// this.framesAnim = this.spriteAnim.frameNum;
		}
		if (this.spriteAnim !=null) {			
			//TODO :Change this.frameRow and used it for animating consilated spritesheet of player character
			this.spriteAnim.draw(this.spriteAnim.frameIndex, this.frameRow, this.pos.x, this.pos.y, this.ang, this.state.isMovingLeft);
			// console.log(this.spriteAnim.frameIndex);
		}
	}
}

