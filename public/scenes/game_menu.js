/** 
 * TODO: Andrew take a look at design
 */  

const { Scene } = Phaser;

let button;
let camera;
let cursors;

class GameMenu extends Scene {
  constructor() {
    super({ key: 'GameMenu' });
  }

  preload() {
    this.load.image('gameMenu', '../assets/imgs/menuimage.jpg');
  }

  create() {
    this.add.sprite(400, 591, 'gameMenu');

    const playBtn = this.add.text(350, 800, 'P l a y', { fontSize: 30, color: '#00ff00' }).setInteractive();
    camera = this.cameras.main;
    cursors = this.input.keyboard.createCursorKeys();


    camera.useBounds = true;
    camera._bounds.height = 1100;
    
    playBtn.on('pointerdown', e => {
      this.scene.start('MainGameScene');
    });
    
    console.log(camera);
  }
  
  update() {
    camera.scrollY += 3;

    // keep this
    // if (this.input.activePointer.justDown) console.log('hello');
  }
}

module.exports = GameMenu;