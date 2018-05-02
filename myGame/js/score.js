var Score = function(){
	Phaser.Text.call(this,game,16,16,'Score: ' + score, {fontSize: '48px', fill: 'White'});
	game.add.existing(this);
}
Score.prototype = Object.create(Phaser.Text.prototype);
Score.prototype.constructor = Score;
Score.prototype.update = function() {
	this.text = 'Score: ' + score;
}