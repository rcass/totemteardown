var TotemPole = function(options) {
    var defaults = {
        x: 0,
        y: 0,
        blocks: [],
        color: 'black'
    };

    for(var key in defaults) {
        if(!options.hasOwnProperty(key)) {
            this[key] = defaults[key];
        } else {
            this[key] = options[key];
        }
    }
};

TotemPole.prototype.update = function() {
    // Iterate blocks from bottom to top
    var supportedLevel = this.y - BLOCK_HEIGHT * 0.5;
    for (var i = this.blocks.length - 1; i >= 0; --i) {
        this.blocks[i].update(supportedLevel);
        if (this.blocks[i].state != TotemBlock.SWAPPING) {
            supportedLevel = this.blocks[i].y - BLOCK_HEIGHT;
        } else {
            supportedLevel -= BLOCK_HEIGHT;
        }
    }
};

TotemPole.prototype.render = function() {
    for(var j = 0; j < this.blocks.length; j++) {
        ctx.fillStyle = this.color;
        canvasUtil.fillCenteredRect(ctx, this.blocks[j].x, this.blocks[j].y, this.blocks[j].width, this.blocks[j].height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        canvasUtil.strokeCenteredRect(ctx, this.blocks[j].x, this.blocks[j].y, this.blocks[j].width, this.blocks[j].height);
        ctx.fillStyle = 'black';
        ctx.fillText(this.blocks[j].type, this.blocks[j].x, this.blocks[j].y);
    }
};
