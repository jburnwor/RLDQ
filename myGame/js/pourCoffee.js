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

		//the background images of the state
		bg = game.add.image(0,0,'bg');
		light = game.add.image(0,0,'light');

		//the pot/jug of coffee
		coffeeJug = this.add.sprite(game.world.centerX,0,'plane');
		game.physics.arcade.enable(coffeeJug);
		coffeeJug.scale.setTo(3,3);
		coffeeJug.tint = 4169e1;
		coffeeJug.drag = 15;
		coffeeJug.body.collideWorldBounds = true;
		coffeeJug.anchor.setTo(0.5,0);

		//make the pot/jub move back and forth at random speeds
		jugVelocity = game.time.create(false);
		jugVelocity.loop(1000, this.jugSpeed, game);
		jugVelocity.start();

		//emit the coffee from, the jug
		coffeeEmitter = game.add.emitter(coffeeJug.x, 0, 0);
		coffeeEmitter.gravity = 0;
		coffeeEmitter.setXSpeed(0,0);
		coffeeEmitter.setYSpeed(750,750);
		coffeeEmitter.setRotation(0,0);
		//the amount of particles only needs to be 100 due to killing them later. allowing the emmiter can keep
		coffeeEmitter.makeParticles('plane',0,50,true,false);
		coffeeEmitter.start(false, 3000, 25);	// (explode, lifespan, freq, quantity)

		//in order to make sure the coffee particles are killed properly, we make it collide
		killPlane = this.add.sprite(0,game.world.height+32,'plane');
		game.physics.arcade.enable(killPlane);
		killPlane.scale.setTo(16,1);
		killPlane.body.immovable = true;

		//the mug for the player
		mug = this.add.sprite(game.world.centerX,game.world.height-135,'mug');
		game.physics.arcade.enable(mug);
		mug.scale.setTo(0.5,0.5);
		//setSize(width, height,relative X, relative Y)
		mug.body.setSize(mug.width+30, 15, 0, 0);
		mug.body.immovable = true;
		mug.anchor.setTo(0.5,0);

		//to count the amount of coffee particles hit or missed
		count = 0;
		hpCount = 0;

		mouse = this.add.image(mug.x-16,mug.y+4,'mouse');
		mouse.anchor.setTo(0.5,0);
		mouse.scale.setTo(0.65,0.65);


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
	//set random speed for the jug
	jugSpeed: function() {
		//if the jug is on the left most part, move it right
		if(coffeeJug.x == coffeeJug.width/2){
			coffeeJug.body.velocity.x = game.rnd.integerInRange(180,500);
		}
		//vice versa
		else if(coffeeJug.x == (game.world.width-coffeeJug.width/2)){
			coffeeJug.body.velocity.x = game.rnd.integerInRange(-500,-180);
		}
		//random speed in either direction if not the other 2
		else{
			coffeeJug.body.velocity.x = game.rnd.integerInRange(-500,500);
		}
	},

	//check collision between the particles and the mug/killPlane
	checkCollision: function(particle){
		//gain points for "catching" enough of the coffee in the mug
		if(game.physics.arcade.collide(particle,mug)){
			particle.kill();
			count++;
			if(count%5==0){
				score+=1;
			}
		} 
		//lose points for missing enough of the coffee
		if(game.physics.arcade.collide(particle,killPlane)){
			particle.kill();
			hpCount++;
			if(hpCount%5==0){
				health-=2;
			}
		}		
	},

}


