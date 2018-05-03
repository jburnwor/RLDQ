var Health = function(){
		Phaser.Graphics.call(this,game);
		this.beginFill(0xff0000);
		//the initial x posistion doesn't matter so I just set it to zero
		this.drawRect(0,16,health,16);
		this.endFill();
		game.add.existing(this);

}
Health.prototype = Object.create(Phaser.Graphics.prototype);
Health.prototype.constructor = Health;
Health.prototype.update = function() {
	//make the width of the rectangle the current health value
	this.width = health;
	//since the x position is relative, when we change the width so we dynamically change this
	//it looks like the anchor is on the other side even though graphics doesn't have an anchor by itself
 	this.x = 372 + (100-health);	
}