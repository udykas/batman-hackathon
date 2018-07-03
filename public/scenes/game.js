const { Scene } = Phaser;

let player;
let cursors;
let foreground;

class MainGameScene extends Scene {
  constructor() {
    super({ key: 'MainGameScene' });
  }

  preload() {
    this.load.image('background', './assets/imgs/background.png');
    this.load.image('foreground', './assets/imgs/foreground.png');
    this.load.image('void', './assets/imgs/Solid_black.png');
    this.load.spritesheet('stand', './assets/imgs/stand2.png', { frameWidth: 41.8, frameHeight: 55 });
    this.load.spritesheet('run-left', './assets/imgs/run-left.png', { frameWidth: 57, frameHeight: 50 });
    this.load.spritesheet('run-right', './assets/imgs/run-right.png', { frameWidth: 57, frameHeight: 50 });
  }

  create() {
    //   this.add.image(0,0, 'void');

    this.add.image(1411, 150, 'background');
    foreground = this.add.image(1411, 310, 'foreground');

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


    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, 2822, 384);
    // make the camera follow the player
    this.cameras.main.startFollow(player);

  }

  update() {
    player.x += 100;
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
      //   city.tilePositionX += 0.

      player.anims.play('turn', true);
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
}

module.exports = MainGameScene;