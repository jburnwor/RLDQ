var brush;
var mouth;
var lastPos;
var tintNum = 0;
var tint = String(0xFFFF00);

var dishes = function () {
	this.gumsEmitter;
}
dishes.prototype = {
	preload: function () {
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

	},

	create: function () {
		

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//create the background
        var bg = this.add.sprite(0, 0, 'bg');
        var bg = this.add.sprite(0, 0, 'light');


		

        knife = this.add.sprite(0, 0, 'knife1');
        knifeGrime = this.add.sprite(0, 0, 'grime1');

		game.physics.enable(knife);

		/* //to display the score
		scoreDisplay = new Score();
		healthBG = new HealthBG();
		healthDisplay = new Health(); */

		/* //timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000, function () { console.log('timer'), game.state.start('stamping') }, game);
		stageTimer.start(); */
	},
	update: function () {
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

		lastPos = game.input.speed.x; */
	},

	render: function () {

		//game.debug.bodyInfo(brush, 32, 32);

		//game.debug.body(brush);

		//game.debug.geom(allTeeth, '#ff0000', false);

	}
}

/* // Teeth prefab constructor function
function Teeth(game, frame, startx, starty, flip) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, startx, starty, frame);

	// add custom properties
	this.anchor.set(0.5);

	this.tint = String(0xFFFF00);

	if (flip) {
		this.scale.y *= -1;
	}


	//enable physics
	game.physics.arcade.enable(this);
	this.body.immovable = true;
}
// define prefab's prototype and constructor
Teeth.prototype = Object.create(Phaser.Sprite.prototype);
Teeth.prototype.constructor = Teeth;

// override Phaser.Sprite update to check bounds and direction
Teeth.prototype.update = function () {
	if (game.physics.arcade.overlap(this, brush)) {
		if (tintNum % 3 == 0) {
			if (this.tint < 16777200) {
				this.tint++; this.tint++; this.tint++; this.tint++;
				//this.tint ++;this.tint ++;this.tint ++;this.tint ++;
				tint = this.tint;
			}
		}
		//this.tint = 0xffffff;
		if (backForth(game)) {
			tintNum++;
		}
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
 */