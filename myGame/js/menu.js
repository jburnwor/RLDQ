var menu = function () {
    this.background;
    this.button;
    this.settings;
    this.exit;
}
menu.prototype = {

    preload: function () {
        //load images
        this.load.path = 'assets/img/titleScreen/';
        this.load.image('bg', 'title.png');
        this.load.image('settings', 'settings.png');
        this.load.image('start', 'start.png');
        this.load.image('exit', 'exit.png');
        this.load.image('selector', 'selector.png');
        this.load.atlas('tutorialAtlas','../tutorialAtlas.png','../tutorialAtlas.json');
        this.load.path = 'assets/fonts/';
		this.load.bitmapFont('font','m5x7.png','m5x7.xml');
        this.stage.disableVisibilityChange = true;
        this.load.audio('mainTheme','../audio/mainTheme.mp3');
        this.load.audio('damaged',['../audio/damaged.ogg']);
    },

    create: function () {

        this.background = this.add.sprite(0, 0, 'bg');

        this.start = game.add.button(game.world.centerX - 95, 300, 'start', actionOnClick, this, 2, 1, 0);

        this.start.onInputOver.add(over, this);
        this.start.onInputOut.add(out, this);
        this.start.onInputUp.add(up, this);

        this.settings = game.add.button(game.world.centerX - 95, 350, 'settings', nothing, this, 2, 1, 0);

        this.settings.onInputOver.add(over, this);
        this.settings.onInputOut.add(out, this);
        this.settings.onInputUp.add(up, this);

        this.exit = game.add.button(game.world.centerX - 95, 400, 'exit', nothing, this, 2, 1, 0);

        this.exit.onInputOver.add(over, this);
        this.exit.onInputOut.add(out, this);
        this.exit.onInputUp.add(up, this);

        mainTheme = game.add.audio('mainTheme');

        function up(button) {
            console.log('button )up', arguments);
        }

        function over(button) {
            button.tint = 0xcd0000;
            console.log('button over');
        }

        function out(button) {
            button.tint = 0xffffff;
            console.log('button out');
        }

        function actionOnClick(){
        	mainTheme.play('',0.1,0.15,true);
            game.state.start('brushing');

            console.log('click');

        }

        function nothing() {
            //nothing
        }
    }

}