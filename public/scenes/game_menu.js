const { Scene } = Phaser;

class GameMenu extends Scene {
  constructor() {
    super({ key: 'GameMenu' });
  }

  preload() {
    this.load.image('gameMenu', '../assets/imgs/menuimage.jpg');
  }

  create() {
    this.button = this.add.sprite(400, 300, 'gameMenu').setInteractive();
    this.button.on('pointerdown', () => {
      this.scene.start('MainGameScene')
    });

  }

  update() {}
}

module.exports = GameMenu;