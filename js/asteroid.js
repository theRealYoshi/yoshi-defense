(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.color = Asteroid.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Asteroid.RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVec(Math.floor(Math.random() * (3 - 1) + 1));
    options.health = options.health || Asteroid.HEALTH;
    options.asteroidPower = Asteroid.POWER;
    options.image = options.image;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLOR = "#505050";
  Asteroid.RADIUS = 20;
  Asteroid.HEALTH = 10;
  Asteroid.POWER = 10;
  Asteroid.SPEED = Math.floor(Math.random() * (5 - 1) + 1);

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.decreaseHealth(Asteroid.POWER);
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet){
      if (otherObject.bulletPower > 100){
        this.game.nukeAsteroids();
      } else {
        this.decreaseHealth(otherObject.bulletPower);
      }
    }
  };

  Asteroid.prototype.decreaseHealth = function(bulletPower){
    if ((this.health - bulletPower) <= 0){
      this.game.players[0].changeMoney(10, true);
      this.remove();
    } else {
      this.health = this.health - bulletPower;
    }
  };

  Asteroid.prototype.isWrappable = false;
})();
