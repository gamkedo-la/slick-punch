//TODO: change name to itemClass and change all reference
function ItemClass(posX, posY, width, height, tileKindHere){
	
	this.tileKindHere = tileKindHere;
	this.boundingBox = {
		width : width,
		height: height,
		x: posX,
		y: posY
	};
 	this.name = this.setName();
}

ItemClass.prototype.setName = function(){
	if(this.tileKindHere == SLIME_PIT_LEFT_TOP ||
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
	   this.tileKindHere == SLIME_PIT_RIGHT_BOTTOM){
	   return "Slime";
	}

	//use as lava
	if(this.tileKindHere == RED_TILE ){
		return "Lava";
	}

	if(this.tileKindHere == GREEN_VINE_WEBS){
		return "Webs";
	}

	if(this.tileKindHere == THORNS){
		return "Thorns";
	}

	if(this.tileKindHere == VINES_POISONOUS){
		return "Vines";
	}

	if(this.tileKindHere == PICKUP){
		return "Diamond";
	}

	if(this.tileKindHere == KEY_RED){
		return "Red Key";

	}

	if(this.tileKindHere == KEY_BLUE){
		return "Blue Key";
	}

	if(this.tileKindHere == KEY_GREEN){
		return "Green Key";
	}
}

ItemClass.prototype.returnEffect = function(){
		if(this.name = "Slime"){
			console.log("You touched" + this.name);
		}
		//use as lava
		if(this.name = "Lava"){
			console.log("You touched" + this.name);
		}

		if(this.name = "Webs"){
			console.log("You touched" + this.name);
		}

		if(this.name = "Thorns"){
			console.log("You touched" + this.name);
		}

		if(this.name = "Vines"){
			console.log("You touched" + this.name);		 	
		}

		if(this.name = "Diamond"){
			console.log("You touched" + this.name);
		}

		if(this.name = "Red Key"){
			console.log("You touched" + this.name);
		}

		if(this.name = "Blue Key"){
			console.log("You touched" + this.name);
		}

		if(this.name = "Green Key"){
			console.log("You touched" + this.name);
		}		
	}

window.obArr = ItemArr;