//states would like to look @ game
var game;
//a couple of global
var score = 0 ;
var health = 100;
window.onload = function () {
	game = new Phaser.Game(512, 512, Phaser.AUTO);
	// states
	game.state.add('stamping', stamping);
	game.state.start('stamping');	
}