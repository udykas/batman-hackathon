const { Scene } = Phaser;

let player;
let platforms;
let cursors;
let foreground;
let count = 0; //count to activate action when key is pressed

class MainGameScene extends Scene {
  constructor() {
    super({ key: 'MainGameScene' });
  }

  preload() {
    this.load.image('background', './assets/imgs/background.png');
    this.load.image('foreground', './assets/imgs/foreground.png');
    this.load.image('void', './assets/imgs/Solid_black.png');
    this.load.image('ground', './assets/imgs/platform.png');
    this.load.spritesheet('stand', './assets/imgs/stand2.png', { frameWidth: 41.8, frameHeight: 55 });
    this.load.spritesheet('run-left', './assets/imgs/run-left.png', { frameWidth: 57, frameHeight: 50 });
    this.load.spritesheet('run-right', './assets/imgs/run-right.png', { frameWidth: 57, frameHeight: 50 });
    this.load.spritesheet('jump', './assets/imgs/jump.png', { frameWidth: 57, frameHeight: 50 });
    this.load.spritesheet('jump-left', './assets/imgs/jump-left.png', { frameWidth: 57, frameHeight: 50 });
    this.load.spritesheet('crouch', './assets/imgs/crouch.png', { frameWidth: 57, frameHeight: 50 });
    this.load.spritesheet('punch', './assets/imgs/punch.png', { frameWidth: 52, frameHeight: 50 });
  }

  create() {
    this.add.image(1411, 150, 'background');
    this.add.image(1411, 490, 'foreground');

    player = this.physics.add.sprite(100, 450, 'stand').setScale(1.15);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(200);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('run-left', { start: 0, end: 18 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('stand', { start: 0, end: 16 }),
      frameRate: 5
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('run-right', { start: 0, end: 18 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 2 }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'up-left',
      frames: this.anims.generateFrameNumbers('jump-left', { start: 0, end: 2 }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'punch',
      frames: this.anims.generateFrameNumbers('punch', { start: 0, end: 10 }),
      frameRate: 10,
      repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    //PLATFORMS
    platforms = this.physics.add.staticGroup();

    platforms.create(300, 950, 'ground').setScale(10).refreshBody();

    platforms.create(200, 440, 'ground').setScale(0.25).refreshBody();
    platforms.create(300, 410, 'ground').setScale(0.25).refreshBody();
    platforms.create(400, 410, 'ground').setScale(0.25).refreshBody();
    platforms.create(450, 410, 'ground').setScale(0.25).refreshBody();
    platforms.create(500, 410, 'ground').setScale(0.25).refreshBody();



    this.physics.add.collider(player, platforms);
    this.physics.world.bounds.width = 2822;

    //CAMERA
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, 2822, 384);
    // make the camera follow the player
    this.cameras.main.startFollow(player);
  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    } else if (cursors.space.duration >= 80 && count < 60) {
      count += 1;
      player.anims.play('punch', true);
    }
    else {
      player.setVelocityX(0);

      cursors.space.duration = 0 // reset space.duration so action 'punch' will stop
      count = 0 // reset count so action can be reactivate

      player.anims.play('stand', true);
    }

    if (cursors.up.isDown) {
      player.anims.play('up', true);

      if (player.body.touching.down) {
        player.setVelocityY(-400);
      }
    }

    if (!player.body.touching.down) {
      player.anims.play('up', true);

      if (cursors.left.isDown) {
        player.anims.play('up-left', true);
      }
    }

    if (cursors.up.isDown && cursors.left.isDown) {
      player.anims.play('up-left', true);
    }

    if (cursors.space.isDown) {
      player.anims.play('punch', true);
    }
  }

}

module.exports = MainGameScene;