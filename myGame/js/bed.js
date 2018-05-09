//all placement of objects were done with 512x512 in mind
var bed = function(){}
bed.prototype = {
	preload: function(){
		this.load.path = 'assets/img/';
		this.load.image('player','playerTemp.png');
	},
	create: function(){

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//added as sprite since we want to grab its bounds
		game.stage.backgroundColor = 'rgb(127,127,127)';

		//create 30 second timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){console.log('fired')},game);
		stageTimer.start();

		things = game.add.group();
		things.enableBody = true;


		for(var i = 0; i<50;i++){
			xPos = game.rnd.integerInRange(0,game.world.width);
			xPos = xPos - xPos%32
			yPos = game.rnd.integerInRange(0,game.world.height-32);
			yPos = yPos - yPos%32
			console.log(xPos,yPos);
			item = things.create(xPos, yPos, 'player');
			item.body.immovable = true;
			item.tint = 000099;
		}

		lights = game.add.sprite(0,0,'player');
		lights.scale.setTo(16,16);
		lights.alpha = 0;
		lights.tint = 000000;

		game.add.tween(lights).to({ alpha: 1 }, 30000, "Linear", true);


		player = game.add.sprite(0,game.world.height-32,'player');
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;


		


		//add some movement keys
		up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    	down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    	left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    	right = game.input.keyboard.addKey(Phaser.Keyboard.D);

		scoreDisplay = new Score();
		healthDisplay = new Health();
		
		pressed = false;
	},
	update: function(){
		this.move();
		game.physics.arcade.collide(player, things);
	},
	move: function(){
		if(up.justPressed()){
			player.body.y-=32;
			console.log(player.body.x,player.body.y);
		}
		else if(down.justPressed()){
			player.body.y+=32;
			console.log(player.body.x,player.body.y);
		}
		else if(left.justPressed()){
			player.body.x-=32;
			console.log(player.body.x,player.body.y);
		}
		else if(right.justPressed()){
			player.body.x+=32;
			console.log(player.body.x,player.body.y);
		}
	}
}