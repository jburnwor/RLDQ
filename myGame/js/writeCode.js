var code = function(){}
code.prototype = {
	preload: function(){
		this.load.path = 'assets/img/writeCode/'
		this.load.atlas('codeTextAtlas','codeTextAtlas.png','codeTextAtlas.json');
		this.load.image('bg','background.png');
		this.load.atlas('tutorialAtlas','../tutorialAtlas.png','../tutorialAtlas.json');
		this.load.atlas('codeAnimation','codeAnimation.png','codeAnimation.json')
		this.load.path = 'assets/fonts/';
		this.load.bitmapFont('font','m5x7.png','m5x7.xml');
		this.load.audio('keySound','../audio/codeMove.ogg');
	},
	create: function(){
		//7 of 4,5,6,7, and 8 letter words
		words = ['ADVISE','BEFORE','CREDIT','BUDGET','COSTLY','DEMAND','EQUITY','BOSS','CASH','CELL','COPY','DATA','KEPT','RULE',
				'ACCURATE','BULLETIN','COMMERCE','CONSUMER','DOCUMENT','EVALUATE','FEEDBACK','ASSET','AUDIT','ORDER','SHIFT','USAGE',
				'FOCUS','WORTH','ACCOUNT','BENEFIT','COMPANY','DEFICIT','ECONOMY','MANAGER','PENSION'];


		game.add.image(0,0,'bg');


		codeAnimation = this.add.sprite(0,0,'codeAnimation','codeAnim000');
		codeAnimation.animations.add('codeAnimation',Phaser.Animation.generateFrameNames('codeAnim',0, 39, '',3), 2 ,true);
		codeAnimation.animations.play('codeAnimation');

		keySound = game.add.audio('keySound');

		wasd=game.add.image(16,260,'tutorialAtlas','WASD0');
		wasd.scale.setTo(0.6,0.6);

		bkSpace=game.add.image(game.world.centerX-25,290,'tutorialAtlas','BACKSPACE');
		bkSpace.scale.setTo(0.75,0.75);

		entr=game.add.image(game.world.width-100,256,'tutorialAtlas','ENTER');
		entr.scale.setTo(0.75,0.75);

		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){this.checkNeeded, console.log('timer'), game.state.start('alarmClock')},game);
		stageTimer.start();

		wordsNeeded = 4;

		//here we add enter and backspace as keys the player can press
		//onDown.add(function,context) does an action one time
	 	backspace = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE);
	 	backspace.onDown.add(this.backSpace,this);
	 	enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
	 	enter.onDown.add(this.enterLetter,this);

	 	//starting position of the "on screen keyboard"
		var y = 390;
		var x = 0;
		//the letter they are on
		index = 1;
		//display a selection cursor
		select = new Phaser.Rectangle(16,y,35,35);

		for(var i = 1;i <=26; i++){
			if(i<10){
				var id = '0'+ i;
			}
			else{
				id = '' + i;
			}
			if(i==14){
				y = 450;
				x = 0;
			}
			if(i==24){
				x+=6
			}
			letter = this.add.sprite(x+16,y,'codeTextAtlas',id);
			x+=36;
		}

		up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    	down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    	left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    	right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    	downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    	timeDisplay = new TimeDisplay(stageTimer);

    	input = game.add.bitmapText(game.world.centerX,game.world.centerY,"font", '', 78);
		input.anchor.setTo(0.5,0.5);

    	scoreWord = words[Math.floor(Math.random() * words.length)];

		typeThis = game.add.bitmapText(game.world.centerX,game.world.centerY-160,"font", 'TYPE: ' + scoreWord, 60);
		typeThis.anchor.setTo(0.5,0);
		typeThis.tint = 0x39ff14;
		
		amountDisplay = game.add.bitmapText(game.world.centerX,game.world.centerY-125,"font", 'WORDS LEFT: ' + wordsNeeded, 60);
		amountDisplay.anchor.setTo(0.5,0);
		amountDisplay.tint = 0x39ff14;


    	scoreDisplay = new Score();
    	healthBG = new HealthBG();
    	healthDisplay = new Health();
    	


	},
	update: function(){
		this.move();
		this.checkWord();
	},
	move: function(){
		//move our select cursor and allow it to wrap around the keyboard
		if(up.justPressed() || upKey.justPressed()){
			keySound.play('',0,2,false);
			if(index<13){
				index+=13;
				select.y+=60;
			}
			else{
				index-=13;
				select.y-=60;
			}
		}
		else if(down.justPressed() || downKey.justPressed()){
			keySound.play('',0,2,false);
			if(index>13){
				index-=13;
				select.y-=60;
			}
			else{
				index+=13;
				select.y+=60;
			}
		}
		else if(left.justPressed() || leftKey.justPressed()){
			keySound.play('',0,2,false);
			if(index == 1 || index == 14){
				index+=12;
				select.x+= (36*12);
			}
			else{
				index-=1;
				select.x-=36;
			}
		}
		else if(right.justPressed() || rightKey.justPressed()){
			keySound.play('',0,2,false);
			if(index == 13 || index == 26){
				index-=12;
				select.x-=(36*12);
			}
			else{
				index+=1;
				select.x+=36;
			}	
		}
	},

	enterLetter: function(){
		keySound.play('',0,2,false);
		//I'm in awe at the size of this lad, the absolute unit
		if(index==1){input.text = input.text + 'A'}
		else if(index==2){input.text = input.text + 'B'}
		else if(index==3){input.text = input.text + 'C'}
		else if(index==4){input.text = input.text + 'D'}
		else if(index==5){input.text = input.text + 'E'}
		else if(index==6){input.text = input.text + 'F'}
		else if(index==7){input.text = input.text + 'G'}
		else if(index==8){input.text = input.text + 'H'}
		else if(index==9){input.text = input.text + 'I'}
		else if(index==10){input.text = input.text + 'J'}
		else if(index==11){input.text = input.text + 'K'}
		else if(index==12){input.text = input.text + 'L'}
		else if(index==13){input.text = input.text + 'M'}
		else if(index==14){input.text = input.text + 'N'}
		else if(index==15){input.text = input.text + 'O'}
		else if(index==16){input.text = input.text + 'P'}
		else if(index==17){input.text = input.text + 'Q'}
		else if(index==18){input.text = input.text + 'R'}
		else if(index==19){input.text = input.text + 'S'}
		else if(index==20){input.text = input.text + 'T'}
		else if(index==21){input.text = input.text + 'U'}
		else if(index==22){input.text = input.text + 'V'}
		else if(index==23){input.text = input.text + 'W'}
		else if(index==24){input.text = input.text + 'X'}
		else if(index==25){input.text = input.text + 'Y'}
		else if(index==26){input.text = input.text + 'Z'}
	},


	render:function(){
		game.debug.geom(select,'#39ff14',false);
	},
	checkWord: function(){
		if(scoreWord===input.text){
			score+=(scoreWord.length*3);
			scoreWord = words[Math.floor(Math.random() * words.length)];
			typeThis.text = 'TYPE: ' + scoreWord;
			input.text = '';
			wordsNeeded--;
			amountDisplay.text = 'WORDS LEFT: ' + wordsNeeded
		}
	},

	backSpace: function(){
		keySound.play('',0,2,false);
		input.text = input.text.substring(0,input.text.length-1);
	},
	checkNeeded: function(){
		if(wordsNeeded>0){
			health-=wordsNeeded*4
		}
	}
}