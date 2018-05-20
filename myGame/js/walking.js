var walking = function () {
    this.rightJustPressed = false;
    this.leftJustPressed = false;
    this.bothJustPressed = false;
    this.doubleRight = false;
    this.doubleLeft = false;
    this.player;
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

        //kind of a quick and dirty implementation but it works. 
        //could come back at later time to make it better -JLB

        //check when left and right keys are pressed to change animation
        //and check for double presses
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            this.player.tint = 0xfffff0;
            if(!this.bothJustPressed){
                console.log('bad both');
            }

            if (this.rightJustPressed) {
                this.rightJustPressed = false;
            }else if(this.leftJustPressed){
                this.leftJustPressed = false;
            }

            this.bothJustPressed = true;
                
        }else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.tint = 0xff0000;
            if(!this.leftJustPressed){
                console.log('left');
            }else if(this.doubleLeft){
                // do nothing
            }else if(this.leftJustPressed){
                console.log('bad left');
                this.doubleLeft = true;
            }

            if (this.rightJustPressed) {
                this.rightJustPressed = false;
            }else if(this.bothJustPressed){
                this.bothJustPressed = false;
            } else if(this.doubleRight){
                this.doubleRight = false;
            }

            this.leftJustPressed = true;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.tint = 0x001eff;
            if(!this.rightJustPressed){
                console.log('right');
            }else if(this.doubleRight){
                // do nothing
            }else if(this.rightJustPressed){
                console.log('bad right');
                this.doubleRight = true;
            }

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
