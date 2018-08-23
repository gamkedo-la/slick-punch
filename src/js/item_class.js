const WEBS_TEXT = "Webs";
const THORNS_TEXT = "Thorns";
const VINES_TEXT = "Vines";
const DIAMOND_TEXT = "Diamond";
const RED_KEY_TEXT = "Red Key";
const BLUE_KEY_TEXT = "Blue Key";
const GREEN_KEY_TEXT = "Green Key";
const GREEN_DOOR_TEXT = "Green Door";
const RED_DOOR_TEXT = "Red Door";
const BLUE_DOOR_TEXT = "Blue Door";
const LOWER_DOOR_TEXT = "Lower Door";
const SLIME_TEXT = "Slime";
var itemArr = [];

function ItemClass(posX, posY, width, height, tileKindHere, worldIndex) {
	this.tileKindHere = tileKindHere;
	this.worldIndex = worldIndex;

	this.boundingBox = {
		width: width,
		height: height,
		x: posX,
		y: posY
	};
	this.name = this.setName();
  this.remove = false;
}

ItemClass.prototype.setName = function () {
	if (this.tileKindHere == SLIME_PIT_LEFT_TOP ||
		this.tileKindHere == SLIME_PIT_MIDDLE_TOP ||
		this.tileKindHere == SLIME_PIT_RIGHT_TOP ||
		this.tileKindHere == SLIME_PIT_LEFT_TOP_ANIM ||
		this.tileKindHere == SLIME_PIT_MIDDLE_TOP_ANIM ||
		this.tileKindHere == SLIME_PIT_RIGHT_TOP_ANIM ||
		this.tileKindHere == SLIME_PIT_LEFT_CENTER ||
		this.tileKindHere == SLIME_PIT_MIDDLE_CENTER ||
		this.tileKindHere == SLIME_PIT_RIGHT_CENTER ||
		this.tileKindHere == SLIME_PIT_LEFT_BOTTOM ||
		this.tileKindHere == SLIME_PIT_MIDDLE_BOTTOM ||
		this.tileKindHere == SLIME_PIT_LEFT_TOP ||
		this.tileKindHere == SLIME_PIT_RIGHT_BOTTOM) {
		return SLIME_TEXT;
	}

	if (this.tileKindHere == GREEN_VINE_WEBS) {
		return WEBS_TEXT;
	}

	if (this.tileKindHere == THORNS) {
		return THORNS_TEXT;
	}

	if (this.tileKindHere == VINES_POISONOUS) {
		return VINES_TEXT;
	}

	if (this.tileKindHere == PICKUP) {
		return DIAMOND_TEXT;
	}

	if (this.tileKindHere == KEY_RED) {
		return RED_KEY_TEXT;
	}

	if (this.tileKindHere == KEY_BLUE) {
		return BLUE_KEY_TEXT;
	}

	if (this.tileKindHere == KEY_GREEN) {
		return GREEN_DOOR_TEXT;
	}

  if (this.tileKindHere == DOOR_RED) {
    // console.log("Name set");
    return RED_DOOR_TEXT;
  }

  if (this.tileKindHere == DOOR_BLUE) {
    // console.log("Name set");
    return BLUE_DOOR_TEXT;
  }

  if (this.tileKindHere == DOOR_LOWER) {
    // console.log("Name set");
    return LOWER_DOOR_TEXT;
  }
}

ItemClass.prototype.returnEffect = function () {
	// debug info works great but spams the log every frame and kills my vidual studio
	//console.log("You touched" + this.name); 
	if (this.name == SLIME_TEXT) {
    // console.log("Player hurt by a Slime");
    player.takeDamage(2);
    player.keyHeld_Jump = true;
    setTimeout(function(){player.keyHeld_Jump = true;}, 500);
	}

	if (this.name == WEBS_TEXT) {
    // console.log("Player hurt by a webs");
    player.takeDamage(1);
    player.keyHeld_Jump = true;
    setTimeout(function(){player.keyHeld_Jump = true;}, 500);
	}

	if (this.name == THORNS_TEXT) {
    // console.log("Player hurt by a thorns");
    player.takeDamage(2);
    player.keyHeld_Jump = true;
    setTimeout(function(){player.keyHeld_Jump = true;}, 500);
	}

	if (this.name == "Vines") {
    // console.log("Player hurt by a vines");
    player.takeDamage(2);
    player.keyHeld_Jump = true;
    setTimeout(function(){player.keyHeld_Jump = true;}, 500);
	}

	if (this.name == DIAMOND_TEXT) {
		// console.log("Diamond touched! Gaining health.");
		player.health++;
		worldGrid[this.worldIndex] = -1;
		scorePickupSound.play();
		this.remove = true;
	}

	if (this.name == RED_KEY_TEXT) {
    player.key_red = true;
    console.log("Got a Red key");
    worldGrid[this.worldIndex] = -1;
    playerKeySound.play();
    this.remove = true;
	}

	if (this.name == BLUE_KEY_TEXT) {
    player.key_blue = true;
    console.log("Got a Blue key");
    worldGrid[this.worldIndex] = -1;
    playerKeySound.play();
    this.remove = true;
	}

	if (this.name == GREEN_DOOR_TEXT) {
    player.key_green = true;
    console.log("Got a green key");
    worldGrid[this.worldIndex] = -1;
    playerKeySound.play();
    this.remove = true;
	}

  if(this.name == RED_DOOR_TEXT){
    if(player.key_red){
      player.lowerDoorRemove = true;
      player.key_red = false
      console.log(this.name + "unlocked");
      worldGrid[this.worldIndex] = -1;
      //play some sound
      this.remove = true;
    }
  }

  if(this.name == "Green Door"){
    if(player.key_green){
      player.lowerDoorRemove = true;
      player.key_green = false
      console.log(this.name + "unlocked");
      worldGrid[this.worldIndex] = -1;
      //play some sound
      this.remove = true;
    }
  }

  if(this.name == BLUE_DOOR_TEXT){
    if(player.key_blue){
      player.lowerDoorRemove = true;
      player.key_blue = false
      console.log(this.name + "unlocked");
      worldGrid[this.worldIndex] = -1;
      //play some sound
      this.remove = true;
    }
  }

  if(this.name == LOWER_DOOR_TEXT){
    if(player.lowerDoorRemove){
      player.lowerDoorRemove = false;
      console.log(this.name + "removed");
      worldGrid[this.worldIndex] = -1;
      //play some sound
      this.remove = true;
    }
  }
}

function updateItemList(){
  for (var i = itemArr.length - 1; i >= 0; i--) {
    if(itemArr[i].remove){
      itemArr.splice(i,1);
    }
  }
}

window.obArr = itemArr;