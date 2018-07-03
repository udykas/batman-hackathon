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
var platforms;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', './assets/imgs/sky.png');
  this.load.image('ground', './assets/imgs/platform.png');
  this.load.spritesheet('stand', './assets/imgs/stand2.png', { frameWidth: 41.8, frameHeight: 55 });
  this.load.spritesheet('run-left', './assets/imgs/run-left.png', { frameWidth: 57, frameHeight: 50 });
  this.load.spritesheet('run-right', './assets/imgs/run-right.png', { frameWidth: 57, frameHeight: 50 });
  this.load.spritesheet('jump', './assets/imgs/jump.png', { frameWidth: 57, frameHeight: 50 });
  this.load.spritesheet('jump-left', './assets/imgs/jump-left.png', { frameWidth: 57, frameHeight: 50 });
  this.load.spritesheet('crouch', './assets/imgs/crouch.png', { frameWidth: 57, frameHeight: 50 });
}

function create() {
  //BACKGROUND
  this.add.image(400, 300, 'sky');

  //PLAYER
  player = this.physics.add.sprite(100, 450, 'stand').setScale(1.5);
  // player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(200);

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('run-left', { start: 0, end: 19 }),
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
      frames: this.anims.generateFrameNumbers('run-right', { start: 0, end: 16 }),
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

  //CROUCH NOT ANIMATING
  // this.anims.create({
  //   key: 'down',
  //   frames: [ { key: 'crouch', frame: 2 } ],
  //   frameRate: 1,
  //   repeat: -1
  // });

  cursors = this.input.keyboard.createCursorKeys();

  

  //PLATFORMS
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 690, 'ground').setScale(3).refreshBody();

  // platforms.create(600, 400, 'ground');
  // platforms.create(50, 250, 'ground');
  // platforms.create(750, 220, 'ground');


  this.physics.add.collider(player, platforms);

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

      player.anims.play('stand', true);
  }

  if (cursors.up.isDown){
    player.anims.play('up', true);

    if(player.body.touching.down) {
      player.setVelocityY(-400);
    }
  } 

  if(!player.body.touching.down) {
    player.anims.play('up', true);

    if(cursors.left.isDown){
      player.anims.play('up-left', true);
    }
  }

  if(cursors.up.isDown && cursors.left.isDown){
    player.anims.play('up-left', true);
  }

  //NOT
  // if(cursors.down.isDown){
  //   player.anims.play('crouch', false);
  // }
}
