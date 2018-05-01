//all placement of objects were done with 800x800 in mind
var stamping = function(){}
stamping.prototype = {
	preload: function(){
		console.log('stamping: preload');
		this.load.path = 'assets/img/';
		this.load.image('paper','paperStackTemp.png');
		this.load.image('stampTemp','stampTemp.png');
		this.load.image('sheet','paperSheet.png');
		this.load.image('bin','binTemp.png')
	},
	create: function(){
		console.log('stamping: create');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//create 30 second timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){console.log('fired')},game);
		stageTimer.start();

		//add paper stack
		paper = this.add.sprite(game.width-200,game.height-450,'paper');
		game.physics.arcade.enable(paper);
		paper.body.setSize(paper.width,15,0,0);

		//add stamp
		stamp = this.add.sprite(50,game.height-200,'stampTemp');
		stamp.inputEnabled = true; 				//Enables input (mouse click) for the stamp
		//it can be dragged arround by the mouse, setting the value changes if the object will snap to center of mouse
		stamp.input.enableDrag(false);
		game.physics.arcade.enable(stamp);
		stamp.body.collideWorldBounds = true;

		//add bin for finished stamps
		bin = this.add.sprite(game.world.centerX,game.height-150,'bin');
		game.physics.arcade.enable(bin);
		bin.anchor.setTo(0.5,0);

		this.topSheet = true;

	},
	update: function(){
		if(game.physics.arcade.overlap(stamp,paper)&&this.topSheet){
			this.topSheet=false;
			this.createSheet();
		}
		this.enterBin();
	},
	render: function(){
		game.debug.body(paper);
		game.debug.body(bin);
		if(!this.topSheet){
			game.debug.spriteInfo(this.sheet,32,32);
		}
	},
	createSheet: function(){
		this.sheet = this.add.sprite(paper.centerX,paper.y,'sheet');
		game.physics.arcade.enable(this.sheet);
		this.sheet.anchor.setTo(0.5,0.5);
		this.sheet.inputEnabled = true;
		this.sheet.input.enableDrag(false);
	},
	enterBin: function(){
		if(game.physics.arcade.overlap(this.sheet,bin)){
			this.sheet.body.x = 340;
			this.sheet.body.y = 759;
			this.topSheet = true;
			this.sheet.input.draggable = false;
		}
	}
}