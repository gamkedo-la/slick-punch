function drawBitmapCenteredWithRotation(useBitmap, atX,atY, withAng) {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	if (withAng) {
	  canvasContext.rotate(withAng);
	}
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function strokedRect(topLeftX,topLeftY, boxWidth,boxHeight,lineWidth, strokeColor) {
  canvasContext.beginPath();
  canvasContext.lineWidth = lineWidth;
  canvasContext.strokeStyle = strokeColor;
  canvasContext.rect(topLeftX, topLeftY, boxWidth, boxHeight); 
  canvasContext.stroke();  
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, 10, 0,Math.PI*2, true);
	canvasContext.fill();
}


function drawAnimatedVerticalBitmapCenteredAtLocationWithRotation(graphic, frameNow, 
                                                          graphicFrameW,graphicFrameH, 
                                                          atX, atY, withAngle) {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX,atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); // sets the rotation
  canvasContext.drawImage(graphic,
                          frameNow * graphicFrameW, 0,
                          graphicFrameW, graphicFrameH,
                          -graphicFrameW/2,-graphicFrameH/2, 
                          graphicFrameW, graphicFrameH); // center, animate, draw
  canvasContext.restore(); // undo the translation movement and rotation since save()
}

function drawAnimatedHorizontalBitmapCenteredAtLocationWithRotation(graphic, frameNow, 
                                                          graphicFrameW,graphicFrameH, 
                                                          atX, atY, withAngle) {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX,atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); // sets the rotation
  canvasContext.drawImage(graphic,
                          0, frameNow * graphicFrameH,
                          graphicFrameW, graphicFrameH,
                          -graphicFrameW/2,-graphicFrameH/2, 
                          graphicFrameW, graphicFrameH); // center, animate, draw
  canvasContext.restore(); // undo the translation movement and rotation since save()
}

//flip sprite to face mouse or player
function drawBitmapFlipped(graphic, atX, atY, flipToFaceLeft) {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  if(flipToFaceLeft) {
    canvasContext.scale(-1.0,1.0);
  }
  canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2);
  canvasContext.restore();
}


function drawStroked(text, x, y,fillColor,font,align = 'left') {
  canvasContext.font = font;
  canvasContext.strokeStyle = 'black';
  canvasContext.textAlign = align;
  canvasContext.lineWidth = 8;
  canvasContext.strokeText(text, x, y);
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(text, x, y);
}

function colorText(showWords,textX,textY,fillColor,fontface,textAlign = 'left',opacity = 1) {
  canvasContext.save();
  canvasContext.textAlign = textAlign;
  canvasContext.font = fontface;
  canvasContext.globalAlpha = opacity;
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
  canvasContext.restore();
}

function getFontWeight(font) {
  canvasContext.save();
  canvasContext.font = this.buttonFont;
  var weight = parseInt(font.match(/\d+/)[0]); //regex match the first string of digits
  canvasContext.restore();  
  return weight;
}

function getTextWidth(txt, font) {
  canvasContext.save();
  canvasContext.font = font;
  var width = canvasContext.measureText(txt).width;
  canvasContext.restore();
  return width;
}

// takes an image and colors and fades it as required
// returns a new canvas we can use as a sprite
// reuses the same temp buffer over and over for performance reasons
function tintImage(image, color) {
  var _tintImageCanvas = document.createElement('canvas');
  var _tintImageCTX = _tintImageCanvas.getContext('2d');
  _tintImageCanvas.width = image.width;
  _tintImageCanvas.height = image.height;
  _tintImageCTX.fillStyle = color;
  _tintImageCTX.fillRect(0, 0, _tintImageCanvas.width, _tintImageCanvas.height);
  _tintImageCTX.globalCompositeOperation = 'destination-atop';
  _tintImageCTX.globalAlpha = 1;
  _tintImageCTX.drawImage(image, 0, 0);
  return _tintImageCanvas;
}

// creates a brand new sprite in a new color
function createTintedSprite(image, color) {
  var newCanvas = document.createElement('canvas');
  var newContext = newCanvas.getContext('2d');
  newCanvas.width = image.width;
  newCanvas.height = image.height;
  newContext.fillStyle = color;
  newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
  newContext.globalCompositeOperation = 'destination-atop';
  newContext.globalAlpha = 1;
  newContext.drawImage(image, 0, 0);
  return newCanvas;
}

// draw a rotated colored alpha faded sprite! (warning: costly, use sparingly)
function drawImageTinted(canvasContext, image, x, y, angle, color, opacity) {
  canvasContext.save();
  canvasContext.translate(x, y);
  if (angle !== undefined) {
    canvasContext.rotate(angle);
  }
  if (opacity !== undefined) canvasContext.globalAlpha = opacity;
  canvasContext.drawImage(tintImage(image, color), -image.width / 2, -image.height / 2);
  canvasContext.restore();
}

function drawImageRotatedAlpha(canvasContext, image, x, y, angle, opacity) {
  canvasContext.save();
  canvasContext.translate(x, y);
  if (angle !== undefined) {
    canvasContext.rotate(angle);
  }
  if (opacity !== undefined) canvasContext.globalAlpha = opacity;
  canvasContext.drawImage(image, -image.width / 2, -image.height / 2);
  canvasContext.restore();
}
