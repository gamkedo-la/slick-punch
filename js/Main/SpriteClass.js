function SpriteSheetClass(sheetIn, widthPerFrame, heightPerFrame, frameNum, ticksPerFrame, loop){
    var sheet = sheetIn;
    var width = widthPerFrame;
    var height = heightPerFrame;
    this.frameNum = frameNum || 1;
    var ticksPerFrame = ticksPerFrame || 4;
    var tickCount = 0;
    var loop = loop || true;
    this.frameIndex = 0;

  
    this.draw = function(col, row, atX, atY, withAngle, flippedX = false, flippedY = false) {
        canvasContext.save();
        canvasContext.translate(atX, atY);
        canvasContext.rotate(withAngle);
        canvasContext.scale(flippedX ? -1 : 1, flippedY ? -1 : 1);

         canvasContext.drawImage(sheet,
                                 col * width, row * height,
                                 width, height,
                                -width/2, -height/2,
                                 width, height);
        canvasContext.restore();
    };

    this.update = function(){
        tickCount ++;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            // If the current frame index is in range 
            if (this.frameIndex <   this.frameNum - 1 ) {  
                // Go to the next frame
                this.frameIndex += 1;
            }
            else{
                this.frameIndex = this.frameNum - 1;
                if(loop){
                  this.frameIndex = 0;
                }
            } 
        }
    };
}
