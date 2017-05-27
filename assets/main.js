

var state = { preload: preload, create: create, update: update }
var game = new Phaser.Game(256, 256, Phaser.AUTO, '', state);


class Entity {
  constructor(sprite){
    this.sprite = sprite
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
  }
}

class Tank extends Entity {
  constructor(){
    const sprite =  game.add.sprite(50, 50, 'player')
    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5
    super(sprite)
  } 
}

class PlayerEntity extends Tank {
  constructor(){
    super()
    this.keys = {
      p1 : {
        'up': game.input.keyboard.addKey(Phaser.Keyboard.W),
        'down': game.input.keyboard.addKey(Phaser.Keyboard.S),
        'left': game.input.keyboard.addKey(Phaser.Keyboard.A),
        'right': game.input.keyboard.addKey(Phaser.Keyboard.D),
      }
    }
  }

  moveUp(){
    this.sprite.y-= 1
    this.sprite.angle =0
  }
  moveDown(){
    this.sprite.y+= 1  
    this.sprite.angle =180
  }

  moveLeft(){
    this.sprite.x-= 1
    this.sprite.angle = 270
  }

  moveRight(){
    this.sprite.x+= 1
    this.sprite.angle = 90
  }

}

function preload() {
  game.load.image('player', 'assets/images/player/BigTank1.png');
}

function create() {

  
  // sprite.body.collideWorldBounds = true;
  // sprite.body.checkCollision.up = false;
  // sprite.body.checkCollision.down = false;
  // sprite.body.immovable = true;

  this.p1 = new PlayerEntity()


}

function update() {

  const isMovingUp = this.p1.keys.p1.up.isDown;
  const isMovingDown = this.p1.keys.p1.down.isDown;
  const isMovingLeft = this.p1.keys.p1.left.isDown;
  const isMovingRight = this.p1.keys.p1.right.isDown;

  if(isMovingUp)
    this.p1.moveUp()
  else if(isMovingDown)
    this.p1.moveDown()
  else if(isMovingLeft)
    this.p1.moveLeft()
  else if(isMovingRight)
    this.p1.moveRight()
}