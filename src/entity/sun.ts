import PhaserObject from './phaserobject';

class Sun extends PhaserObject {

    private sun: Phaser.Sprite;
    private speed: Speed = Speed.MINUTE;
    dawnAndDuskColor: Phaser.ColorComponents;
    noonColor: Phaser.ColorComponents;

    preload() {
        this.game.load.atlasJSONHash('sun', 'img/sun.png', 'img/sun.json');
    }

    create() {
        this.sun = this.game.add.sprite(-400, -400, 'sun');
        this.sun.scale.set(0.5);
        let shine = this.sun.animations.add('shine');
        shine.play(24, true);
        this.dawnAndDuskColor = Phaser.Color.hexToColor("#FF0000");
        this.noonColor = Phaser.Color.hexToColor("#FFFF00");

        // Update the sun position once every minute.
        this.update();
        setInterval(this.update.bind(this), this.speed);
    }

    private update() {
        this.updateColor();
        this.updatePosition();
    }

    private updateColor() {
        // Update the color of the sun depending on where it is positioned. The ten first and last percents of the 
        // sun arch is interpolated from the dawn and dusk color to the noon color. The remaining eighty percent is
        // set to the noon color.

        let maxX = this.game.width - this.sun.width;
        let progress = this.sun.x / maxX * 100;

        if (progress < 10)
            this.sun.tint = Phaser.Color.interpolateColor(
                this.dawnAndDuskColor.color,
                this.noonColor.color,
                maxX * 0.1, this.sun.x);
        else if (progress > 90)
            this.sun.tint = Phaser.Color.interpolateColor(
                this.noonColor.color,
                this.dawnAndDuskColor.color,
                maxX * 0.1, this.sun.x * 0.9);
        else this.sun.tint = this.noonColor.color;
    }

    private updatePosition() {
        let coordinates = this.sunPosition(this.game.width - this.sun.width, 200);
        this.sun.x = coordinates.x;
        this.sun.y = coordinates.y;
    }

    private sunPosition(width, height) {
        var d = new Date();
        var x;
        if (this.speed == Speed.DAY)
            x = (d.getHours() * 60 + d.getMinutes()) / (24 * 60);
        else
            x = (d.getSeconds() * 1000 + d.getMilliseconds()) / 60000;

        return {
            x: x * width,
            y: 4 * Math.pow((x - 0.5), 2) * height
        }
    }

}

enum Speed { MINUTE = 100, DAY = 60000 };


export default Sun;
