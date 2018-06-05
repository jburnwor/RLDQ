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

    },

    create: function () {

        this.background = this.add.sprite(0, 0, 'bg');
        this.gameCredits = this.add.sprite(0, 0, 'gameCredits');

        this.game.input.keyboard.onDownCallback = function(e) {   
            game.state.start('menu');
              
        }
    },

    update: function () {

    }

}