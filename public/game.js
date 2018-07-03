const gameMenu = require('./scenes/game_menu');
const mainGameScene = require('./scenes/game');

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: [ gameMenu, mainGameScene ]
};

var game = new Phaser.Game(config);