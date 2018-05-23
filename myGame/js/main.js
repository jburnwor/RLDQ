//states would like to look @ game
var game;
//a couple of global
var score = 0 ;
var health = 100;
var day = 1;
window.onload = function () {
	game = new Phaser.Game(512, 512, Phaser.AUTO);
	// states
	game.state.add('stamping', stamping);
	game.state.add('brushing', brushing);
	game.state.add('alarmClock',alarmClock);
	game.state.add('bed',bed);	
	game.state.add('menu', menu);
	game.state.add('walking', walking);
	game.state.start('walking');
}