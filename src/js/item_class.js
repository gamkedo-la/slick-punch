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
		return "Slime";
	}

	//use as lava
	if (this.tileKindHere == RED_TILE) {
		return "Lava";
	}

	if (this.tileKindHere == GREEN_VINE_WEBS) {
		return "Webs";
	}

	if (this.tileKindHere == THORNS) {
		return "Thorns";
	}

	if (this.tileKindHere == VINES_POISONOUS) {
		return "Vines";
	}

	if (this.tileKindHere == PICKUP) {
		return "Diamond";
	}

	if (this.tileKindHere == KEY_RED) {
		return "Red Key";

	}

	if (this.tileKindHere == KEY_BLUE) {
		return "Blue Key";
	}

	if (this.tileKindHere == KEY_GREEN) {
		return "Green Key";
	}

  if (this.tileKindHere == DOOR_GREEN) {
    return "Green Door";
  }

  if (this.tileKindHere == DOOR_RED) {
    return "Red Door";
  }

  if (this.tileKindHere == KEY_BLUE) {
    return "Blue Door";
  }

  if (this.tileKindHere == KEY_BLUE) {
    return "Lower Door";
  }
}

ItemClass.prototype.returnEffect = function () {

	// debug info works great but spams the log every frame and kills my vidual studio
	//console.log("You touched" + this.name); 

	if (this.name == "Slime") {
    console.log("Player hurt by a Slime");
    player.takeDamage(2);
    player.keyHeld_Jump = true;
    setTimeout(function(){player.keyHeld_Jump = true;}, 500);
	}

	if (this.name == "Webs") {
     console.log("Player hurt by a webs");
    player.takeDamage(1);
    player.keyHeld_Jump = true;
    setTimeout(function(){player.keyHeld_Jump = true;}, 500);
	}

	if (this.name == "Thorns") {
    console.log("Player hurt by a thorns");
    player.takeDamage(2);
    player.keyHeld_Jump = true;
    setTimeout(function(){player.keyHeld_Jump = true;}, 500);
	}

	if (this.name == "Vines") {
    console.log("Player hurt by a vines");
    player.takeDamage(2);
    player.keyHeld_Jump = true;
    setTimeout(function(){player.keyHeld_Jump = true;}, 500);
	}

	if (this.name == "Diamond") {
		console.log("Diamond touched! Gaining health.");
		player.health++;
		worldGrid[this.worldIndex] = -1;
		scorePickupSound.play();
		this.remove = true;
	}

	if (this.name == "Red Key") {
    player.key_red = true;
    console.log("Got a Red key");
    worldGrid[this.worldIndex] = -1;
    playerKeySound.play();
    this.remove = true;
	}

	if (this.name == "Blue Key") {
    player.key_blue = true;
    console.log("Got a Blue key");
    worldGrid[this.worldIndex] = -1;
    playerKeySound.play();
    this.remove = true;
	}

	if (this.name == "Green Key") {
    player.key_green = true;
    console.log("Got a green key");
    worldGrid[this.worldIndex] = -1;
    playerKeySound.play();
    this.remove = true;
	}

  if(this.name == "Red Door"){
    if(player.key_red){
      console.log(this.name + "unlocked");
      worldGrid[this.worldIndex] = -1;
      //play some sound
      this.remove = true;
    }
  }

  if(this.name == "Green Door"){
    if(player.key_green){
      console.log(this.name + "unlocked");
      worldGrid[this.worldIndex] = -1;
      //play some sound
      this.remove = true;
    }
  }

  if(this.name == "Blue Door"){
    if(player.key_blue){
      console.log(this.name + "unlocked");
      worldGrid[this.worldIndex] = -1;
      //play some sound
      this.remove = true;
    }
  }

  if(this.name == "Lower Door"){
    if(player.key_blue ||  player.key_red || player.key_green){
      console.log(this.name + "unlocked");
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