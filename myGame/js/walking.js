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
    this.walkCounter = 0;
}
walking.prototype = {
    preload: function () {
        this.load.path = 'assets/img/'
        this.load.image('temp', 'playerTemp.png')
        this.load.path = 'assets/img/walking/';
        this.load.image('player', 'sprite.png')
        this.load.image('player1', 'sprite/charWalk00.png');
        this.load.image('player2', 'sprite/charWalk01.png');

        this.load.image('bg', 'walking.png');

        this.load.path = 'assets/img/brushing/'
        this.load.image('blood', 'blood.png');

        this.load.path = 'assets/audio/';
        this.load.audio('damaged', ['damaged.ogg']);

        /* this.load.path = 'assets/fonts/';
        this.load.bitmapFont('font', 'm5x7.png', 'm5x7.xml');
        this.stage.disableVisibilityChange = true; */

    },

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        /* //create the background
        var bg = this.add.sprite(0, 0, 'bg'); */
        this.bg = game.add.tileSprite(0, 0, 512, 512, 'bg');
        this.bg.tileScale.x = 4;
        this.bg.tileScale.y = 4;

        this.player = this.add.sprite(50, 450, 'player');
        this.playerLeft = this.add.sprite(50, 450, 'player1');
        this.playerLeft.alpha = 0;
        this.playerRight = this.add.sprite(50, 450, 'player2');
        this.playerRight.alpha = 0;

        this.player.scale.setTo(2, 2);
        this.playerLeft.scale.setTo(2, 2);
        this.playerRight.scale.setTo(2, 2);

        this.impact = game.add.emitter(0, 0, 50);
        this.impact.makeParticles('temp');			// image used for particles
        this.impact.gravity = 800;
        this.impact.minParticleScale = 0.1;
        this.impact.maxParticleScale = 0.1;

        this.impact.x = this.player.x + 2;
        this.impact.y = this.player.y + 30;


        //to display the score
        scoreDisplay = new Score();
        healthDisplay = new Health();

        //timer for the stage
        stageTimer = game.time.create(false);
        stageTimer.add(30000, function () { console.log('timer'), game.state.start('stamping') }, game);
        stageTimer.start();

    },
    update: function () {
        //note to self: make it so going left and right makes you go faster and more score 

        if ((game.input.keyboard.justPressed(Phaser.Keyboard.Left) || game.input.keyboard.justPressed(Phaser.Keyboard.A)) && (game.input.keyboard.justPressed(Phaser.Keyboard.Right) || game.input.keyboard.justPressed(Phaser.Keyboard.D))) {

            this.player.tint = 0xfffff0;
            //if both left and right are pressed then the player losses health
            if (!this.bothJustPressed) {
                console.log('bad both');
                health -= 3;
                this.player.alpha = 1;
                this.playerLeft.alpha = 0;
                this.playerRight.alpha = 0;
                this.bg.tilePosition.x -= 2;
            }

            //reset booleans 
            if (this.rightJustPressed) {
                this.rightJustPressed = false;
            } else if (this.leftJustPressed) {
                this.leftJustPressed = false;
            }

            //set boolean to show both directions were pressed
            this.bothJustPressed = true;

        } else if (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT) || game.input.keyboard.justPressed(Phaser.Keyboard.A)) {
            this.player.tint = 0xff0000;
            if (!this.leftJustPressed) {
                /* this.player.y = 415;
                this.player.x = 15; */
                this.player.alpha = 0;
                this.playerLeft.alpha = 1;
                this.playerRight.alpha = 0;
                //add score for the first press of the left button 
                score += 0.1;
                this.bg.tilePosition.x -= 2;
                //reset counter
                this.walkCounter = 0;
            } else if (this.leftJustPressed) {
                this.bg.tilePosition.x -= 2;
                console.log('second left');
                this.impact.alpha = 1;
                this.impact.start(true, 100, null, 10);	// (explode, lifespan, freq, quantity)
                health -= 5;

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
            this.player.tint = 0x001eff;
            /*  this.player.y = 450;
             this.player.x = 50; */

            if (!this.rightJustPressed) {
                score += 0.1;
                this.player.alpha = 0;
                this.playerLeft.alpha = 0;
                this.playerRight.alpha = 1;
                this.walkCounter = 0;
                this.bg.tilePosition.x -= 2;
            } else if (this.rightJustPressed) {
                this.bg.tilePosition.x -= 2;
                console.log('double right')
                this.impact.alpha = 1;
                this.impact.start(true, 100, null, 10);	// (explode, lifespan, freq, quantity)
                health -= 5;
            }
            //reset booleans
            if (this.leftJustPressed) {
                this.leftJustPressed = false;
            } else if (this.bothJustPressed) {
                this.bothJustPressed = false;
            }

            this.rightJustPressed = true;
        }

        function fadeImpact() {

            this.impact.start(true, 100, null, 10);	// (explode, lifespan, freq, quantity)
            //game.add.tween(this.impact).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        }
    },

    render: function () {

        //game.debug.bodyInfo(brush, 32, 32);

        //game.debug.body(brush);

        //game.debug.geom(allTeeth, '#ff0000', false);

    }
}