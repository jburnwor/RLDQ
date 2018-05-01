var brushing = function(){}
brushing.prototype = {
	preload: function(){
		
	},

	create: function(){
		//timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){console.log('timer')},game);
		stageTimer.start();

	},
	update: function(){
		
	}
}