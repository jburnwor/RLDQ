//all placement of objects were done with 512x512 in mind
var stamping = function(){}
stamping.prototype = {
	preload: function(){
		console.log('stamping: preload');
		this.load.path = 'assets/img/stampingPapers/';

		this.load.atlas('stampAtlas','stampAtlas.png','stampAtlas.json');

		this.load.path = 'assets/audio/';
		this.load.audio('stamped',['stamp.ogg']);
		this.load.audio('pickPaper',['pickPaper.ogg']);
		this.load.audio('placePaper',['placePaper.ogg']);
		this.load.audio('damaged',['damaged.ogg']);

		this.load.path = 'assets/fonts/';
		this.load.bitmapFont('font','m5x7.png','m5x7.xml');

	},
	create: function(){
		console.log('stamping: create');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//added as sprite since we want to grab its bounds
		bg = this.add.sprite(0,0,'stampAtlas','Desk');

		//create 30 second timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){game.state.start('coffee')},game);
		stageTimer.start();

		//add paper stack
		paper = this.add.sprite(game.world.centerX+10,game.world.centerY-10,'stampAtlas','paper001');
		paper.anchor.setTo(0.5,0);
		game.physics.arcade.enable(paper);


		//add stamp
		stamp = this.add.sprite(game.width-85,game.world.centerY-10,'stampAtlas','stamp001');
		stamp.inputEnabled = true; 				//Enables input (mouse click) for the stamp
		//it can be dragged arround by the mouse, setting the value changes if the object will snap to center of mouse
		stamp.input.enableDrag(false);
		game.physics.arcade.enable(stamp);
		stamp.input.boundsRect = bg.getBounds();

		//create an area for the stamp
		returnStamp = new Phaser.Rectangle(stamp.body.x,stamp.body.y,stamp.width,stamp.height);
    	

		//add bin for finished stamps
		bin = this.add.sprite(game.world.centerX-180,game.world.centerY-10,'stampAtlas','trayEmpty');
		game.physics.arcade.enable(bin);
		bin.anchor.setTo(0.5,0);

		//this is the tutorial sprite that appears for the first action
		arrow = this.add.sprite(game.world.centerX+102,game.world.centerY,'stampAtlas','instructionArrow001');
		arrow.anchor.setTo(0.5,0.5);
		arrow.animations.add('arrow',Phaser.Animation.generateFrameNames('instructionArrow',1, 4, '',3), 6 ,true);
		arrow.animations.play('arrow');

		//initialize the sound effects in the game

		stampedSound = game.add.audio('stamped');
		pickPaperSound = game.add.audio('pickPaper');
		placePaperSound = game.add.audio('placePaper');
		damagedSound = game.add.audio('damaged');

		//variables to track the first actions for the tutorial
		this.firstTryStamp = true;
		this.firstTryBin = true;
		//variable to track the current image we're on
		this.sheetTrack = 1;
		//these two variables are to make sure things only happen once during update
		this.topSheet = true;
		this.scoreAble = true;
		//condition to if the player scores or loses health
		this.returned = true;
		//the color the return area
		this.returnColor = 'rgba(0,255,0,20)';

		//to display the score and Health
		scoreDisplay = new Score();
		healthBG = new HealthBG();
		healthDisplay = new Health();
	},
	update: function(){
		//send to game over if health is 0
		if(health < 1){
			game.state.start('gameOver');
			mainTheme.stop();
		}
		
		if(returnStamp.intersects(stamp.getBounds())){
			//if the stamp is back change return area to green
			this.returnColor = 'rgba(0,255,0,20)';
		  	this.returned = true;
		}

		else{
			//if not make it red
			this.returnColor = 'rgba(255,0,0,20)';
			this.returned = false;
		}

		this.tutorial();
		stamp.bringToTop();
		//stamp the paper when the stamp intersects the stack of papers
		if(game.physics.arcade.collide(stamp,paper)&&this.topSheet){
			this.topSheet=false;
			this.createSheet();
			stampedSound.play('',0,0.75,false);		
		}
		//place the stamped paper into the bin
		if(game.physics.arcade.overlap(this.sheet,bin)){
			this.enterBin();
		}
	},

	render: function(){
		//we use this to draw the return area
		game.debug.geom(returnStamp,this.returnColor,false);
	},

	createSheet: function(){
		//this is if else chain changes the current sprite of the paper stack and the paper sheet
		if(this.sheetTrack%3==1){
			this.sheet = this.add.sprite(paper.centerX,paper.y+34,'stampAtlas','paperStamped001');
			paper.loadTexture('stampAtlas','paper002');
		}
		else if(this.sheetTrack%3==2){
			this.sheet = this.add.sprite(paper.centerX,paper.y+34,'stampAtlas','paperStamped002');
			paper.loadTexture('stampAtlas','paper003');
		}
		else if(this.sheetTrack%3==0){
			this.sheet = this.add.sprite(paper.centerX,paper.y+34,'stampAtlas','paperStamped003');
			paper.loadTexture('stampAtlas','paper001');
		}
		
		//so we can check it if collides with the bin
		game.physics.arcade.enable(this.sheet);

		this.sheet.anchor.setTo(0.5,0.5);
		//let us be able to drag it
		this.sheet.inputEnabled = true;
		this.sheet.input.enableDrag(true);
		//play a sound
		this.sheet.events.onDragStart.add(function(){pickPaperSound.play('',0,1,false)},this);
		this.scoreAble = true;
		this.sheetTrack++;
	},
	enterBin: function(){
		//if they return the stamp before putting the sheet in they get point
		if(this.returned){
			this.sheet.destroy();
			this.topSheet = true;
			//change the tray sprite to reflect the last paper in
			if(this.sheetTrack%3==2){
				bin.loadTexture('stampAtlas','tray001');
			}
			else if(this.sheetTrack%3==0){
				bin.loadTexture('stampAtlas','tray002');
			}
			else if(this.sheetTrack%3==1){
				bin.loadTexture('stampAtlas','tray003');
			}
			if(this.scoreAble){
				score += 10;
				this.scoreAble = false;
				placePaperSound.play('',0,2,false);
			}
		}
		//if not they lose health and that sheet doesn't count
		else {
			this.sheet.destroy();
			this.topSheet = true;
			this.sheet.input.draggable = false;
			if(this.scoreAble){
				health -=5;
				this.scoreAble = false;
				damagedSound.play('',0,1,false);
			}
		}
	},

	//display the tutorial sprite, going through each step.
	tutorial: function(){
		if(this.firstTryStamp&&!this.topSheet){
			arrow.scale.setTo(-1,1);
		}
		if(this.firstTryStamp&&!this.topSheet&&this.returned){
			arrow.x = game.world.centerX - 90;
			arrow.scale.setTo(1,1);
			this.firstTryStamp = false;
		}
		if(this.firstTryBin&&this.topSheet&&this.returned&&!this.scoreAble){
			arrow.x = game.world.centerX;
			arrow.scale.setTo(1,1);
			arrow.destroy();
			this.firstTryBin = false;
		}
	}
}