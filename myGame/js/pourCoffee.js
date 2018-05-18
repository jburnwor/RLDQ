var coffee = function () {
	this.gumsEmitter;
}
coffee.prototype = {
	preload: function () {
		this.load.path = 'assets/img/';
		this.load.image('player','playerTemp.png');
	},

	create: function () {
		//timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000, function(){console.log('timer')}, game);
		stageTimer.start();

		coffeeJug = this.add.sprite(game.world.centerX,0,'player');
		coffeeJug.anchor.setTo(0.5,0);

		this.gumsEmitter = game.add.emitter(coffeeJug.x, 0, 200);
		this.gumsEmitter.makeParticles('player');			// image used for particles
		this.gumsEmitter.gravity = 200;
		this.gumsEmitter.setXSpeed(0,0);
		this.gumsEmitter.setYSpeed(100,100);
		this.gumsEmitter.setRotation(0,0);
		this.gumsEmitter.start(false, 10000, null, 75);	// (explode, lifespan, freq, quantity)
	},
	update: function () {
		//move brush to pointer
		coffeeJug.x = this.game.input.mousePointer.x;
	},
}


