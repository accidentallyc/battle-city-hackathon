

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
    // this.sprite.y-= 1
    this.sprite.body.y-= 1
    this.sprite.angle =0
  }
  moveDown(){
    // this.sprite.y+= 1  
    this.sprite.body.y+= 1  
    this.sprite.angle =180
  }

  moveLeft(){
    // this.sprite.x-= 1
    this.sprite.body.x-= 1
    this.sprite.angle = 270
  }

  moveRight(){
    // this.sprite.x+= 1
    this.sprite.body.x+= 1
    this.sprite.angle = 90
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
  // obstacleGroup.x = 0
  // obstacleGroup.y = 0

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

  let canMoveUp = true
  let canMoveDown = true
  let canMoveLeft = true
  let canMoveRight = true

   game.physics.arcade.collide(
    this.p1.sprite, obstacleGroup, (a,b)=>{
      const entAx = Math.ceil(a.position.x / 13)
      const entBx = Math.ceil(b.position.x / 13)
      const entAy = Math.ceil(a.position.y / 13)
      const entBy = Math.ceil(b.position.y / 13)

      if( entAx < entBx ) canMoveRight = false
      else if( entAx > entBx ) canMoveLeft = false
      
      if( entAy < entBy ) canMoveDown = false
      else if( entAy > entBy ) canMoveUp = false

    }, null, this)


  if(isMovingUp && canMoveUp) 
    this.p1.moveUp()
  else if(isMovingDown && canMoveDown)
    this.p1.moveDown()
  else if(isMovingLeft && canMoveLeft)
    this.p1.moveLeft()
  else if(isMovingRight && canMoveRight)
    this.p1.moveRight()

  // game.physics.arcade.collide(
  //   this.p1.sprite, 
  //   obstacle.sprite, function(){
  //     alert(5)
  //   });

}