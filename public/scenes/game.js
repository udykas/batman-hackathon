const { Scene } = Phaser;

let player;
let platforms;
let cursors;
let foreground;
let batarang;
let score = 0;
let scoreText;
let count = 0; //count to activate action when key is pressed
let gameMusic;


class MainGameScene extends Scene {
  constructor() {
    super({ key: 'MainGameScene' });
  }

  preload() {
    this.load.image('starry-night', './assets/imgs/starry-night.png');
    this.load.image('background', './assets/imgs/background.png');
    this.load.image('foreground', './assets/imgs/gc-buildings.png');
    this.load.image('void', './assets/imgs/Solid_black.png');
    this.load.image('ground', './assets/imgs/blk-ground.png');
    this.load.image('platform', './assets/imgs/sml-platform.png');
    this.load.image('batarang', './assets/imgs/batarang.png');
    this.load.spritesheet('stand', './assets/imgs/stand2.png', { frameWidth: 41.8, frameHeight: 55 });
    this.load.spritesheet('run-left', './assets/imgs/run-left.png', { frameWidth: 57, frameHeight: 50 });
    this.load.spritesheet('run-right', './assets/imgs/run-right.png', { frameWidth: 57, frameHeight: 50 });
    this.load.spritesheet('jump', './assets/imgs/jump.png', { frameWidth: 57, frameHeight: 50 });
    this.load.spritesheet('jump-left', './assets/imgs/jump-left.png', { frameWidth: 57, frameHeight: 50 });
    this.load.spritesheet('crouch', './assets/imgs/crouch.png', { frameWidth: 57, frameHeight: 50 });
    this.load.spritesheet('punch', './assets/imgs/punch.png', { frameWidth: 52, frameHeight: 50 });
    this.load.spritesheet('punch-left', './assets/imgs/punch-left.png', { frameWidth: 52, frameHeight: 50 });
    this.load.audio('gameMusic', [ './assets/audio/12 Introduce a Little Anarchy.mp3', './assets/aduio/12 Introduce a Little Anarchy.ogg' ]);
  }

  create() {
    // gameMusic settings
    gameMusic = this.sound.add('gameMusic');
    gameMusic.play();
    gameMusic.volume = 1;
    
    this.add.image(1411, 185, 'starry-night');
    this.add.image(1411, 310, 'background');
    this.add.image(1411, 390, 'foreground');

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

    this.anims.create({
      key: 'punch-left',
      frames: this.anims.generateFrameNumbers('punch-left', { start: 0, end: 10 }),
      frameRate: 10,
      repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    //PLATFORMS
    platforms = this.physics.add.staticGroup();

    //FLOOR
    platforms.create(300, 600, 'ground').setScale(5).refreshBody();

    //FIRST PLATFORMS
    
    platforms.create(290, 450, 'platform').setScale(0.65).refreshBody();
    platforms.create(390, 450, 'platform').setScale(0.65).refreshBody();
    platforms.create(440, 450, 'platform').setScale(0.65).refreshBody();
    

    //SECOND PLATFORMS
    platforms.create(550, 330, 'platform').setScale(0.25).refreshBody();
    platforms.create(600, 330, 'platform').setScale(0.25).refreshBody();
    platforms.create(650, 330, 'platform').setScale(0.25).refreshBody();
    platforms.create(700, 330, 'platform').setScale(0.25).refreshBody();
    platforms.create(750, 330, 'platform').setScale(0.25).refreshBody();
    platforms.create(800, 330, 'platform').setScale(0.25).refreshBody();
    platforms.create(850, 330, 'platform').setScale(0.25).refreshBody();

    platforms.create(950, 450, 'platform').setScale(0.65).refreshBody();
    platforms.create(1100, 450, 'platform').setScale(0.65).refreshBody();

    platforms.create(1080, 200, 'platform').setScale(0.65).refreshBody();

    //THIRD PLATFORMS
    platforms.create(1275, 350, 'platform').setScale(0.25).refreshBody();
    platforms.create(1325, 350, 'platform').setScale(0.25).refreshBody();
    platforms.create(1375, 350, 'platform').setScale(0.25).refreshBody();

    platforms.create(1475, 200, 'platform').setScale(0.25).refreshBody();
    platforms.create(1525, 200, 'platform').setScale(0.25).refreshBody();
    platforms.create(1575, 200, 'platform').setScale(0.25).refreshBody();
    platforms.create(1625, 200, 'platform').setScale(0.25).refreshBody();
   

    //FOURTH PLATFORMS
    platforms.create(1450, 450, 'platform').setScale(0.25).refreshBody();
    platforms.create(1500, 450, 'platform').setScale(0.25).refreshBody();
    platforms.create(1550, 450, 'platform').setScale(0.25).refreshBody();
    platforms.create(1600, 450, 'platform').setScale(0.25).refreshBody();
    platforms.create(1650, 450, 'platform').setScale(0.25).refreshBody();
    platforms.create(1700, 450, 'platform').setScale(0.25).refreshBody();
    platforms.create(1750, 450, 'platform').setScale(0.25).refreshBody();
    platforms.create(1800, 450, 'platform').setScale(0.25).refreshBody();
    platforms.create(1850, 450, 'platform').setScale(0.25).refreshBody();
    platforms.create(1900, 450, 'platform').setScale(0.25).refreshBody();

    platforms.create(2110, 450, 'platform').setScale(0.25).refreshBody();

    platforms.create(2110, 330, 'platform').setScale(0.5).refreshBody();

    //FINAL PLATFORMS
    
    platforms.create(2250, 175, 'platform').setScale(0.25).refreshBody();
    platforms.create(2300, 175, 'platform').setScale(0.25).refreshBody();
    platforms.create(2350, 175, 'platform').setScale(0.25).refreshBody();
    platforms.create(2400, 175, 'platform').setScale(0.25).refreshBody();
    platforms.create(2450, 175, 'platform').setScale(0.25).refreshBody();
    platforms.create(2500, 175, 'platform').setScale(0.25).refreshBody();
    platforms.create(2550, 175, 'platform').setScale(0.25).refreshBody();
    platforms.create(2600, 175, 'platform').setScale(0.25).refreshBody();
    
    //COLLECTABLES
    batarang = this.physics.add.group({
      key: 'batarang',
      repeat: 18,
      setXY: { x: 50, y: 0, stepX: 150 }
    });

    batarang.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    })

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: 'white' });
    scoreText.setScrollFactor(0);

    //PHYSICS
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(batarang, platforms);

    this.physics.world.bounds.width = 2822;

    this.physics.add.overlap(player, batarang, collectBats, null, this);

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
      if (cursors.left.isDown) {
        player.anims.play('punch-left', true);
      }
      player.anims.play('punch', true);
      count += 1;
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

    if (score >= 190) {
      this.scene.start('Win');
      
    }
  }

}

function collectBats (player, batarang)
{
    batarang.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

module.exports = MainGameScene;