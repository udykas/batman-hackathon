const { Scene } = Phaser;

const testScene = require('./test_scene');

class GameMenu extends Scene {
  constructor() {
    super({ key: 'GameMenu' });
    this.testScene = testScene;
  }

  preload() {
    this.load.image('gameMenu', '../assets/imgs/menuimage.jpg');
  }

  create() {
    this.button = this.add.sprite(400, 300, 'gameMenu').setInteractive();
    this.button.on('pointerdown', () => {
      this.scene.start('sceneTest')
    });
  }

  update() {

  }
}

module.exports = GameMenu;