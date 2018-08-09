//TODO: change name to itemClass and change all reference
function ObjectClass(posX, posY, width, height, tileKindHere){
	
	var tileKindHere = tileKindHere;
	this.boundingBox = {
		width : width,
		height: height,
		x: posX,
		y: posY
	};

	this.setName = function(){
		if(tileKindHere == SLIME_PIT_LEFT_TOP ||
		   tileKindHere == SLIME_PIT_MIDDLE_TOP ||
		   tileKindHere == SLIME_PIT_RIGHT_TOP ||
		   tileKindHere == SLIME_PIT_LEFT_TOP_ANIM ||
		   tileKindHere == SLIME_PIT_MIDDLE_TOP_ANIM ||
		   tileKindHere == SLIME_PIT_RIGHT_TOP_ANIM ||
		   tileKindHere == SLIME_PIT_LEFT_CENTER ||
		   tileKindHere == SLIME_PIT_MIDDLE_CENTER ||
		   tileKindHere == SLIME_PIT_RIGHT_CENTER ||
		   tileKindHere == SLIME_PIT_LEFT_BOTTOM ||
		   tileKindHere == SLIME_PIT_MIDDLE_BOTTOM ||
		   tileKindHere == SLIME_PIT_LEFT_TOP ||
		   tileKindHere == SLIME_PIT_RIGHT_BOTTOM){
		   return "Slime";
		}
		//use as lava
		if(tileKindHere == RED_TILE ){
			return "Lava";
		}

		if(tileKindHere == GREEN_VINE_WEBS){
			return "Webs";
		}

		if(tileKindHere == THORNS){
			return "Thorns";
		}

		if(tileKindHere == VINES_POISONOUS){
			return "Thorns";
		}

		if(tileKindHere == PICKUP){
			return "Diamond";
		}

		if(tileKindHere == KEY_RED){
			return "Red Kye";

		}

		if(tileKindHere == KEY_BLUE){
			return "Blue key";
		}

		if(tileKindHere == KEY_GREEN){
			return "Green key";
		}
	}

 	this.name = this.setName();

	this.returnEffect = function(){
		if(tileKindHere == SLIME_PIT_LEFT_TOP ||
		   tileKindHere == SLIME_PIT_MIDDLE_TOP ||
		   tileKindHere == SLIME_PIT_RIGHT_TOP ||
		   tileKindHere == SLIME_PIT_LEFT_TOP_ANIM ||
		   tileKindHere == SLIME_PIT_MIDDLE_TOP_ANIM ||
		   tileKindHere == SLIME_PIT_RIGHT_TOP_ANIM ||
		   tileKindHere == SLIME_PIT_LEFT_CENTER ||
		   tileKindHere == SLIME_PIT_MIDDLE_CENTER ||
		   tileKindHere == SLIME_PIT_RIGHT_CENTER ||
		   tileKindHere == SLIME_PIT_LEFT_BOTTOM ||
		   tileKindHere == SLIME_PIT_MIDDLE_BOTTOM ||
		   tileKindHere == SLIME_PIT_LEFT_TOP ||
		   tileKindHere == SLIME_PIT_RIGHT_BOTTOM){
			console.log("You fell into slime");
		}
		//use as lava
		if(tileKindHere == RED_TILE ){
			console.log("You fell into lava");
		}

		if(tileKindHere == GREEN_VINE_WEBS){
		 	console.log("You fell into webs");
		}

		if(tileKindHere == THORNS){
		 	console.log("You got attacked by thorns");
		}

		if(tileKindHere == VINES_POISONOUS){
		 	console.log("You got attacked by vines ");
		}

		if(tileKindHere == PICKUP){
		 	console.log("You got picked up health");
		}

		if(tileKindHere == KEY_RED){
		 	console.log("You picked up a red key");
		}

		if(tileKindHere == KEY_BLUE){
		 	console.log("You picked up a blue key");
		}

		if(tileKindHere == KEY_GREEN){
		 	console.log("You picked up green key");
		}		
	}
}

window.obArr = ObjectArr;