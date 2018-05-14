var brush;
var mouth;
var lastPos;
var tintNum = 0;
var tint = String(0xFFFF00);
console.log(this.tint);

var brushing = function () {
	this.teethGroup
 }
brushing.prototype = {
	preload: function () {
		this.load.path = 'assets/img/brushing/';
		this.load.image('bg', 'background_color.png');
		this.load.image('mouth', 'mouth.png');
		this.load.image('teeth', 'teeth.png');
		this.load.image('brush', 'tempBrush.png');

		this.load.path = 'assets/audio/';
		this.load.audio('damaged',['damaged.ogg']);

	},

	create: function () {
		var x = -36;
		var y = 210;
		var teethGap = 100;
		var yGap = (8 * 64) + 8;

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//create the background
		var bg = this.add.sprite(0, 0, 'bg');

		//initializes the teethGroup group for the ground and ledges
		this.teethGroup = game.add.physicsGroup();

		for (var i = 1; i <= 16; i++) {
			if (i <= 8) {
				//tooth = new Teeth(game, 'teeth', (x + 64), y, false);
				tooth = this.teethGroup.add(new Teeth(game, 'teeth', (x + 64), y, false));
				x += 65;
				game.add.existing(tooth);
			} else {
				//tooth = new Teeth(game, 'teeth', x - yGap + 64, y + teethGap, true);
				tooth = this.teethGroup.add(new Teeth(game, 'teeth', x - yGap + 64, y + teethGap, true));
				x += 65;
				game.add.existing(tooth);
			}
		}

		mouth = this.add.sprite(0, 0, 'mouth');
		//mouth.enableBody = true;
	//	mouth.body.immovable = true;

		brush = this.add.sprite(200, 200, 'brush');
		game.physics.enable(brush);
		brush.body.setSize(20, 64, 50, 0);
		brush.anchor.set(0.15, 0.5);

		//to display the score
		scoreDisplay = new Score();
		healthDisplay = new Health();

		//timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000, function () { console.log('timer'), game.state.start('stamping')}, game);
		stageTimer.start();

	},
	update: function () {

		//if the mouse is moving back and forth, give points
		if (backForth(game) && (game.physics.arcade.overlap(brush, this.teethGroup))) { //brush.overlap(mouth)
			health -= 2;
		}else if(backForth(game)){
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

		lastPos = game.input.speed.x;
	},

	render: function () {

		//game.debug.bodyInfo(brush, 32, 32);

		//game.debug.body(brush);

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
				this.tint ++;this.tint ++;this.tint ++;this.tint ++;
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
