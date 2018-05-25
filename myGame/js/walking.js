var colors = [0x1BE7FF, 0x6EEB83, 0xE4FF1A, 0xE8AA14, 0xE8AA14]; 

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
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.destroyed = false;

        // setup barrier group
		this.obstacleGroup = game.add.group();
        this.addObstacle(this.obstacleGroup);

        // check for collision
		if(!this.player.destroyed) {
			game.physics.arcade.collide(this.player, this.obstacleGroup, this.playerCollision, null, this);
		}
        
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
                this.player.y = 415;
                this.player.x = 15;
                //add score for the first press of the left button 
                score += 0.1;
                //reset counter
                this.walkCounter = 0; 
            }else if(this.doubleLeft){
                //do nothing to prevent holding down the button
            }else if(this.leftJustPressed){
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

        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            //same as left but for right button
            this.player.tint = 0x001eff;
            this.player.y = 450;
            this.player.x = 50;
            if(!this.rightJustPressed){
                score += 0.1;
                this.walkCounter = 0;
            }else if(this.doubleRight){
                // do nothing
            }else if(this.rightJustPressed){
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

    addObstacle: function(group) {
		// construct new Barrier object, add it to the game world, and add it to the group
		var tintColor = colors[game.rnd.between(0, colors.length-1)]; // grab a random color
        var obstacle = new Obstacle(game, tintColor);
		game.add.existing(obstacle);
		group.add(obstacle);
    },
    
    playerCollision: function(player, group){
        health -= 0.1;
    },

    render: function () {

        //game.debug.bodyInfo(brush, 32, 32);

        //game.debug.body(brush);

        //game.debug.geom(allTeeth, '#ff0000', false);

    }
}

// Obstacle prefab constructor function
function Obstacle(game, tintColor) {
    this.justPressed = false;
    this.newObstacle = true;
    this.tint = tintColor;
    // call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
    var position = game.rnd.integerInRange(0,1);
    if(position > 0){
        Phaser.Sprite.call(this, game, game.rnd.integerInRange(game.width,game.width-64), 415, 'player');
    }else{
        Phaser.Sprite.call(this, game, game.rnd.integerInRange(game.width,game.width-64), 450, 'player');
    }
    
    //enable physics
    game.physics.enable(this, Phaser.Physics.ARCADE);
}
// define prefab's prototype and constructor
Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

// override Phaser.Sprite update to check bounds and direction
Obstacle.prototype.update = function() {

    if(this.newObstacle && this.x < game.width/2) {
		this.newObstacle = false;
		walking.prototype.addObstacle(this.parent, this.tint);
	}

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        if(!this.justPressed){
            this.x -= 10;
            this.justPressed = true;
        }
    }else{
        this.justPressed = false;
    }

    if(this.x < -this.width) {
		this.kill();	
	}
    
}
