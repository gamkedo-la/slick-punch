//TODO: change name to itemClass and change all reference
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
}

ItemClass.prototype.remove = function () {
	for (var i = length; i >= 0; i--) {
		// if(){

		//    }
	}
}

ItemClass.prototype.returnEffect = function () {

	// debug info works great but spams the log every frame and kills my vidual studio
	//console.log("You touched" + this.name); 

	if (this.name == "Slime") {
	}

	if (this.name == "Lava") {
	}

	if (this.name == "Webs") {
	}

	if (this.name == "Thorns") {
	}

	if (this.name == "Vines") {
	}

	if (this.name == "Diamond") {
		console.log("Diamond touched! Gaining health.");
		this.health++;
		worldGrid[this.worldIndex] = -1;
		scorePickupSound.play();
		this.remove();
	}

	if (this.name == "Red Key") {
	}

	if (this.name == "Blue Key") {
	}

	if (this.name == "Green Key") {
	}
}

window.obArr = itemArr;