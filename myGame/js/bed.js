//all placement of objects were done with 512x512 in mind
var bed = function(){}
bed.prototype = {
	preload: function(){
		this.load.path = 'assets/img/bedRoom/';
		this.load.atlas('bedAtlas','bedRoomAtlas.png','bedRoomAtlas.json');
		this.load.image('character','charSSilhouette.png');
		this.load.path = 'assets/img/';
		this.load.image('player','playerTemp.png',);
		this.load.atlas('tutorialAtlas','tutorialAtlas.png','tutorialAtlas.json')
		this.load.path = 'assets/fonts/';
		this.load.bitmapFont('font','m5x7.png','m5x7.xml');
	},
	create: function(){

		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.stage.backgroundColor = 'rgb(127,127,127)';

		var x = 0;
		var y = 0;
		//create the floor
		for(var i = 1;i <=128; i++){
			this.add.image(x,y,'bedAtlas','bookshelf');
			x+=64;
			if(i%8==0){
				y+=32;
				x = 0;
			}
		}


		itemNumbers = [2,3,5,6,7,8,9,10]
		//put our obstacles in a group 
		things = game.add.group();
		things.enableBody = true;

		//spawn them
		for(var i = 0; i<50;i++){
			//give them a random position then realign them to a "grid"
			xPos = game.rnd.integerInRange(0,game.world.width-32);
			xPos = xPos - xPos%32
			yPos = game.rnd.integerInRange(64,game.world.height);
			yPos = yPos - yPos%32
			//failsafe for when a block would spawn in or directly around the player
			//without this the player can be killed instantly or trapped at the start
			if((xPos==0&&yPos==game.world.height-32)||(xPos==0&&yPos==game.world.height-64)||(xPos==32&&yPos==game.world.height-32)){
				yPos-=64;
			}
			item = things.create(xPos, yPos, 'bedAtlas',itemNumbers[Math.floor(Math.random() * itemNumbers.length)]);
			//can't push the blocks
			item.body.immovable = true;
			//item.tint = 000099;
			if(game.physics.arcade.collide(things)){
				item.kill();
			}
		}

		//we tween this to be 100% opaque to simulate the lights turning off
		//we put it here to so the player and bed aren't hidden
		lights = game.add.sprite(0,0,'player');
		lights.scale.setTo(16,16);
		lights.alpha = 0;
		lights.tint = 000000;

		//create 10 second timer to turn off lights, which will then trigger the stage timer and display the UI
		lightSwitch = game.time.create(false);
		lightSwitch.add(10000,this.lightsOff,game);
		lightSwitch.start();

		//add a pointer arrow to show the player location
		arrow = this.add.sprite(16,game.world.height-48,'bedAtlas','arrow00');
		arrow.anchor.setTo(0.5,0.5);
		arrow.rotation = Math.PI;
		arrow.animations.add('arrow',Phaser.Animation.generateFrameNames('arrow',0, 3, '',2), 8 ,true);
		arrow.animations.play('arrow');
		

		//adding player and bed objects
		player = game.add.sprite(0,game.world.height-32,'character');
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;

		bed = game.add.sprite(game.world.width-64,0,'bedAtlas','bed');
		game.physics.arcade.enable(bed);

		damagedSound = game.add.audio('damaged');


		//add some movement keys
		up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    	down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    	left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    	right = game.input.keyboard.addKey(Phaser.Keyboard.D);
		upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    	downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    	reset = game.input.keyboard.addKey(Phaser.Keyboard.R);

    	//show the controls for the state
    	wasd = this.add.sprite(game.world.centerX,game.world.centerY,'tutorialAtlas','WASD0');
		wasd.anchor.setTo(0.5,0.5);
		wasd.animations.add('wasd',Phaser.Animation.generateFrameNames('WASD',0, 1, '',1), 1 ,true);
		wasd.animations.play('wasd');
		wasd.alpha = 0;
    	
    	//add some text to to explain some things
		lightsTimerDisplay = game.add.bitmapText(game.world.centerX-150, 32,'font', 'Lights off in...' + Math.round((lightSwitch.duration)/1000),48);
		if(day==1){
			memorizeThis = game.add.bitmapText(game.world.centerX, 80,'font', 'Memorize the room layout',48);
			memorizeThis.anchor.setTo(0.5,0);
		}
		resetText = game.add.bitmapText(game.world.centerX, game.world.height-48,'font', 'Trapped? Press \'R\' to reset',48);
		resetText.anchor.setTo(0.5,0);

		
		//boolean to make sure the player can't move if the lights are still on
		off = false;


	},
	update: function(){
		//send to game over if health is 0
		if(health < 1){
			game.state.start('gameOver');
		}
		
		//if they need to reset the state
		this.reset();
		//once the lights turn off allow them to move and show the controls
		if(off){
			this.move();
			this.tutorial();
		}
		this.collide();
		//countdown to the lights off
		if (lightSwitch.duration > 0) {
            lightsTimerDisplay.text = 'Lights off in... ' + Math.ceil((lightSwitch.duration)/1000);
        }
        //kill the text once the lights are off
        else{
        	lightsTimerDisplay.kill();
        	if(day==1)
        		memorizeThis.kill();
        	resetText.kill();
        }
	},
	//handle the movement of the game
	move: function(){
		if(up.justPressed()||upKey.justPressed()){
			player.body.y-=32;
		}
		else if(down.justPressed()||downKey.justPressed()){
			player.body.y+=32;
		}
		else if(left.justPressed()||leftKey.justPressed()){
			player.body.x-=32;
		}
		else if(right.justPressed()||rightKey.justPressed()){
			player.body.x+=32;
		}
	},
	//hide the background
	lightsOff: function(){
		game.add.tween(lights).to({ alpha: 1 }, 1, "Linear", true);

		//flag the timer
		off = true;
		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){console.log('fired'), game.state.start('brushing',true,false)},game);
		stageTimer.start();

		//show our UI
		scoreDisplay = new Score();
		healthBG = new HealthBG();
		healthDisplay = new Health();
		timeDisplay = new TimeDisplay(stageTimer);
	},
	//handle the collision
	collide: function(){
		if(game.physics.arcade.overlap(player,bed)){
			console.log('yay');
			game.state.start('brushing');
			score+=100;
		}
		if(game.physics.arcade.collide(player, things)){
			health-=2;
			damagedSound.play('',0,1,false);
		}
	},
	//show the controls on the screen
	tutorial: function(){
		wasd.alpha = 1;
		if(up.justPressed()||upKey.justPressed()||down.justPressed()||downKey.justPressed()||left.justPressed()||leftKey.justPressed()||right.justPressed()||rightKey.justPressed()){
			arrow.x = game.world.width-96
			arrow.y = 32
			arrow.rotation = Math.PI/2;
			arrowTimer = game.time.create(false);
			arrowTimer.add(5000,function(){arrow.kill()},game);
			arrowTimer.start();
			wasd.kill();
		}
	},
	//reset the state if the layout is traps the player
	reset: function(){
		if(reset.justPressed()){
			game.state.start('bed');
		}
	}
}