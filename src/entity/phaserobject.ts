import { Sprite, Game } from "phaser-ce";

abstract class PhaserObject {
    protected game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    public abstract preload();
    public abstract create();
}

export default PhaserObject;
