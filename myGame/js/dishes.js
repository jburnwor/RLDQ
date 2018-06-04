var sponge;
var knife;
var knifeGrime;
var lastPos;
var tintNum = 0;
var tint = String(0xFFFF00);

var dishes = function () {
	this.handsEmitter;
}
dishes.prototype = {
	preload: function () {
		this.load.path = 'assets/img/washingDishes/';
		this.load.image('bg', 'background.png');
		this.load.image('light', 'Light.png');
		this.load.image('sponge', 'Knife/sponge.png')
		this.load.image('knife1', 'Knife/knife1.png');
		this.load.image('knife2', 'Knife/knife2.png');
		this.load.image('knife3', 'Knife/knife3.png');
		this.load.image('grime1', 'Knife/Grime/grime1.png');
		this.load.image('grime2', 'Knife/Grime/grime2.png');
		this.load.image('grime3', 'Knife/Grime/grime3.png');

		this.load.path = 'assets/img/brushing/';
		this.load.image('blood', 'blood.png');

		this.load.path = 'assets/audio/';
		this.load.audio('damaged', ['damaged.ogg']);

		this.load.path = 'assets/fonts/';
		this.load.bitmapFont('font', 'm5x7.png', 'm5x7.xml');
		this.stage.disableVisibilityChange = true;

	},

	create: function () {


		game.physics.startSystem(Phaser.Physics.ARCADE);

		//create the background
		var bg = this.add.sprite(0, 0, 'bg');
		var bg = this.add.sprite(0, 0, 'light');

		/* //add in some background knifes
		this.add.sprite(5, 330, 'knife1');
		this.add.sprite(5, 330, 'grime1');
		this.add.sprite(8, 340, 'knife1');
		this.add.sprite(8, 340, 'grime1'); */

		/* var temp = this.add.sprite(500, 350, 'knife1');
		temp.angle += 180;
		temp = this.add.sprite(510, 340, 'knife1');
		temp.angle += 180;
		temp = this.add.sprite(520, 330, 'knife1');
		temp.angle += 180; */

		//add in the knife that is going to be cleaned
		knife = this.add.sprite(-200, 250, 'knife1');
		knife.scale.setTo(1.5, 1.5);
		knifeGrime = this.add.sprite(-200, 250, 'grime1');
		knifeGrime.alpha = 1;
		knifeGrime.scale.setTo(1.5, 1.5);
		game.physics.enable(knife);

		sponge = this.add.sprite(200, 200, 'sponge');
		game.physics.enable(sponge);
		sponge.anchor.set(0.5, 0.5);
		sponge.tint = String(0xFFFF00);

		//to display the score
		scoreDisplay = new Score();
		healthBG = new HealthBG();
		healthDisplay = new Health();

		cut = new Phaser.Rectangle(10, 250, 175, 6);

		//timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000, function () { console.log('timer'), game.state.start('alarmClock') }, game);
		stageTimer.start();

		this.handsEmitter = game.add.emitter(0, 0, 200);
		this.handsEmitter.makeParticles('blood');			// image used for particles
		this.handsEmitter.gravity = 800;
	},
	update: function () {

		knifeGrime.x = knife.x;
		knifeGrime.y = knife.y;

		cut.x = knife.x + 2;
		cut.y = knife.y + 30;

		knife.x += 1;
		if (knife.x > (game.width + knife.width / 4)) {
			knife.x = 0 - knife.width;

			if (knifeGrime.alpha < 0.1) {
				score += 10;
			} else if (knifeGrime.alpha < 0.3) {
				score += 5;
			} else if (knifeGrime.alpha > 0.9) {
				health -= 5;
			}
			console.log(knifeGrime.alpha);
			knifeGrime.alpha = 1;
		}
		//move brush to pointer
		sponge.x = this.game.input.mousePointer.x;
		sponge.y = this.game.input.mousePointer.y;

		if (cut.intersects(sponge.getBounds())) {
			health -= 0.1;
			//if the mouse is moving back and forth, give points
		this.handsEmitter.x = sponge.x;
		this.handsEmitter.y = sponge.y;
		this.handsEmitter.start(true, 800, null, 10);	// (explode, lifespan, freq, quantity)
		} else if (backForth(game) && game.physics.arcade.overlap(knife, sponge)) {
			knifeGrime.alpha -= 0.01;
			console.log('yes');
		}
		

		lastPos = game.input.speed.x;
	},

	render: function () {

		//game.debug.bodyInfo(brush, 32, 32);

		//game.debug.body(cut);

		//game.debug.geom(cut, '#ff0000', false);

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
