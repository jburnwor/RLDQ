var Score = function(){
	Phaser.BitmapText.call(this,game,16,8,'font','Score: ' + score,52);
	game.add.existing(this);
}
Score.prototype = Object.create(Phaser.BitmapText.prototype);
Score.prototype.constructor = Score;
Score.prototype.update = function() {
	this.text = 'Score: ' + Math.floor(score);
}