var platformList = new (function() {

	var platforms = [];

	this.parseWorld = function () {
		platforms = [];
		for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
			for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				switch (worldGrid[arrayIndex]) {
					case PLATFORM_RIGHT:
					case PLATFORM_LEFT:
					case PLATFORM_UP:
					case PLATFORM_DOWN:
						addPlatform(worldGrid[arrayIndex], eachCol, eachRow);
						break;
						// @todo other directions
				}
			}
		}
	};

	function addPlatform(type, startCol, startRow) {
		var	col = startCol,
			row = startRow;
		var arrayIndex = rowColToArrayIndex(col, row);

		// We always find the platform start position at the left side of the platform
		while (col < WORLD_COLS && worldGrid[arrayIndex] && worldGrid[arrayIndex] === type) {
			worldGrid[arrayIndex] = WORLD_BACKGROUND;
			col++;
			arrayIndex = rowColToArrayIndex(col, row);
		}
		var platformWidth = Math.max(3, col - startCol);

		// Start over again to find the platform end position
		col = startCol;
		row = startRow;

		while (0 <= col && col < WORLD_COLS && 0 <= row && row < WORLD_ROWS && worldGrid[arrayIndex] && worldGrid[arrayIndex] === WORLD_BACKGROUND) {
			switch (type) {
				case PLATFORM_RIGHT:
					col++;
					break;
				case PLATFORM_LEFT:
					col--;
					break;
				case PLATFORM_UP:
					row--;
					break;
				case PLATFORM_DOWN:
					row++;
					break;
			}
			arrayIndex = rowColToArrayIndex(col, row);
		}
		if (worldGrid[arrayIndex] === PLATFORM_DESTINATION) {
			worldGrid[arrayIndex] = WORLD_BACKGROUND;
		}

		var platform = new Platform(type, platformWidth, startCol, startRow, col, row);
		platforms.push(platform);
	}

	this.update = function() {
		for (var p = platforms.length - 1; 0 <= p; p--) {
			platforms[p].update();
		}
	};

	this.draw = function() {
		for (var p = platforms.length - 1; 0 <= p; p--) {
			platforms[p].draw();
		}
	};

	this.checkCollisions = function(entity) {
		for (var p = platforms.length - 1; 0 <= p; p--) {
			if (platforms[p].checkCollision(entity)) {
        platforms[p].collisionEffect(entity);
        entity.setStateValueTo(ON_PLATFORM, true);
        entity.setStateValueTo(ON_GROUND, true);
			} else {
        entity.setStateValueTo(ON_PLATFORM, false);
      }
		}

		
	};
});

function Platform(type, platformWidth, startCol, startRow, endCol, endRow) {
	var x = startCol * WORLD_W;
	var y = startRow * WORLD_H;

	var startX = x;
	var startY = y;

	// Make sure the right-moving platform stops at the end point with the right side
	if (type === PLATFORM_RIGHT) {
		endCol -= platformWidth - 1;
	}

	var endX = endCol * WORLD_W;
	var endY = endRow * WORLD_H;

	// Flip start/end coordinates when starting in reverse direction
	if (type === PLATFORM_LEFT || type === PLATFORM_UP) {
		var tX = endX;
		var tY = endY;
		endX = startX;
		endY = startY;
		startX = tX;
		startY = tY;
	}

	var direction = PLATFORM_SPEEDS[type];

	var image = document.createElement('canvas');
	var newContext = image.getContext('2d');
	image.width = WORLD_W * platformWidth;
	image.height = WORLD_H;

	var destX = 0;
	newContext.drawImage(platformTileSet, 0, 0, WORLD_W, WORLD_H, destX, 0, WORLD_W, WORLD_H);
	for (var i = 0; i < platformWidth - 1; i++) {
		destX += WORLD_W;
		newContext.drawImage(platformTileSet, WORLD_W, 0, WORLD_W, WORLD_H, destX, 0, WORLD_W, WORLD_H);
	}
	newContext.drawImage(platformTileSet, WORLD_W * 2, 0, WORLD_W, WORLD_H, destX, 0, WORLD_W, WORLD_H);

	this.getBounds = function() {
		return {
			x: x,
			y: y,
			width: image.width,
			height: image.height
		};
	};

	this.update = function() {
		// Flip direction if at start or end point
		if (x < startX || endX < x || y < startY || endY < y) {
			direction = direction.multiply(-1);
		}
		x += direction.x;
		y += direction.y;
	};

	this.draw = function() {
		canvasContext.save();
		canvasContext.translate(x, y);
		canvasContext.drawImage(image, 0, 0);
		if (debug) {
			strokedRect(0, 0, image.width, image.height, "2", "yellow");
		}
		canvasContext.restore();
	};

	this.checkCollision = function(entity) {
     var platformBBox = this.getBounds();
     return utils.rectIntersect(platformBBox, entity.boundingBox);
  }

  this.collisionEffect = function(entity){
    var platformBBox = this.getBounds();
    // var newplatformBBox = Object.assign({},platformBBox);
    // newplatformBBox.height = newplatformBBox.height/4;    // console.log(platformBBox);

   var jumping = entity.speed.getY() < 0;
   var moving_left = entity.speed.getX() < 0;
   var moving_right = entity.speed.getX() > 0;
   var falling_down = entity.speed.getY() > 0 ;

   if (jumping) {
      entity.pos.setY((Math.floor(entity.pos.getY() / WORLD_H)) * WORLD_H + entity.boundingBox.height / 2);
      entity.speed.setY(0);
     console.log("Collidiing");
   }


    // check if the entity is to the right or left of the platform
    // if (entity.boundingBox.x < platformBBox.x || platformBBox.x + platformBBox.width < entity.boundingBox.x + entity.boundingBox.width) {
    //  return;
    // }

    // // check if the entity is (too far) above or below the platform
    // if (entity.boundingBox.y + entity.boundingBox.height < platformBBox.y - 2 || platformBBox.y + 2 < entity.boundingBox.y + entity.boundingBox.height) {
    //  return;
    // }

    //   entity.state[ON_GROUND] = true;
    // var movingSpeedX = 0;
    // if (entity.state[IN_MOTION]) {
    //  movingSpeedX = entity.speed.getX();
    // }
    // entity.speed.setX(movingSpeedX + direction.getX());
    // entity.speed.setY(direction.getY());

    // return true;
  };
}

