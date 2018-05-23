var walking = function () {
    this.rightJustPressed = false;
    this.leftJustPressed = false;
    this.bothJustPressed = false;
    this.doubleRight = false;
    this.doubleLeft = false;
    this.player;
    this.walkCounter = 0;
}
walking.prototype = {
    preload: function () {
        this.load.path = 'assets/img/';
        this.load.image('player', 'playerTemp.png');


        this.load.path = 'assets/audio/';
        this.load.audio('damaged', ['damaged.ogg']);

    },

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);

		/* //create the background
        var bg = this.add.sprite(0, 0, 'bg'); */

        this.player = this.add.sprite(50, 450, 'player');

        //to display the score
        scoreDisplay = new Score();
        healthDisplay = new Health();

        //timer for the stage
        /* stageTimer = game.time.create(false);
        stageTimer.add(30000, function () { console.log('timer'), game.state.start('stamping') }, game);
        stageTimer.start(); */

    },
    update: function () {
        //check when left and right keys are pressed to change animation and add score
        //and check for double presses to take away health
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            this.player.tint = 0xfffff0;
            //if both left and right are pressed then the player losses health
            if(!this.bothJustPressed){
                console.log('bad both');
                health -= 3;
            }

            //reset booleans 
            if (this.rightJustPressed) {
                this.rightJustPressed = false;
            }else if(this.leftJustPressed){
                this.leftJustPressed = false;
            }

            //set boolean to show both directions were pressed
            this.bothJustPressed = true;
                
        }else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.tint = 0xff0000;
            if(!this.leftJustPressed){
                //add score for the first press of the left button 
                score += 0.2;
                //reset counter
                this.walkCounter = 0;
            }else if(this.doubleLeft){
                // do nothing (so it doesn't continually take away health)
            }else if(this.leftJustPressed){
                //increase counter
                this.walkCounter +=1;
                //one quick tap of a button would increase the counter to about 5
                //so if the counter is past 6 it is most likely double pressed
                //or held down
                if(this.walkCounter > 6){
                    //take away health for double tapping
                    health -= 1;
                    //set boolean so it only takes away health once
                    this.doubleLeft = true;
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
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            //same as left but for right button
            this.player.tint = 0x001eff;
            if(!this.rightJustPressed){
                score += 0.2;
                this.walkCounter = 0;
            }else if(this.doubleRight){
                // do nothing
            }else if(this.rightJustPressed){
                this.doubleRight = true;
                health -= 0.5;
                if(this.walkCounter > 6){
                    health -= 1;
                    this.doubleRight = true;
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
            

    },

    render: function () {

        //game.debug.bodyInfo(brush, 32, 32);

        //game.debug.body(brush);

        //game.debug.geom(allTeeth, '#ff0000', false);

    }
}
