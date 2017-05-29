

var state = { preload: preload, create: create, update: update }
var game = new Phaser.Game(256, 256, Phaser.AUTO, '', state);

var obstacleGroup = null;


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