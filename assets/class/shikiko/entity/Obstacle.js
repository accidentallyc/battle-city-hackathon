function Obstacle(spriteName,x,y){
  Entity.call(this,spriteName,x,y)
  this.sprite.body.immovable = true
}