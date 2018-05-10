var Score = function(){
	Phaser.Text.call(this,game,16,16,'Score: ' + score, {fontSize: '32px', fill: 'White'});
	this.stroke = '#000000';
    this.strokeThickness = 3;
	game.add.existing(this);
}
Score.prototype = Object.create(Phaser.Text.prototype);
Score.prototype.constructor = Score;
Score.prototype.update = function() {
	this.text = 'Score: ' + Math.floor(score);
}