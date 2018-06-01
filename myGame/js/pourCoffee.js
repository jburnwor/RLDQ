var coffee = function () {
		this.coffeeEmitter
}
coffee.prototype = {
	preload: function () {
		this.load.path = 'assets/img/coffee/';
		this.load.image('bg','background.png');
		this.load.image('light','light.png');
		this.load.image('mug','coffeeMug.png');
		this.load.image('plane', 'coffee.png');
		this.load.image('mouse','MOUSE0.png');

		this.load.path = 'assets/fonts/';
        this.load.bitmapFont('font','m5x7.png','m5x7.xml');
	},

	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000, function(){console.log('timer'), game.state.start('code')}, game);
		stageTimer.start();

		bg = game.add.image(0,0,'bg');
		light = game.add.image(0,0,'light');

		coffeeJug = this.add.sprite(game.world.centerX,0,'plane');
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
		coffeeEmitter.gravity = 0;
		coffeeEmitter.setXSpeed(0,0);
		coffeeEmitter.setYSpeed(750,750);
		coffeeEmitter.setRotation(0,0);
		//the amount of particles only needs to be 100 due to killing them later. allowing the emmiter can keep
		coffeeEmitter.makeParticles('plane',0,50,true,false);
		//coffeeEmitter.forEach(function(particle){particle.tint = 0x653221}, this);
		coffeeEmitter.start(false, 3000, 25);	// (explode, lifespan, freq, quantity)

		killPlane = this.add.sprite(0,game.world.height+32,'plane');
		game.physics.arcade.enable(killPlane);
		killPlane.scale.setTo(16,1);
		killPlane.body.immovable = true;


		mug = this.add.sprite(game.world.centerX,game.world.height-135,'mug');
		game.physics.arcade.enable(mug);
		mug.scale.setTo(0.5,0.5);
		//setSize(width, height,relative X, relative Y)
		mug.body.setSize(mug.width+30, 15, 0, 0);
		mug.body.immovable = true;
		mug.anchor.setTo(0.5,0);

		count = 0;
		hpCount = 0;

		mouse = this.add.image(mug.x-16,mug.y+4,'mouse');
		mouse.anchor.setTo(0.5,0);
		mouse.scale.setTo(0.65,0.65);


		console.log(game.world.height);

		//UI for the state
		scoreDisplay = new Score();
		healthBG = new HealthBG();
		healthDisplay = new Health();
		timeDisplay = new TimeDisplay(stageTimer);

	},
	update: function () {
		//move brush to pointer
		mug.x = this.game.input.mousePointer.x;
		coffeeEmitter.x = coffeeJug.x;
		mouse.x = mug.x-16;

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
			if(count%5==0){
				score+=1;
			}
		}
		if(game.physics.arcade.collide(particle,killPlane)){
			particle.kill();
			hpCount++;
			if(hpCount%5==0){
				health-=2;
			}
		}		
	},

}


