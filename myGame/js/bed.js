//all placement of objects were done with 512x512 in mind
var bed = function(){}
bed.prototype = {
	preload: function(){
		this.load.path = 'assets/img/';
		this.load.image('player','playerTemp.png');
	},
	create: function(){

		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.stage.backgroundColor = 'rgb(127,127,127)';

		//put our obstacles in a group 
		things = game.add.group();
		things.enableBody = true;

		//spawn them
		for(var i = 0; i<64;i++){
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
			item = things.create(xPos, yPos, 'player');
			//can't push the blocks
			item.body.immovable = true;
			item.tint = 000099;
		}

		//we tween this to be 100% opaque to simulate the lights turning off
		//we put it here to so the player and bed aren't hidden
		lights = game.add.sprite(0,0,'player');
		lights.scale.setTo(16,16);
		lights.alpha = 0;
		lights.tint = 000000;

		//create 10 second timer to turn off lights, which will then trigger the stage timer
		lightSwitch = game.time.create(false);
		lightSwitch.add(10000,this.lightsOff,game);
		lightSwitch.start();
		

		//adding player and bed objects
		player = game.add.sprite(0,game.world.height-32,'player');
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;

		bed = game.add.sprite(game.world.width-32,0,'player');
		game.physics.arcade.enable(bed);
		bed.scale.setTo(1,2);

		damagedSound = game.add.audio('damaged');


		//add some movement keys
		up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    	down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    	left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    	right = game.input.keyboard.addKey(Phaser.Keyboard.D);

    	//show our UI
		scoreDisplay = new Score();
		healthDisplay = new Health();
		
		//boolean to make sure the player can't move if the lights are still on
		off = false;
	},
	update: function(){
		if(off){
			this.move();
		}
		this.collide();
	},
	move: function(){
		if(up.justPressed()){
			player.body.y-=32;
			//console.log(player.body.x,player.body.y);
		}
		else if(down.justPressed()){
			player.body.y+=32;
			//console.log(player.body.x,player.body.y);
		}
		else if(left.justPressed()){
			player.body.x-=32;
			//console.log(player.body.x,player.body.y);
		}
		else if(right.justPressed()){
			player.body.x+=32;
			//console.log(player.body.x,player.body.y);
		}
	},
	lightsOff: function(){
		game.add.tween(lights).to({ alpha: 1 }, 1, "Linear", true);
		off = true;
		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){console.log('fired'), game.state.start('brushing',true,false)},game);
		stageTimer.start();
	},
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
	}
}