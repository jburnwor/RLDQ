var colors = [0x1BE7FF, 0x6EEB83, 0xE4FF1A, 0xE8AA14, 0xE8AA14];

var walking = function () {
    this.rightJustPressed = false;
    this.leftJustPressed = false;
    this.bothJustPressed = false;
    this.doubleRight = false;
    this.doubleLeft = false;
    this.player;
    this.playerLeft;
    this.playerRight;
    this.bg;
    this.impact;
}
walking.prototype = {
    preload: function () {
        this.load.path = 'assets/img/'
        this.load.image('temp', 'playerTemp.png')
        this.load.path = 'assets/img/walking/';
        this.load.image('player', 'sprite/charWalk00.png')
        this.load.image('player1', 'sprite/charWalk00.png');
        this.load.image('player2', 'sprite/charWalk01.png');

        this.load.image('bg', 'walking.png');

        this.load.path = 'assets/img/brushing/'
        this.load.image('blood', 'blood.png');



        this.load.path = 'assets/audio/';
        this.load.audio('damaged', ['damaged.ogg']);
        this.load.audio('step', ['stepALT.ogg']);

    },

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        damagedSound = game.add.audio('damaged');
        stepSound = game.add.audio('step');

        //set background as a tilesprite and ajust the size to fit in the screen
        this.bg = game.add.tileSprite(0, 0, 512, 512, 'bg');
        // this.bg.tileScale.x = 4;
        // this.bg.tileScale.y = 4;

        //create player sprite and all its frames so the frames can be shown later 
        //the animation is done this way currenly to get it working since the 
        //sprites are not currently in a spritesheet or atlas
        this.player = this.add.sprite(50, 420, 'player');
        this.playerLeft = this.add.sprite(50, 420, 'player1');
        this.playerLeft.alpha = 0;
        this.playerRight = this.add.sprite(50, 420, 'player2');
        this.playerRight.alpha = 0;

        instruction = this.add.sprite(game.world.centerX,game.world.centerY,'tutorialAtlas','instruction00');
		instruction.anchor.setTo(0.5,0.5);
		instruction.animations.add('tutorial',Phaser.Animation.generateFrameNames('instruction',0, 1,'',2), 1 ,true);
		instruction.animations.play('tutorial');

        //set up emitter to indicate when the player double presses a direction and losses health
        this.impact = game.add.emitter(0, 0, 50);
        this.impact.makeParticles('temp');			// image used for particles
        this.impact.gravity = 800;
        this.impact.minParticleScale = 0.1;
        this.impact.maxParticleScale = 0.1;

        this.impact.x = this.player.x + 2;
        this.impact.y = this.player.y + 30;


        //to display the score
        scoreDisplay = new Score();
        healthBG = new HealthBG();
        healthDisplay = new Health();

        //timer for the stage
        stageTimer = game.time.create(false);
        stageTimer.add(30000, function () { console.log('timer'), game.state.start('stamping') }, game);
        stageTimer.start();

        timeDisplay = new TimeDisplay(stageTimer);

    },
    update: function () {
        //send to game over if health is 0
		if(health < 1){
			game.state.start('gameOver');
        }
        
        //if else checks for pressing left or right

        //check when both left and right is pressed and take away health
        if ((game.input.keyboard.justPressed(Phaser.Keyboard.Left) || game.input.keyboard.justPressed(Phaser.Keyboard.A)) && (game.input.keyboard.justPressed(Phaser.Keyboard.Right) || game.input.keyboard.justPressed(Phaser.Keyboard.D))) {

            this.player.tint = 0xfffff0;
            //if both left and right are pressed then the player losses health
            if (!this.bothJustPressed) {
                console.log('bad both');
                health -= 3;
                //set player frame to show
                this.player.alpha = 1;
                this.playerLeft.alpha = 0;
                this.playerRight.alpha = 0;
                this.bg.tilePosition.x -= 8;
                damagedSound.play('',0,1,false);
            }

            //reset booleans 
            if (this.rightJustPressed) {
                this.rightJustPressed = false;
            } else if (this.leftJustPressed) {
                this.leftJustPressed = false;
            }

            //set boolean to show both directions were pressed
            this.bothJustPressed = true;

            //check if left is pressed
        } else if (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT) || game.input.keyboard.justPressed(Phaser.Keyboard.A)) {
            //check to see if button has already been pressed
            if (!this.leftJustPressed) {
                //set player frame to show
                this.player.alpha = 0;
                this.playerLeft.alpha = 1;
                this.playerRight.alpha = 0;
                //add score for the first press of the left button 
                score += 0.1;
                //move background 
                this.bg.tilePosition.x -= 8;
                stepSound.play('',0,0.5,false);
            } else if (this.leftJustPressed) {
                this.bg.tilePosition.x -= 8;
                console.log('second left');
                //set off the emitter
                this.impact.alpha = 1;
                this.impact.start(true, 100, null, 10);	// (explode, lifespan, freq, quantity)
                health -= 3;
                damagedSound.play('',0,1,false);

            }

            //reset booleans
            if (this.rightJustPressed) {
                this.rightJustPressed = false;
            } else if (this.bothJustPressed) {
                this.bothJustPressed = false;
            }

            this.leftJustPressed = true;

        } else if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT) || game.input.keyboard.justPressed(Phaser.Keyboard.D)) {
            //same as left but for right button

            if (!this.rightJustPressed) {
                score += 0.1;
                this.player.alpha = 0;
                this.playerLeft.alpha = 0;
                this.playerRight.alpha = 1;
                this.bg.tilePosition.x -= 8;
                stepSound.play('',0,0.7,false);
            } else if (this.rightJustPressed) {
                this.bg.tilePosition.x -= 8;
                console.log('double right')
                this.impact.alpha = 1;
                this.impact.start(true, 100, null, 10);	// (explode, lifespan, freq, quantity)
                health -= 3;
                damagedSound.play('',0,1,false);
            }
            //reset booleans
            if (this.leftJustPressed) {
                this.leftJustPressed = false;
            } else if (this.bothJustPressed) {
                this.bothJustPressed = false;
            }

            this.rightJustPressed = true;
        }

        if(stageTimer.duration<=25000){
			instruction.kill();
		}

        function fadeImpact() {

            this.impact.start(true, 100, null, 10);	// (explode, lifespan, freq, quantity)
        }
    },

    render: function () {

        //game.debug.bodyInfo(brush, 32, 32);

        //game.debug.body(brush);

        //game.debug.geom(allTeeth, '#ff0000', false);

    }
}