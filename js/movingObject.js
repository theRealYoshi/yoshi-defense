(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.health = options.health;
    this.bulletPower = options.bulletPower;
    this.asteroidPower = options.asteroidPower;
    this.color = options.color;
    this.game = options.game;
    this.money = options.money;
    this.numNukes = options.numNukes;
    this.image = options.image;

  };

  MovingObject.prototype.collideWith = function (otherObject) {
    ; // default do nothing
  };

  MovingObject.prototype.draw = function (ctx, img) {

    ctx.drawImage(img, this.pos[0], this.pos[1], 70, 80);
    ctx.beginPath();
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Asteroids.Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        if (this instanceof Asteroids.Asteroid){
          //decrease life of ship
          this.game.players[0].decreaseLife();
        }

        this.remove();
      }
    }
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();
