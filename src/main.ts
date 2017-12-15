import * as Phaser from "phaser-ce";
import { Sprite, Game } from "phaser-ce";
import PhaserObject from "./entity/phaserobject";
import Logo from "./entity/logo";
import Sun from "./entity/sun";

class HejareSpegel {

    private game: Phaser.Game;
    private phaserObjects: Array<PhaserObject>;

    constructor() {
        const gameWidth = 1080;
        const gameHeight = 1720;
        this.game = new Phaser.Game(
            gameWidth, gameHeight, Phaser.AUTO, "content",
            { preload: this.preload.bind(this), create: this.create.bind(this) });
    }

    public preload() {
        this.phaserObjects = new Array<PhaserObject>();
        this.phaserObjects.push(new Logo(this.game));
        this.phaserObjects.push(new Sun(this.game));

        this.phaserObjects.forEach(element => {
            element.preload();
        });
    }

    public create() {
        this.phaserObjects.forEach(element => {
            element.create();
        });
    }

}

window.onload = () => {
    let game = new HejareSpegel();
    flower();
};
