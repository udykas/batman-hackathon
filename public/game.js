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
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var player;
var cursors;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', './assets/imgs/sky.png');
  this.load.spritesheet('stand', './assets/imgs/stand2.png', { frameWidth: 41.8, frameHeight: 55 });
  this.load.spritesheet('run-left', './assets/imgs/run-left.png', { frameWidth: 57, frameHeight: 50 });
  this.load.spritesheet('run-right', './assets/imgs/run-right.png', { frameWidth: 57, frameHeight: 50 });
}

function create() {
  this.add.image(400, 300, 'sky');

  player = this.physics.add.sprite(100, 450, 'stand');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('run-left', { start: 0, end: 19 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('stand', { start: 0, end: 16 }),
      frameRate: 5
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('run-right', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();

}

function update() {
  if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
  }
  else {
      player.setVelocityX(0);

      player.anims.play('turn', true);
  }

  if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
  }
}
