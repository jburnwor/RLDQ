//states would like to look @ game
var game;
//a couple of global
var score = 0 ;
var health = 100;
var day = 1;
var music = false;
var reach = 0;
var resetCounter = 0;
window.onload = function () {
	game = new Phaser.Game(512, 512, Phaser.AUTO);
	// states
	game.state.add('stamping', stamping);
	game.state.add('brushing', brushing);
	game.state.add('alarmClock',alarmClock);
	game.state.add('bed',bed);
	game.state.add('code',code);	
	game.state.add('menu', menu);
	game.state.add('walking', walking);
	game.state.add('coffee', coffee);
	game.state.add('dishes', dishes);
	game.state.add('gameOver', gameOver);
	game.state.add('credits', credits);
	game.state.add('endDay', endDay);
	game.state.start('menu');
}