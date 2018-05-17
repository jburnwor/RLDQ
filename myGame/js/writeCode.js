
//this is adapted from the google webfonts phaser example
WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 2.5 second delay before calling 'createText' to make sure the browser can render it
    active: function() { game.time.events.add(2500, function(){}, this); },
    //  the font we want
    google: {
      families: ['Orbitron']
    }
};
var code = function(){}
code.prototype = {
	preload: function(){
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		this.load.path = 'assets/img/writeCode/'
		this.load.atlas('codeTextAtlas','codeTextAtlas.png','codeTextAtlas.json');
		this.load.path = 'assets/fonts/';
		this.load.bitmapFont('font','m5x7.png','m5x7.xml');
	},
	create: function(){

	 	backspace = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE);
	 	backspace.onDown.add(this.backSpace,this);
	 	enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
	 	enter.onDown.add(this.enterLetter,this);



		var y = 400;
		var x = 0;
		index = 1;
		select = new Phaser.Rectangle(16,y,35,35);

		for(var i = 1;i <=26; i++){
			if(i<10){
				var id = '0'+ i;
				console.log(id);
			}
			else{
				id = '' + i;
				console.log(id);
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



	},
	update: function(){
		this.move();
	},
	move: function(){
		if(up.justPressed()&&index>13){
			index-=13;
			select.y-=60;
			console.log(index);
		}
		else if(down.justPressed()&&index<14){
			index+=13;
			select.y+=60;
			console.log(index);
		}
		else if(left.justPressed()&&(index!=1 && index!= 14)){
			index-=1;
			select.x-=36;
			console.log(index);
		}
		else if(right.justPressed()&&(index!=13 && index!= 26)){
			index+=1;
			select.x+=36;
			console.log(index);
		}
	},

	enterLetter: function(){
		//I'm in awe at the size of this \/ lad, the absolute unit
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
		game.debug.geom(select,'green',false);
	},
	keyPress: function(char){
		// bmd.cls();
		// console.log(char);
		// letter = char;
		// text = text + letter;
		// bmd.context.fillText(text,64,64);
		// console.log(text);
	},

	backSpace: function(){
		// console.log("hmmmmmmmmmmmmm");

		input.text = input.text.substring(0,input.text.length-1);


	}

}