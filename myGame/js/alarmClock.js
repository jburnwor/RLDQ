
//this is adapted from the google webfonts phaser example
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, function(){}, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Orbitron']
    }

};
var alarmClock = function(){}
alarmClock.prototype = {
	preload: function(){
		this.load.path = 'assets/img/alarmClock/';
		this.load.image('clock','clockTemp.png');
		this.load.image('finger','fingerTemp.png');
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	},
	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);	

		//create 30 second timer for the stage
		stageTimer = game.time.create(false);
		stageTimer.add(30000,function(){console.log('fired')},game);
		stageTimer.start();

		//to display the score
		scoreDisplay = new Score();

		//add clock
		clock = this.add.sprite(game.world.centerX,game.world.centerY,'clock');
		clock.anchor.setTo(0.5,0.5);
		


		//add button to top of clock
		button = this.add.sprite(game.world.centerX,clock.y-90,'clock');
		game.physics.arcade.enable(button);
		button.tint = 0xff0000;
		button.scale.setTo(0.50,0.25);
		button.anchor.setTo(0.5,0.5);


		//text for now
		time = 0;
		dayTrack = 0;
		amPM = ['AM','PM'];
		clockTime = this.add.text(clock.centerX+100,clock.centerY-64,"00:00   " + amPM[dayTrack%2],{font: 'Orbitron',fontSize: '32px', fill: 'White'});
		clockTime.anchor.setTo(1,0);

		//finger
		finger = this.add.sprite(game.world.centerX,0,'finger');
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


	},
	update: function(){
		if(doOnce){
			this.updateClock();
			doOnce = false;
		}
		this.buttonPress();

	},
	render: function(){
		game.debug.body(button);
		game.debug.body(finger);
		game.debug.geom(fingerBounds);
	},

	updateClock: function(){
		if(!overlapped){
			if(time>12){
				time = time%12;
				dayTrack++;
			}
			if(time<10){
				clockTime.text = "0"+time+":00   " + amPM[dayTrack%2];
			}
			else{
				clockTime.text = time +":00   " + amPM[dayTrack%2];
			}
			time = time + game.rnd.integerInRange(1,4);
			overlapped = true;
		}
	},

	buttonPress: function(){
		if(game.physics.arcade.collide(finger,button)){
			this.updateClock();
			//button.body.y+=15;
		}
		else if(!game.physics.arcade.collide(finger,button)){
			overlapped = false;
			//button.body.y-=25;
		}
	}
}