var TimeDisplay = function(timer){
	Phaser.BitmapText.call(this,game,game.world.centerX,game.world.centerY,'font','',512);
	game.add.existing(this);
	this.alpha = 0.50;
	this.anchor.setTo(0.5,0.35);
	tempTimer = timer;
}
TimeDisplay.prototype = Object.create(Phaser.BitmapText.prototype);
TimeDisplay.prototype.constructor = TimeDisplay;
TimeDisplay.prototype.update = function() {
	if(tempTimer.duration<=5000){
		this.text = '' + Math.ceil((tempTimer.duration)/1000);
	}
}