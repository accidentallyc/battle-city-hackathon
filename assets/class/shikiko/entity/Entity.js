function Entity(spriteName,x,y){
    const sprite =  game.add.sprite(x, y, spriteName)
    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5  

    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = true;
    sprite.body.checkCollision.up = true;
    sprite.body.checkCollision.down = true;
    sprite.body.checkCollision.left = true;
    sprite.body.checkCollision.right = true;
    
    this.sprite = sprite
}