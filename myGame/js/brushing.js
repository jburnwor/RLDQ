var brush;
var mouth;
var lastPos;
var tintNum = 0;
var tint = String(0xFFFF00);

var brushing = function () {
	this.gumsEmitter;
}
brushing.prototype = {
	preload: function () {
		this.load.path = 'assets/img/brushing/';
		this.load.image('bg', 'background_color.png');
		this.load.image('mouth', 'mouth.png');
		this.load.image('teeth', 'teeth.png');
		this.load.image('brush', 'brush.png');
		this.load.image('blood', 'blood.png');

		this.load.path = 'assets/audio/';
		this.load.audio('damaged', ['damaged.ogg']);
		this.load.audio('brushSFX', 'brushSFX.ogg');

	},

	create: function () {
		var x = -36;
		var y = 210;
		var teethGap = 100;
		var yGap = (8 * 64) + 8;

		game.physics.startSystem(Phaser.Physics.ARCADE);

		brushSFX = game.add.audio('brushSFX');

		//create the background
		var bg = this.add.sprite(0, 0, 'bg');


		for (var i = 1; i <= 16; i++) {
			if (i <= 8) {
				tooth = new Teeth(game, 'teeth', (x + 64), y, false);
				x += 65;
				game.add.existing(tooth);
			} else {
				tooth = new Teeth(game, 'teeth', x - yGap + 64, y + teethGap, true);
				x += 65;
				game.add.existing(tooth);
			}
		}

		mouth = this.add.sprite(0, 0, 'mouth');
		//mouth.enableBody = true;
		//	mouth.body.immovable = true;

		brush = this.add.sprite(200, 200, 'brush');
		game.physics.enable(brush);
		brush.body.setSize(20, 45, 50, 0);
		brush.anchor.set(0.15, 0.5);


		allTeeth = new Phaser.Rectangle(23, 200, 460, 120);

		//to display the score
		scoreDisplay = new Score();
		healthBG = new HealthBG();
		healthDisplay = new Health();

		//timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000, function () { console.log('timer'), game.state.start('stamping') }, game);
		stageTimer.start();

		timeDisplay = new TimeDisplay(stageTimer);

		this.gumsEmitter = game.add.emitter(0, 0, 200);
		this.gumsEmitter.makeParticles('blood');			// image used for particles
		this.gumsEmitter.gravity = 200;

		mouse = this.add.image(game.world.centerX,game.world.height-55,'tutorialAtlas','sideways00');
		mouse.anchor.setTo(0.5,0);
		mouse.animations.add('mouseTutorial',Phaser.Animation.generateFrameNames('sideways',0, 7, '',2), 8 ,true);
		mouse.animations.play('mouseTutorial');
	},
	update: function () {
		//if the mouse is moving back and forth, give points
		if (backForth(game) && !(allTeeth.intersects(brush.getBounds()))) {
			health -= 0.5;


			this.gumsEmitter.x = brush.x;
			this.gumsEmitter.y = brush.y;
			this.gumsEmitter.start(true, 200, null, 200);	// (explode, lifespan, freq, quantity)

		} else if (backForth(game)) {
			//add points
			score += 0.1;
			if(!brushSFX.isPlaying){
				brushSFX.play('',0,1,false);
			}

		}
		//move brush to pointer
		brush.x = this.game.input.mousePointer.x;
		brush.y = this.game.input.mousePointer.y;


		//  if brush is overlaping pointer, don't move any more
		if (Phaser.Rectangle.contains(brush.body, game.input.x, game.input.y)) {
			brush.body.velocity.setTo(0, 0);
		}

		lastPos = game.input.speed.x;

		//kill the tutorial animation
		if(stageTimer.duration<=25000){
			mouse.kill();
		}

	},

	render: function () {

		//game.debug.bodyInfo(brush, 32, 32);

		//game.debug.body(brush);

		//game.debug.geom(allTeeth, '#ff0000', false);

	}
}

// Teeth prefab constructor function
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
