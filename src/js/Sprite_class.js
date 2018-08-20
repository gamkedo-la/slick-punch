function SpriteSheetClass(sheetIn, widthPerFrame, heightPerFrame, loop, numOfFrames, ticksPerFrame, name){
    var sheet = sheetIn;
    var width = widthPerFrame;
    var height = heightPerFrame;
    this.numOfFrames = numOfFrames || 1;
    var ticksPerFrame = ticksPerFrame || 4;
    var tickCount = 0;
    var loop = loop;
    this.frameIndex = 0;
    this.cycleComplete = false;
    this.name = name || "";
  
    this.draw = function(col, row, atX, atY, withAngle, flippedX, flippedY) {
        canvasContext.save();
        canvasContext.translate(atX, atY);
        canvasContext.rotate(withAngle);
        flippedX = flippedX || false;
        flippedY = flippedY || false;
        canvasContext.scale(flippedX ? -1 : 1, flippedY ? -1 : 1);

        canvasContext.drawImage(sheet,
                                 col * width, row * height,
                                 width, height,
                                -width/2, -height/2,
                                 width, height);
        canvasContext.restore();
    };

    this.update = function(){
        tickCount++;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            this.cycleComplete = false;
            // If the current frame index is in range 
            if (this.frameIndex <   this.numOfFrames - 1 ) {  
                // Go to the next frame
                this.frameIndex += 1;              
            }
            else{
                this.frameIndex = this.numOfFrames - 1;
                this.cycleComplete = true;
                if(loop){
                  this.frameIndex = 0;
                }
            } 
        }
    };
}
