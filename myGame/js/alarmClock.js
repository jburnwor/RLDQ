
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
var alarmClock = function(){}
alarmClock.prototype = {
	preload: function(){
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		this.load.path = 'assets/img/alarmClock/';

		this.load.atlas('alarmAtlas','alarmAtlas.png','alarmAtlas.json');

		this.load.path = 'assets/audio/';
		this.load.audio('click',['click.ogg']);
		this.load.path = 'assets/fonts/';
		this.load.bitmapFont('font','m5x7.png','m5x7.xml');
	},
	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);	

		//create 30 second timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000,this.checkTime,this);
		stageTimer.start();

		storedScore = score;
		console.log(storedScore);

		score+=300;
		scoreTimer = game.time.create(false);
		scoreTimer.loop(100,function(){score-=1},this);
		scoreTimer.start();

		
		bg = this.add.sprite(0,0,'alarmAtlas','bg');


		//add button to top of clock
		button = this.add.sprite(game.world.centerX-50,game.world.centerY-65,'alarmAtlas','masterButton');
		game.physics.arcade.enable(button);
		button.anchor.setTo(0.5,0.5);

		confirmButton = this.add.sprite(game.world.centerX+50,game.world.centerY-65,'alarmAtlas','masterButton');
		game.physics.arcade.enable(confirmButton);
		confirmButton.anchor.setTo(0.5,0.5);
		confirmButton.inputEnabled = true;
		confirmButton.events.onInputDown.add(this.checkTime,this);

		//add clock
		clock = this.add.sprite(game.world.centerX,game.world.centerY,'alarmAtlas','desk');
		clock.anchor.setTo(0.5,0.5);

		lamp = this.add.sprite(0,0,'alarmAtlas','lamp');
		
		//text and variables for the clock display
		time = 12;
		dayTrack = 0;
		amPM = ['AM','PM'];
		clockTime = game.add.bitmapText(clock.centerX+112,clock.centerY-24,"font", '00:00 ' + amPM[0], 78);
		clockTime.anchor.setTo(1,0);

		//finger
		finger = this.add.sprite(game.world.centerX-50,0,'alarmAtlas','finger');
		finger.anchor.setTo(0.5,0.5);
		finger.inputEnabled = true; 				//Enables input (mouse click) for the finger
		game.physics.arcade.enable(finger);
		//it can be dragged arround by the mouse, setting the value changes if the object will snap to center of mouse
		finger.input.enableDrag(false);
		//restrict the finger movement to only up and down within specific bounds
		finger.input.allowHorizontalDrag = false;
		fingerBounds = new Phaser.Rectangle(finger.x-(finger.width/2),-75,finger.width,button.y+75);
		finger.input.boundsRect = fingerBounds;


		if(day==1){
			arrow = this.add.sprite(button.x,button.y-50,'alarmAtlas','instructionArrow001');
			arrow.anchor.setTo(0.5,0.5);
			arrow.animations.add('arrow',Phaser.Animation.generateFrameNames('instructionArrow',1, 4, '',3), 8 ,true);
			arrow.animations.play('arrow');
		}

		tryClick = true;
		clickSound = game.add.audio('click');
		damagedSound = game.add.audio('damaged');

		//variables that we want outside of updateClock so they don't reset
		overlapped = false;
		wrapped = true;
		//since the event doesn't start the first time we'll just trigger it manually
		doOnce = true;

		//to display the score
		scoreDisplay = new Score();
		healthBG = new HealthBG();
    	healthDisplay = new Health();
    	timeDisplay = new TimeDisplay(stageTimer);
		

	},
	update: function(){
		if(doOnce){
			this.updateClock();
			doOnce = false;
		}
		if(day==1){
			if((time == 8) && dayTrack%2 == 0){
				arrow.x = confirmButton.x;
				arrow.alpha = 1;
			}
			else if(!tryClick){
				arrow.alpha = 0;
			}
		}

		this.buttonPress();

	},

	updateClock: function(){
		if(!overlapped){
			overlapped = true;
			if(!doOnce){
					time = time + game.rnd.integerInRange(1,4);
					if(tryClick){
						tryClick = false;
						arrow.alpha = 0;
					}
					clickSound.play('',0,1,false);		
			}
			if(time==12){
				if(!doOnce){
					dayTrack++;
				}
					wrapped = true;
					console.log(wrapped);
			}
			else if(time>12){
				console.log(wrapped);
					if(!wrapped){
						dayTrack++;
					}
					time = time%12;
					wrapped = false;
				console.log(wrapped);
			}

			if(time<10){
				clockTime.text ="0"+time+":00 " + amPM[dayTrack%2];
				console.log(clockTime.text);
			}
			else{
				clockTime.text = time +":00 " + amPM[dayTrack%2];
				console.log(time);
			}
		}
	},

	buttonPress: function(){
		if(game.physics.arcade.collide(finger,button)){
			this.updateClock();	
		}
		else if(!game.physics.arcade.collide(finger,button)){
			overlapped = false;			
		}
	},

	checkTime: function(){
		//correct time
		if((time == 8) && dayTrack%2 == 0){
			clickSound.play('',0,1,false);
			game.state.start('bed');
			score+=10;
		}
		//wrong time
		else{
			clickSound.play('',0,1,false);
			damagedSound.play('',0,1,false);
			health-=25;
			score = storedScore;
			game.state.start('bed');
		}
	}
}