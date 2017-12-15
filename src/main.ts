import * as Phaser from 'phaser-ce';
import { Sprite, Game } from 'phaser-ce';

class HejareSpegel {

    constructor() {
        this.gameWidth = 1080;
        this.gameHeight = 600;
        this.game = new Phaser.Game(this.gameWidth, this.gameHeight, Phaser.AUTO, 'content', { preload: this.preload.bind(this), create: this.create.bind(this) });
    }

    game: Phaser.Game;
    sun: Phaser.Sprite;

    gameHeight: number;
    gameWidth: number;

    preload() {
        this.game.load.image('logo', 'img/logo.png');

        this.game.load.spritesheet('explosion', 'img/explosion_1.png', 88, 93);
        // this.game.load.spritesheet('sun', 'img/sun.png', 182, 183, 24);
        this.game.load.atlasJSONHash('sun', 'img/sun2.png', 'img/sun2.json');
    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);

        this.sun = this.game.add.sprite(-400, -400, 'sun');
        this.sun.scale.set(0.5);
        var shine = this.sun.animations.add('shine');
        shine.play(24, true);

        // Update the sun position once every minute.
        this.moveSun();
        setInterval(this.moveSun.bind(this), 60000);
    }

    private moveSun() {
        let coordinates = this.sunPosition(this.gameWidth - this.sun.width, 200);
        this.sun.x = coordinates.x;
        this.sun.y = coordinates.y;
    }

    private sunPosition(width, height) {
        var d = new Date();
        var x = (d.getHours() * 60 + d.getMinutes()) / (24 * 60);
        // var x = (d.getSeconds() * 1000 + d.getMilliseconds()) / 60000;
        return {
            x: x * width,
            y: 4 * Math.pow((x - 0.5), 2) * height
        }
    }

}

window.onload = () => {
    var game = new HejareSpegel();
};
