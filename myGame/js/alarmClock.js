var alarmClock = function(){}
alarmClock.prototype = {
	preload: function(){
		this.load.path = 'assets/img/alarmClock/';
		this.load.image('clock','clockTemp.png');
		this.load.image('finger','fingerTemp.png')
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
		clockTime = this.add.text(clock.centerX-64,clock.centerY-64,"00:00   " + amPM[dayTrack%2],{fontSize: '32px', fill: 'White'});

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