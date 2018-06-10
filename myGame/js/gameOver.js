var gameOver = function () {
    this.background;
    this.button;
    this.playAgain;
    this.credits;
}
gameOver.prototype = {

    preload: function () {
        //load images
        this.load.path = 'assets/img/gameOver/';
        this.load.image('bg', 'gameOver.png');
        this.load.image('credits', 'credits.png');
        this.load.image('playAgain', 'playAgain.png');

    },

    create: function () {

        this.background = this.add.sprite(0, 0, 'bg');

        this.current =game.add.bitmapText(172,27, 'font','Score: ' + Math.floor(score),64);
        this.current.tint = 0x0000ff;
        this.current = game.add.bitmapText(170,25, 'font','Score: ' + Math.floor(score),64);


        this.playAgain = game.add.button(game.world.centerX - 95, 300, 'playAgain', actionOnClick, this, 2, 1, 0);

        this.playAgain.onInputOver.add(over, this);
        this.playAgain.onInputOut.add(out, this);
        this.playAgain.onInputUp.add(up, this);

        this.credits = game.add.button(game.world.centerX - 95, 350, 'credits', toCredits, this, 2, 1, 0);

        this.credits.onInputOver.add(over, this);
        this.credits.onInputOut.add(out, this);
        this.credits.onInputUp.add(up, this);

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
            score = 0;
            health = 100;
            reach = 0;
            day = 1;
            game.state.start('brushing');

            console.log('click');

        }

        function toCredits() {
            score = 0;
            health = 100;
            reach = 0;
            day = 1;
            game.state.start('credits');
            

        }
    }

}