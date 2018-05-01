
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