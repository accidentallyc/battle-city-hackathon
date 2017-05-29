
class PlayerEntity {
  constructor(){
    Tank.call(this,8,8)
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