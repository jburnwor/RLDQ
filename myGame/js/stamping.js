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
	},
	create: function(){
		console.log('stamping: create');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//added as sprite since we want to grab its bounds
		bg = this.add.sprite(0,0,'stampAtlas','Desk');

		//create 30 second timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){console.log('fired'), game.state.start('alarmClock')},game);
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

		returnStamp = new Phaser.Rectangle(stamp.body.x,stamp.body.y,stamp.width,stamp.height);
    	

		//add bin for finished stamps
		bin = this.add.sprite(game.world.centerX-180,game.world.centerY-10,'stampAtlas','tray001');
		game.physics.arcade.enable(bin);
		bin.anchor.setTo(0.5,0);

		if(day==1){
			arrow1 = this.add.sprite(game.world.centerX+102,game.world.centerY,'stampAtlas','instructionArrow001');
			arrow1.anchor.setTo(0.5,0.5);
			arrow1.animations.add('arrow1',Phaser.Animation.generateFrameNames('instructionArrow',1, 4, '',3), 6 ,true);
			arrow1.animations.play('arrow1');
		}




		stampedSound = game.add.audio('stamped');
		pickPaperSound = game.add.audio('pickPaper');
		placePaperSound = game.add.audio('placePaper');
		damagedSound = game.add.audio('damaged');

		//variables to make sure creation and scoring only happen once per action
		this.firstTryStamp = true;
		this.firstTryBin = true;
		this.sheetTrack = 1;
		this.topSheet = true;
		this.scoreAble = true;
		this.returned = true;
		this.returnColor = 'rgba(0,255,0,20)';

		//to display the score
		scoreDisplay = new Score();
		healthDisplay = new Health;
	},
	update: function(){
		if(returnStamp.intersects(stamp.getBounds())){
			this.returnColor = 'rgba(0,255,0,20)';
		  	this.returned = true;
		}

		else{
			this.returnColor = 'rgba(255,0,0,20)';
			this.returned = false;
		}

		if(day==1){
			this.tutorial();
		}


		if(game.physics.arcade.collide(stamp,paper)&&this.topSheet){
			this.topSheet=false;
			this.createSheet();
			stampedSound.play('',0,0.75,false);		
		}
		if(game.physics.arcade.overlap(this.sheet,bin)){
			this.enterBin();
		}
	},
	render: function(){
		//game.debug.body(paper);
		//game.debug.body(bin);
		//we use this to draw the return range
		game.debug.geom(returnStamp,this.returnColor,false);
	},
	createSheet: function(){
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
		
		game.physics.arcade.enable(this.sheet);




		this.sheet.anchor.setTo(0.5,0.5);
		this.sheet.inputEnabled = true;
		this.sheet.input.enableDrag(true);
		this.sheet.events.onDragStart.add(function(){pickPaperSound.play('',0,1,false)},this);
		this.scoreAble = true;
		this.sheetTrack++;
	},
	enterBin: function(){
		if(this.returned){
			this.sheet.body = false;
			this.sheet.x = bin.x;
			this.sheet.y = bin.y+36;
			this.topSheet = true;
			this.sheet.input.draggable = false;
			if(this.scoreAble){
				score += 10;
				this.scoreAble = false;
				placePaperSound.play('',0,2,false);
			}
		}
		else {
			//this.sheet.body.x = bin.x-(this.sheet.width/2);
			//this.sheet.body.y = bin.y;
			this.sheet.destroy();
			this.topSheet = true;
			this.sheet.input.draggable = false;
			if(this.scoreAble){
				health -=5;
				this.scoreAble = false;
				damagedSound.play('',0,1,false);
				placePaperSound.play('',0,2,false);
			}
		}
	},

	tutorial: function(){
		if(this.firstTryStamp&&!this.topSheet){
			arrow1.scale.setTo(-1,1);
		}
		if(this.firstTryStamp&&!this.topSheet&&this.returned){
			arrow1.x = game.world.centerX - 90;
			arrow1.scale.setTo(1,1);
			this.firstTryStamp = false;
		}
		if(this.firstTryBin&&this.topSheet&&this.returned&&!this.scoreAble){
			arrow1.x = game.world.centerX;
			arrow1.scale.setTo(1,1);
			arrow1.destroy();
			this.firstTryBin = false;
		}
	}
}