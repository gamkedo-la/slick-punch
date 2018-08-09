
function ObjectClass(posX, posY, width, height, tileKindHere){
	
	var tileKindHere = tileKindHere;
	this.boundingBox = {
		width : width,
		height: height,
		x: posX,
		y: posY
	};
 
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
			this.boundingBox.name = "Slime";
		}
		//use as lava
		if(tileKindHere == RED_TILE ){
			console.log("You fell into lava");
			this.boundingBox.name = "Lava";
		}

		if(tileKindHere == GREEN_VINE_WEBS){
		 	console.log("You fell into webs");
			this.boundingBox.name = "Webs";
		}

		if(tileKindHere == THORNS){
		 	console.log("You got attacked by thorns");
			this.boundingBox.name = "Thorns";
		}

		if(tileKindHere == VINES_POISONOUS){
		 	console.log("You got attacked by vines ");
		}

		if(tileKindHere == PICKUP){
		 	console.log("You got picked up health");
			this.boundingBox.name = "Diamond";

		}

		if(tileKindHere == KEY_RED){
		 	console.log("You picked up a red key");
			this.boundingBox.name = "Red Kye";

		}

		if(tileKindHere == KEY_BLUE){
		 	console.log("You picked up a blue key");
			this.boundingBox.name = "Blue key";

		}

		if(tileKindHere == KEY_GREEN){
		 	console.log("You picked up green key");
			this.boundingBox.name = "Green key";

		}		
	}
}

window.obArr = ObjectArr;