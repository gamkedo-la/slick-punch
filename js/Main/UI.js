var healthDisplay = [0, 0, 0, 0];

function drawUI(){
	colorRect(0, 0, canvas.width, 60, 'black');
	colorText(`Score : ${score}`, 30, 30, "yellow", "30px Tahoma");
	//colorText(`Health : ${player.health}`, 30, 60, "yellow", "30px Tahoma");
	
	drawHealthDisplay();
}

function drawHealthDisplay (){
	
	for (var thisHeart = 0; thisHeart < healthDisplay.length; thisHeart++) {
		
		var heartImagePos = thisHeart + 1;
		var heartImagePosFromEnd = (healthDisplay.length - 1) - thisHeart;
		
		if (player.health >= 2 * heartImagePos){
			healthDisplay[thisHeart] = 2;
		} else if (player.health == (2 * heartImagePos) - 1) {
			healthDisplay[thisHeart] = 1;
		} else {
			healthDisplay[thisHeart] = 0;
		}
		
		//draw heart container image from right to left
		switch (healthDisplay[thisHeart]) {
			case 0:
			drawHeartImage(heartEmpty, heartImagePosFromEnd);
			break;
			case 1:
			drawHeartImage(heartHalf, heartImagePosFromEnd);
			break;
			case 2:
			drawHeartImage(heartFull, heartImagePosFromEnd);
			break;
		}
	}
}

function drawHeartImage(heartImage, posFromEnd){
	canvasContext.drawImage(heartImage, canvas.width - (2 * WORLD_W) - (posFromEnd * 1.5 * WORLD_W), 0);
}