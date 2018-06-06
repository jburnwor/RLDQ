var endDay = function () {
    this.background;
    this.button;
    this.play;
}
endDay.prototype = {

    preload: function () {
        //load images
        this.load.path = 'assets/img/random/';
        this.load.image('bg', 'SLIDES.png');
        this.load.path = 'assets/img/titleScreen/';
        this.load.image('start', 'start.png');

        this.load.path = 'assets/img/gameOver/';
        this.load.image('bgOver', 'gameOver.png');
        this.load.image('credits', 'credits.png');
        this.load.image('playAgain', 'playAgain.png');

        this.load.bitmapFont('font', 'm5x7.png', 'm5x7.xml');
        

    },

    create: function () {
        

        if(score >= reach){
        this.background = this.add.sprite(0, 0, 'bg');
        this.start = game.add.button(game.world.centerX- 80, 300, 'start', actionOnClick, this, 2, 1, 0);

        this.current =game.add.bitmapText(92,25, 'font','Current Score: ' + score,64);
        this.current.tint = 0x0000ff;
        this.current = game.add.bitmapText(90,27, 'font','Current Score: ' + score,64);

        reach = score + 500;
        this.reachText = game.add.bitmapText(32,102, 'font','Score to reach day ' +day+': \n' + reach,64);
        this.reachText.align = 'center';
        this.reachText.tint = 0x0000ff;

        this.reachText = game.add.bitmapText(30,100, 'font','Score to reach day ' +day+': \n' + reach,64);
        this.reachText.align = 'center';

        this.start.onInputOver.add(over, this);
        this.start.onInputOut.add(out, this);
        this.start.onInputUp.add(up, this);

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
            game.state.start('brushing');

            console.log('click');

        }
    }else{
        this.background = this.add.sprite(0, 0, 'bgOver');

        this.playAgain = game.add.button(game.world.centerX - 95, 350, 'playAgain', actionOnClick, this, 2, 1, 0);

        this.playAgain.onInputOver.add(over, this);
        this.playAgain.onInputOut.add(out, this);
        this.playAgain.onInputUp.add(up, this);

        this.credits = game.add.button(game.world.centerX - 95, 400, 'credits', toCredits, this, 2, 1, 0);

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
            game.state.start('brushing');

            console.log('click');

        }

        function toCredits() {
            score = 0;
            health = 100;
            game.state.start('credits');
            

        }


        this.current =game.add.bitmapText(88,185, 'font','Did not  the\nrequired score and\nran out of money',64);
        this.current.tint = 0x0000ff;
        this.current.align = 'center';
        this.current = game.add.bitmapText(86,187, 'font','Did not reach the\nrequired score and\nran out of money',64);
        this.current.align = 'center';
    }
}

}