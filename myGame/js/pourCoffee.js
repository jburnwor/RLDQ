var coffee = function () {
		this.coffeeEmitter
}
coffee.prototype = {
	preload: function () {
		this.load.path = 'assets/img/';
		this.load.image('player','playerTemp.png');
	},

	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000, function(){console.log('timer')}, game);
		stageTimer.start();

		coffeeJug = this.add.sprite(game.world.centerX,0,'player');
		game.physics.arcade.enable(coffeeJug);
		coffeeJug.scale.setTo(3,3);
		coffeeJug.tint = 4169e1;
		coffeeJug.drag = 15;
		coffeeJug.body.collideWorldBounds = true;
		coffeeJug.anchor.setTo(0.5,0);

		jugVelocity = game.time.create(false);
		jugVelocity.loop(1000, this.jugSpeed, game);
		jugVelocity.start();

		coffeeEmitter = game.add.emitter(coffeeJug.x, 0, 0);
		coffeeEmitter.gravity = 800;
		coffeeEmitter.setXSpeed(0,0);
		coffeeEmitter.setYSpeed(500,500);
		coffeeEmitter.setRotation(0,0);
		coffeeEmitter.makeParticles('player',0,4000,true,false);
		coffeeEmitter.start(false, 3000, 25);	// (explode, lifespan, freq, quantity)


		mug = this.add.sprite(game.world.centerX,game.world.height-96,'player');
		game.physics.arcade.enable(mug);
		mug.scale.setTo(2,3);
		//setSize(width, height,relative X, relative Y)
		mug.body.setSize(mug.width/2, 1, 0, 0);
		mug.body.immovable = true;
		mug.anchor.setTo(0.5,0);
		count = 0;

		scoreDisplay = new Score();

	},
	update: function () {
		//move brush to pointer
		mug.x = this.game.input.mousePointer.x;
		coffeeEmitter.x = coffeeJug.x;

		//calls the function on each particle/child
		coffeeEmitter.forEach(this.checkCollision, this);
		

	},
	jugSpeed: function() {
		if(coffeeJug.x == coffeeJug.width/2){
			coffeeJug.body.velocity.x = game.rnd.integerInRange(180,500);
		}
		else if(coffeeJug.x == (game.world.width-coffeeJug.width/2)){
			coffeeJug.body.velocity.x = game.rnd.integerInRange(-500,-180);
		}
		else{
			coffeeJug.body.velocity.x = game.rnd.integerInRange(-500,500);
		}
	},
	checkCollision: function(particle){
		if(game.physics.arcade.collide(particle,mug)){
			particle.kill();
			count++;
			if(count%10==0){
				score+=2;
			}
		}		
	},

}


