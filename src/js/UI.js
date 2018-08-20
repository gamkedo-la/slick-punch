var healthDisplay = [0, 0, 0, 0];

function drawUI() {
	colorRect(0, 0, canvas.width, 60, 'black');
	colorText(`Score : ${score}`, 30, 40, "yellow", "30px Tahoma");
	//colorText(`Health : ${player.health}`, 30, 60, "yellow", "30px Tahoma");

	drawHealthDisplay();
	drawTimer();
}

function drawHealthDisplay() {

	for (var thisHeart = 0; thisHeart < healthDisplay.length; thisHeart++) {

		var heartImagePos = thisHeart + 1;
		var heartImagePosFromEnd = (healthDisplay.length - 1) - thisHeart;

		// determine which heart images to display for each healthDisplay array index
		if (player.health >= 2 * heartImagePos) {
			healthDisplay[thisHeart] = 2;
		} else if (player.health == (2 * heartImagePos) - 1) {
			healthDisplay[thisHeart] = 1;
		} else {
			healthDisplay[thisHeart] = 0;
		} //end if else

		//draw heart container images from left to right
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
		} // end switch

	} //end for loop

} //end func drawHealthDisplay();

function drawHeartImage(heartImage, posFromEnd) {
	canvasContext.drawImage(heartImage, canvas.width - (2 * WORLD_W) - (posFromEnd * 1.5 * WORLD_W), 0);
}

function drawTimer() {

	frameCount++
	if (frameCount == FRAMES_PER_SECOND) {
		timeRemaining--

		if (timeRemaining == 0) {
			player.state.isDead = true;
			// player.takeDamage(this.attackPower);
			setTimeout(player.resetGame.bind(player), 2000);
		}

		if(timeRemaining<0) {
			timeRemaining = 0; // blocks showing negative
		}
		frameCount = 0;
	} //end if

	colorText(timeRemaining, canvas.width / 2, 40, "yellow", "30px Tahoma");
	 
} // end func drawTimer()