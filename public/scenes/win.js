const { Scene } = Phaser;

class Win extends Scene {
  constructor() {
    super({ key: 'Win' });
  }

  preload() {}

  create() {
    const winText = this.add.text(0, 0, 'You\'re the hero Gotham deserves, but not the one they need right now...');
  }

  update() {}
}

module.exports = Win;