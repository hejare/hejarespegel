var gameHeight = 600;
var gameWidth = 800;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.spritesheet('explosion', 'img/explosion_1.png', 88, 93);

}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    var explosion = game.add.sprite(20, 20, 'explosion', 5);
    var explode = explosion.animations.add('explode');
    var tween = game.add.tween(explosion);

    // game.physics.enable(explosion, Phaser.Physics.ARCADE);
    // explosion.body.velocity.x=0.1;
    // explosion.body.velocity.y=0.1;

    // tween.to({x:600, y:100}, 10000, 'Linear', true, 0);

    explode.play(24, true);

    setInterval(function() {
        var coordinates = sunPosition(gameWidth - explosion.width, 100);
        explosion.x = coordinates.x;
        explosion.y = coordinates.y;
    }, 100);

}

function sunPosition(width, height) {
    var d = new Date();
    // var x = (d.getHours() * 60 + d.getMinutes()) / (24 * 60);
    var x = (d.getSeconds() * 1000 + d.getMilliseconds()) / 60000;
    return {
        x: x * width,
        y: 4 * Math.pow((x - 0.5), 2) * height
    }
}