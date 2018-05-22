var Health = function(){
		Phaser.Graphics.call(this,game);
		this.beginFill(0xff0000);
		//the initial x posistion doesn't matter so I just set it to zero
		this.drawRect(0,0,health,12);
		this.endFill();
		game.add.existing(this);

}
Health.prototype = Object.create(Phaser.Graphics.prototype);
Health.prototype.constructor = Health;
Health.prototype.update = function() {
	//make the width of the rectangle the current health value
	this.width = health;

	//resets the position to these coords
 	this.reset(16,40); 
}
var HealthBG = function(){
		Phaser.Graphics.call(this,game);
		this.beginFill(0x696969);
		//the initial x posistion doesn't matter so I just set it to zero
		this.drawRect(14,38,104,16);
		this.endFill();
		game.add.existing(this);

}
HealthBG.prototype = Object.create(Phaser.Graphics.prototype);
HealthBG.prototype.constructor = HealthBG;
