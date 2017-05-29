const LEVELS = [];
const makeNewLevel = ()=>{
  const lvl = new Array(13);
  for (var i = 13 - 1; i >= 0; i--) {
    lvl[i] =  new Array(13)
  }
  return lvl
}

LEVELS["1"] = makeNewLevel();

LEVELS["1"][8][0] = 'B'
LEVELS["1"][5][5] = 'B'
LEVELS["1"][5][6] = 'W'
LEVELS["1"][5][7] = 'S'
LEVELS["1"][8][2] = 'B'


var state = { preload: preload, create: create, update: update }
var game = new Phaser.Game(256, 256, Phaser.AUTO, '', state);

var obstacleGroup = null;

class Entity {
  constructor(spriteName,x,y){
    const sprite =  game.add.sprite(x, y, spriteName)
    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5
    // sprite.body.collideWorldBounds = true;
    // sprite.body.checkCollision.up = false;
    // sprite.body.checkCollision.down = false;
    

    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = true;
    sprite.body.checkCollision.up = true;
    sprite.body.checkCollision.down = true;
    sprite.body.checkCollision.left = true;
    sprite.body.checkCollision.right = true;
    
    this.sprite = sprite
  }
}

class Obstacle extends Entity{
  constructor(spriteName,x,y){
    super(spriteName,x,y)
    this.sprite.body.immovable = true
  }
}

class BrickWall extends Obstacle{
  constructor(x,y){
    super("obsWall",x,y)
  }
}

class SteelWall extends Obstacle{
  constructor(x,y){
    super("obsSteel",x,y)
  }
}

class Water extends Obstacle{
  constructor(x,y){
    super("obsWater",x,y)
  }
}

class Tank extends Entity {
  constructor(x,y){
    super("player",x,y)
  } 
}

class PlayerEntity extends Tank {
  constructor(){
    super(8,8)
    this.ms = 100;
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
    this.sprite.body.velocity.x = 0
    this.sprite.body.velocity.y = -this.ms
    this.sprite.angle =0
  }
  moveDown(){
    this.sprite.body.velocity.x = 0
    this.sprite.body.velocity.y = this.ms
    this.sprite.angle =180
  }

  moveLeft(){
    this.sprite.body.velocity.y = 0
    this.sprite.body.velocity.x = -this.ms
    this.sprite.angle = 270
  }

  moveRight(){
    this.sprite.body.velocity.y = 0
    this.sprite.body.velocity.x = this.ms
    this.sprite.angle = 90
  }

  moveStop(){
    this.sprite.body.velocity.y = 0
    this.sprite.body.velocity.x = 0
  }

}

function preload() {
  game.load.image('player', 'assets/images/player/BigTank1.png');
  game.load.image('obsWall', 'assets/images/Elements/Bricks.png');
  game.load.image('obsSteel', 'assets/images/Elements/Wall.png');
  game.load.image('obsWater', 'assets/images/Elements/Water.png');
}

function create() {

  this.p1 = new PlayerEntity();

  const currLvl = LEVELS["1"]
  obstacleGroup = game.add.group();
  obstacleGroup.enableBody = true;
  obstacleGroup.physicsBodyType = Phaser.Physics.ARCADE;
  
  for (var x = currLvl.length - 1; x >= 0; x--) {
    for (var y = currLvl[x].length - 1; y >= 0; y--) {
      const slot = currLvl[x][y]
      if(!slot) continue;

      const posX = x * 16
      const posY = y * 16

      let obstacle = null
      switch(slot){
        case 'B':
          obstacle = new BrickWall(posX,posY);
          break;
        case 'W':
          obstacle = new SteelWall(posX,posY);
          break;
        case 'S':
          obstacle = new Water(posX,posY);
          break;
      }
      obstacleGroup.add(obstacle.sprite)
    }
  }


}

function update() {

  const isMovingUp = this.p1.keys.p1.up.isDown;
  const isMovingDown = this.p1.keys.p1.down.isDown;
  const isMovingLeft = this.p1.keys.p1.left.isDown;
  const isMovingRight = this.p1.keys.p1.right.isDown;

  game.physics.arcade.collide(this.p1.sprite, obstacleGroup,null, null, this)


  if(isMovingUp) 
    this.p1.moveUp()
  else if(isMovingDown)
    this.p1.moveDown()
  else if(isMovingLeft)
    this.p1.moveLeft()
  else if(isMovingRight)
    this.p1.moveRight()
  else
    this.p1.moveStop()
}