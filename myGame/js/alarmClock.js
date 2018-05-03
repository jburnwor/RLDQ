
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
		game.physics.arcade.enable(clock);
		clock.body.checkCollision.left = false;
		clock.body.checkCollision.down = false;
		clock.body.checkCollision.right = false;


		//text for now
		time = 0;
		dayTrack = 0;
		amPM = ['AM','PM'];
		clockTime = this.add.text(clock.centerX+20,clock.centerY-64,"00:00   " + amPM[dayTrack%2],{font: 'Orbitron',fontSize: '32px', fill: 'White'});
		clockTime.anchor.setTo(1,0);

		//finger
		finger = this.add.sprite(0,0,'finger');

		finger.inputEnabled = true; 				//Enables input (mouse click) for the finger
		//it can be dragged arround by the mouse, setting the value changes if the object will snap to center of mouse
		finger.input.enableDrag(true);
		game.physics.arcade.enable(finger);
		finger.body.setSize(finger.width, 5, 0, finger.height);
		finger.body.checkCollision.left = false;
		finger.body.checkCollision.up = false;
		finger.body.checkCollision.right = false;

		overlapped = false;
		//since the event doesn't start the first time we'll just trigger it manually
		doOnce = true;


	},
	update: function(){
		if(doOnce){
			this.updateClock();
			doOnce = false;
		}

		if(game.physics.arcade.collide(clock,finger)){
			this.updateClock();
		}
		else if(!game.physics.arcade.collide(clock,finger)){
			overlapped = false;
		}
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
	}
}