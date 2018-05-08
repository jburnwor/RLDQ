
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
		this.load.image('clock','desk.png');
		this.load.image('finger','fingerTemp.png');
		this.load.image('bg','bg.png');
		this.load.image('lamp','lamp.png');
		this.load.image('button','masterButton.png');	
	},
	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);	

		//create 30 second timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000,this.checkTime,this);
		stageTimer.start();

		
		bg = this.add.sprite(0,0,'bg');


		//add button to top of clock
		button = this.add.sprite(game.world.centerX-50,game.world.centerY-65,'button');
		game.physics.arcade.enable(button);
		button.anchor.setTo(0.5,0.5);

		confirmButton = this.add.sprite(game.world.centerX+50,game.world.centerY-65,'button');
		game.physics.arcade.enable(confirmButton);
		confirmButton.anchor.setTo(0.5,0.5);
		confirmButton.inputEnabled = true;
		confirmButton.events.onInputDown.add(this.checkTime,this);

		//add clock
		clock = this.add.sprite(game.world.centerX,game.world.centerY,'clock');
		clock.anchor.setTo(0.5,0.5);

		lamp = this.add.sprite(0,0,'lamp');
		
		//text for now
		time = 0;
		dayTrack = 0;
		amPM = ['AM','PM'];
		clockTime = this.add.text(clock.centerX+110,clock.centerY-32,"00:00   " + amPM[dayTrack%2],{font: 'Orbitron',fontSize: '36px', fill: 'White'});
		clockTime.anchor.setTo(1,0);

		//finger
		finger = this.add.sprite(game.world.centerX-50,0,'finger');
		finger.anchor.setTo(0.5,0.5);
		finger.inputEnabled = true; 				//Enables input (mouse click) for the finger
		//it can be dragged arround by the mouse, setting the value changes if the object will snap to center of mouse
		finger.input.enableDrag(false);
		finger.input.allowHorizontalDrag = false;
		game.physics.arcade.enable(finger);
		finger.body.checkCollision.left = false;
		finger.body.checkCollision.up = false;
		finger.body.checkCollision.right = false;
		fingerBounds = new Phaser.Rectangle(finger.x-(finger.width/2),0,finger.width,button.y);
		finger.input.boundsRect = fingerBounds;

		overlapped = false;
		//since the event doesn't start the first time we'll just trigger it manually
		doOnce = true;

		//to display the score
		scoreDisplay = new Score();
		

	},
	update: function(){
		if(doOnce){
			this.updateClock();
			doOnce = false;
		}
		this.buttonPress();

	},
	render: function(){
		//game.debug.body(button);
		//game.debug.body(finger);
		//game.debug.geom(fingerBounds);
	},

	updateClock: function(){
		if(!overlapped){
			var wrapped;
			overlapped = true;
			if(!doOnce){
					time = time + game.rnd.integerInRange(1,4);		
			}
			if(time==12){
					dayTrack++;
					wrapped = true;
			}
			else if(time>12){
					if(!wrapped){
						dayTrack++;
					}
					time = time%12;
					wrapped = false;
			}
			if(time<10){
				clockTime.text = "0"+time+":00   " + amPM[dayTrack%2];
				console.log(time);
			}
			else{
				clockTime.text = time +":00   " + amPM[dayTrack%2];
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
		if((time == 8) && dayTrack%2 == 0){
			console.log('right time' + time +' '+amPM[dayTrack%2]);
			score+=50;
			game.state.start('stamping');
		}
		else{
			console.log('wrong time' + time +' '+amPM[dayTrack%2]);
			health-=10;
			game.state.start('stamping');
		}
	}
}