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
        this.load.image('temp', 'assets/img/playerTemp.png')
        this.load.path = 'assets/img/walking/';
        this.load.image('player', 'sprite.png')
        this.load.image('player1', 'sprite/charWalk00.png');
        this.load.image('player2', 'sprite/charWalk01.png');

        this.load.image('bg', 'sceneModel.png');
        this.load.image('light', 'light.png');



        this.load.path = 'assets/audio/';
        this.load.audio('damaged', ['damaged.ogg']);

        this.load.path = 'assets/fonts/';
		this.load.bitmapFont('font','m5x7.png','m5x7.xml');
        this.stage.disableVisibilityChange = true;

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
        
        this.player.scale.setTo(2,2);
        this.playerLeft.scale.setTo(2,2);
        this.playerRight.scale.setTo(2,2);

        this.impact = this.add.sprite(50, 480, 'temp');
        this.impact.scale.setTo(0.25, 0.25);
        this.impact.tint = 0xff0000;
        this.impact.alpha = 0;

        
        //to display the score
        scoreDisplay = new Score();
        healthDisplay = new Health();

        //timer for the stage
        /* stageTimer = game.time.create(false);
        stageTimer.add(30000, function () { console.log('timer'), game.state.start('stamping') }, game);
        stageTimer.start(); */

    },
    update: function () {
        //note to self: make it so going left and right makes you go faster and more score 

        if(game.input.keyboard.justPressed(Phaser.Keyboard.Left) && game.input.keyboard.justPressed(Phaser.Keyboard.Right)){
            
            this.player.tint = 0xfffff0;
            //if both left and right are pressed then the player losses health
            if(!this.bothJustPressed){
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
            }else if(this.leftJustPressed){
                this.leftJustPressed = false;
            }

            //set boolean to show both directions were pressed
            this.bothJustPressed = true;
                
        }else if (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)) {
            this.player.tint = 0xff0000;
            if(!this.leftJustPressed){
                /* this.player.y = 415;
                this.player.x = 15; */
                this.player.alpha = 0;
                this.playerLeft.alpha = 1;
                this.playerRight.alpha = 0;
                //add score for the first press of the left button 
                score += 0.1;
                this.bg.tilePosition.x -= 1;
                //reset counter
                this.walkCounter = 0; 
            }else if(this.doubleLeft){
                //do nothing to prevent holding down the button
            }else if(this.leftJustPressed){
                this.bg.tilePosition.x -= 2;
                //increase counter
                this.walkCounter +=1;
                //one quick tap of a button would increase the counter to about 5
                //so if the counter is past 6 it is most likely double pressed
                //or held down
                if(this.walkCounter > 20){
                    //set boolean so it only takes away health once
                    this.doubleLeft = true;
                }else{
                    //increase score slightly for hopping
                    score += 0.05;
                }
                
            }

            //reset booleans
            if (this.rightJustPressed) {
                this.rightJustPressed = false;
            }else if(this.bothJustPressed){
                this.bothJustPressed = false;
            } else if(this.doubleRight){
                this.doubleRight = false;
            }

            this.leftJustPressed = true;

        } else if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)) {
            //same as left but for right button
            this.player.tint = 0x001eff;
           /*  this.player.y = 450;
            this.player.x = 50; */
            
            if(!this.rightJustPressed){
                score += 0.1;
                this.player.alpha = 0;
                this.playerLeft.alpha = 0;
                this.playerRight.alpha = 1;
                this.walkCounter = 0;
                this.bg.tilePosition.x -= 2;
            }else if(this.doubleRight){
                // do nothing
            }else if(this.rightJustPressed){
                this.bg.tilePosition.x -= 1;
                this.doubleRight = true;
                if(this.walkCounter > 20){
                    this.doubleRight = true;
                } else{
                    score += 0.05;
                }
            }
            //reset booleans
            if (this.leftJustPressed) {
                this.leftJustPressed = false;
            }else if(this.bothJustPressed){
                this.bothJustPressed = false;
            }else if(this.doubleLeft){
                this.doubleLeft = false;
            }

            this.rightJustPressed = true;
        }





        
        // check for collision
		if(!this.player.destroyed) {
			game.physics.arcade.collide(this.player, this.obstacleGroup, this.playerCollision, null, this);
		}

    },

    render: function () {

        //game.debug.bodyInfo(brush, 32, 32);

        //game.debug.body(brush);

        //game.debug.geom(allTeeth, '#ff0000', false);

    }
}