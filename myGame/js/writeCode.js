var code = function(){}
code.prototype = {
	preload: function(){
		this.load.path = 'assets/img/writeCode/'
		this.load.atlas('codeTextAtlas','codeTextAtlas.png','codeTextAtlas.json');
		this.load.path = 'assets/fonts/';
		this.load.bitmapFont('font','m5x7.png','m5x7.xml');
	},
	create: function(){
		//7 of 4,5,6,7, and 8 letter words
		words = ['ADVISE','BEFORE','CREDIT','BUDGET','COSTLY','DEMAND','EQUITY','BOSS','CASH','CELL','COPY','DATA','KEPT','RULE',
				'ACCURATE','BULLETIN','COMMERCE','CONSUMER','DOCUMENT','EVALUATE','FEEDBACK','ASSET','AUDIT','ORDER','SHIFT','USAGE',
				'FOCUS','WORTH','ACCOUNT','BENEFIT','COMPANY','DEFICIT','ECONOMY','MANAGER','PENSION'];


		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')},game);
		stageTimer.start();

		wordsNeeded = 5;

		//here we add enter and backspace as keys the player can press
		//onDown.add(function,context) does an action one time
	 	backspace = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE);
	 	backspace.onDown.add(this.backSpace,this);
	 	enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
	 	enter.onDown.add(this.enterLetter,this);

	 	//starting position of the "on screen keyboard"
		var y = 400;
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
				y = 460;
				x = 0;
			}
			if(i==24){
				x+=6
			}
			this.add.sprite(x+16,y,'codeTextAtlas',id);
			x+=36;
		}
		text = 'hi';

		input = game.add.bitmapText(game.world.centerX,game.world.centerY,"font", '', 78);
		input.anchor.setTo(0.5,0.5);


		up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    	down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    	left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    	right = game.input.keyboard.addKey(Phaser.Keyboard.D);

    	scoreDisplay = new Score();

    	scoreWord = words[Math.floor(Math.random() * words.length)];
		typeThis = game.add.bitmapText(game.world.centerX-200,game.world.centerY-125,"font", 'TYPE: ' + scoreWord, 60);
		amountDisplay = game.add.bitmapText(game.world.centerX-200,game.world.centerY-160,"font", 'WORDS LEFT: ' + wordsNeeded, 60);



	},
	update: function(){
		this.move();
		this.checkWord();
	},
	move: function(){
		//move our select cursor and allow it to wrap around the keyboard
		if(up.justPressed()){
			if(index<13){
				index+=13;
				select.y+=60;
			}
			else{
				index-=13;
				select.y-=60;
			}
		}
		else if(down.justPressed()){
			if(index>13){
				index-=13;
				select.y-=60;
			}
			else{
				index+=13;
				select.y+=60;
			}
		}
		else if(left.justPressed()){
			if(index == 1 || index == 14){
				index+=12;
				select.x+= (36*12);
			}
			else{
				index-=1;
				select.x-=36;
			}
		}
		else if(right.justPressed()){
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
			score+=15;
			scoreWord = words[Math.floor(Math.random() * words.length)];
			typeThis.text = 'TYPE: ' + scoreWord;
			input.text = '';
			wordsNeeded--;
			amountDisplay.text = 'WORDS LEFT: ' + wordsNeeded
		}
	},

	backSpace: function(){
		input.text = input.text.substring(0,input.text.length-1);
	}

}