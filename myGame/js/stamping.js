// define globals
var game;
var stageTimer;

window.onload = function() {
	game = new Phaser.Game(800,800, Phaser.AUTO);
	// define states
	game.state.add('stamping', stamping);
	game.state.start('stamping');
}


var stamping = function(){}
stamping.prototype = {
	preload: function(){
		console.log('stamping: preload');
	},

	create: function(){
		console.log('stamping: create');
		//create 30 second timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){console.log('fired')},game);
		stageTimer.start();

	},
	update: function(){
		//nice
	}

}