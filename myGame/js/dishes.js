var sponge;
var knife;
var knifeGrime;
var lastPos;
var tintNum = 0;
var tint = String(0xFFFF00);

var dishes = function () {
	this.gumsEmitter;
}
dishes.prototype = {
	preload: function () {
		this.load.image('spongeTemp', 'assets/img/playerTemp.png')
		this.load.path = 'assets/img/washingDishes/';
		this.load.image('bg', 'background.png');
        this.load.image('light', 'Light.png');
		this.load.image('knife1', 'Knife/knife1.png');
		this.load.image('knife2', 'Knife/knife2.png');
        this.load.image('knife3', 'Knife/knife3.png');
        this.load.image('grime1', 'Knife/Grime/grime1.png');
		this.load.image('grime2', 'Knife/Grime/grime2.png');
        this.load.image('grime3', 'Knife/Grime/grime3.png');

		this.load.path = 'assets/audio/';
		this.load.audio('damaged', ['damaged.ogg']);

		this.load.path = 'assets/fonts/';
		this.load.bitmapFont('font','m5x7.png','m5x7.xml');
        this.stage.disableVisibilityChange = true;

	},

	create: function () {
		

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//create the background
        var bg = this.add.sprite(0, 0, 'bg');
        var bg = this.add.sprite(0, 0, 'light');

		//add in some background knifes
		this.add.sprite(5, 330, 'knife1');
		this.add.sprite(5, 330, 'grime1');
		this.add.sprite(8, 340, 'knife1');
		this.add.sprite(8, 340, 'grime1');

		var temp = this.add.sprite(500, 350, 'knife1');
		temp.angle += 180;
		temp = this.add.sprite(510, 340, 'knife1');
		temp.angle += 180;
		temp = this.add.sprite(520, 330, 'knife1');
		temp.angle += 180;

		//add in the knife that is going to be cleaned
		knife = this.add.sprite(10, 250, 'knife1');
		knife.scale.setTo(1.5,1.5);
		knifeGrime = this.add.sprite(10, 250, 'grime1');
		knifeGrime.alpha = 1;
		knifeGrime.scale.setTo(1.5,1.5);
		game.physics.enable(knife);

		sponge = this.add.sprite(200, 200, 'spongeTemp');
		game.physics.enable(sponge);
		sponge.anchor.set(0.5, 0.5);
		sponge.tint = String(0xFFFF00);

		//to display the score
		scoreDisplay = new Score();
		healthBG = new HealthBG();
		healthDisplay = new Health();

		/* //timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000, function () { console.log('timer'), game.state.start('stamping') }, game);
		stageTimer.start(); */
	},
	update: function () {

		knifeGrime.x = knife.x;
		knifeGrime.y = knife.y;

		knife.x += 1;
		if(knife.x > (game.width + knife.width/2)){
			knife.x = 0 - knife.width;
			console.log(knifeGrime.alpha);
			knifeGrime.alpha = 1;
		}
		//move brush to pointer
		sponge.x = this.game.input.mousePointer.x;
		sponge.y = this.game.input.mousePointer.y;

		if(backForth(game) && game.physics.arcade.overlap(knife, sponge)){
			knifeGrime.alpha -= 0.01;
			console.log('yes');
		}
		//if the mouse is moving back and forth, give points
		/* if (backForth(game) && !(allTeeth.intersects(brush.getBounds()))) {
			health -= 0.5;


			this.gumsEmitter.x = brush.x;
			this.gumsEmitter.y = brush.y;
			this.gumsEmitter.start(true, 200, null, 200);	// (explode, lifespan, freq, quantity)

		} else if (backForth(game)) {
			//add points
			score += 0.1;

		}
		//move brush to pointer
		brush.x = this.game.input.mousePointer.x;
		brush.y = this.game.input.mousePointer.y;


		//  if brush is overlaping pointer, don't move any more
		if (Phaser.Rectangle.contains(brush.body, game.input.x, game.input.y)) {
			brush.body.velocity.setTo(0, 0);
		}
*/
		lastPos = game.input.speed.x; 
	},

	render: function () {

		//game.debug.bodyInfo(brush, 32, 32);

		//game.debug.body(brush);

		//game.debug.geom(allTeeth, '#ff0000', false);

	}
}

// Teeth prefab constructor function
function Dishes(game, frame, frame2, startx, starty) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, startx, starty, frame);

	// add custom properties
	this.anchor.set(0.5);


	//enable physics
	game.physics.arcade.enable(this);
	this.body.immovable = true;
}

// define prefab's prototype and constructor
Dishes.prototype = Object.create(Phaser.Sprite.prototype);
Dishes.prototype.constructor = Dishes;

// override Phaser.Sprite update to check bounds and direction
Dishes.prototype.update = function () {
	if (game.physics.arcade.overlap(this, sponge)) {

	}
}

function backForth(game) {
	//checks so player has to move mouse back and forth 
	if (lastPos > 0) {
		if (game.input.speed.x > 0) {
			//no points
			return false;
		} else {
			//points
			return true;
		}
	} else if (lastPos < 0) {
		if (game.input.speed.x < 0) {
			//no points
			return false;
		} else {
			//points
			return true;
		}
	}
}
