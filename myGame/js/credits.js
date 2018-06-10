var credits = function () {
    this.onCredits = false;
    this.gameCredits;
}
credits.prototype = {

    preload: function () {
        //load images
        this.load.path = 'assets/img/random/';
        this.load.image('bg', 'SLIDES.png');
        
        this.load.path = 'assets/img/credits/'
        this.load.image('gameCredits', 'creditsOverlay.png')

        this.load.path = 'assets/img/titleScreen/';
        this.load.image('exit', 'exit.png');


    },

    create: function () {

        this.background = this.add.sprite(0, 0, 'bg');
        this.gameCredits = this.add.sprite(0, 0, 'gameCredits');

        this.exit = game.add.button(game.world.centerX - 70, 400, 'exit', actionOnClick, this, 2, 1, 0);

        this.exit.onInputOver.add(over, this);
        this.exit.onInputOut.add(out, this);
        this.exit.onInputUp.add(up, this);

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

        function actionOnClick() {
            score = 0;
            health = 100;
            day = 1;
            game.state.start('menu');


        }
    },

    update: function () {

    }

}