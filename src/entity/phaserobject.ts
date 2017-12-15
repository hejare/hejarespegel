import { Sprite, Game } from 'phaser-ce';

abstract class PhaserObject {
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    abstract preload();
    abstract create();
}

export default PhaserObject;
