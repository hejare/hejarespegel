var gameHeight = 600;
var gameWidth = 800;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'hejare-spegel', { preload: preload, create: create });

function preload() {
    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.spritesheet('explosion', 'img/explosion_1.png', 88, 93);
    game.load.spritesheet('sun', 'img/sun.png', 182, 183, 24);
}

function create() {
    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    var sun = game.add.sprite(-400, -400, 'sun', 5);
    var shine = sun.animations.add('shine');
    shine.play(24, true);

    // Update the sun position once every minute.
    moveSun();
    setInterval(moveSun, 60000);

}

function moveSun() {
    var coordinates = sunPosition(gameWidth - sun.width, 100);
    sun.x = coordinates.x;
    sun.y = coordinates.y;
}

function sunPosition(width, height) {
    var d = new Date();
    var x = (d.getHours() * 60 + d.getMinutes()) / (24 * 60);
    // var x = (d.getSeconds() * 1000 + d.getMilliseconds()) / 60000;
    return {
        x: x * width,
        y: 4 * Math.pow((x - 0.5), 2) * height
    }
}