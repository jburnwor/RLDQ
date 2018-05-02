//all placement of objects were done with 512x512 in mind
var stamping = function(){}
stamping.prototype = {
	preload: function(){
		console.log('stamping: preload');
		this.load.path = 'assets/img/stampingPapers/';
		this.load.image('paper','paper.png');
		this.load.image('stampTemp','stamp.png');
		this.load.image('sheet','paperSheet.png');
		this.load.image('bin','tray.png');
		this.load.image('bg','desk.png');
	},
	create: function(){
		console.log('stamping: create');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//added as sprite since we want to grab its bounds
		bg = this.add.sprite(0,0,'bg');

		//create 30 second timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){console.log('fired')},game);
		stageTimer.start();

		//add paper stack
		paper = this.add.sprite(game.world.centerX+10,game.world.centerY-10,'paper');
		paper.anchor.setTo(0.5,0);
		game.physics.arcade.enable(paper);
		paper.body.checkCollision.left = false;
		paper.body.checkCollision.down = false;
		paper.body.checkCollision.right = false;


		//add stamp
		stamp = this.add.sprite(game.width-85,game.world.centerY-10,'stampTemp');
		stamp.inputEnabled = true; 				//Enables input (mouse click) for the stamp
		//it can be dragged arround by the mouse, setting the value changes if the object will snap to center of mouse
		stamp.input.enableDrag(false);
		game.physics.arcade.enable(stamp);
		stamp.input.boundsRect = bg.getBounds();

		returnStamp = new Phaser.Rectangle(stamp.body.x,stamp.body.y,stamp.width,stamp.height);
    	

		//add bin for finished stamps
		bin = this.add.sprite(game.world.centerX-180,game.world.centerY-10,'bin');
		game.physics.arcade.enable(bin);
		bin.anchor.setTo(0.5,0);

		//variables to make sure creation and scoring only happen once per action
		this.topSheet = true;
		this.scoreAble = true;
		this.returned = true;

		//to display the score
		scoreDisplay = new Score();
		//healthDisplay = new Health();   //this doesnt work right yet

	},
	update: function(){
		if(returnStamp.intersects(stamp.getBounds())){
		  	this.returned = true;
		}

		else{
			this.returned = false;
		}

		if(game.physics.arcade.collide(stamp,paper)&&this.topSheet){
			this.topSheet=false;
			this.createSheet();
		}
		this.enterBin();
	},
	render: function(){
		game.debug.body(paper);
		game.debug.body(bin);
		//we use this to draw the return range
		game.debug.geom(returnStamp,'rgba(255,0,0,20)',false);
	},
	createSheet: function(){
		this.sheet = this.add.sprite(paper.centerX,paper.y,'sheet');
		game.physics.arcade.enable(this.sheet);
		this.sheet.anchor.setTo(0.5,0.5);
		this.sheet.inputEnabled = true;
		this.sheet.input.enableDrag(true);
		this.scoreAble = true;
	},
	enterBin: function(){
		if(game.physics.arcade.overlap(this.sheet,bin)&&this.returned){
			this.sheet.body.x = bin.x-(this.sheet.width/2);
			this.sheet.body.y = bin.y+50;
			this.topSheet = true;
			this.sheet.input.draggable = false;
			if(this.scoreAble){
				score += 10;
				this.scoreAble = false;
			}
		}
		else if(game.physics.arcade.overlap(this.sheet,bin)){
			this.sheet.body.x = bin.x-(this.sheet.width/2);
			this.sheet.body.y = bin.y+50;
			this.topSheet = true;
			this.sheet.input.draggable = false;
			if(this.scoreAble){
				health -=5;
				this.scoreAble = false;
			}
		}
	}
}