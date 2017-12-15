import PhaserObject from './phaserobject';

class Logo extends PhaserObject {

    private logo: Phaser.Sprite;
    
    preload() {
        this.game.load.image('logo', 'img/logo.png');
    }

    create() {
        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
    }

}

export default Logo;
