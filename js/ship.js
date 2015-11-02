(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }


  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    options.health = options.health || Ship.HEALTH;
    options.bulletPower = options.bulletPower;
    options.image = options.image;

    Asteroids.MovingObject.call(this, options);
  };

  Ship.RADIUS = 25;
  Ship.HEALTH = 100;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.fireBullet = function (nuke) {
    if (nuke && this.game.players[0].checkNuke() === false){
      this.game.players[0].checkNuke();
    } else {
      if (nuke){
        this.game.players[0].subtractNuke();
      }
      var norm = Asteroids.Util.norm(this.vel);

      var relVel = Asteroids.Util.scale(
        Asteroids.Util.dir([0,-1]),
        Asteroids.Bullet.SPEED
      );

      var bulletVel = [
        relVel[0] + this.vel[0], relVel[1] + this.vel[1]
      ];

      var bullet = new Asteroids.Bullet({
        pos: this.pos,
        vel: bulletVel,
        color: this.color,
        game: this.game,
        bulletPower: nuke
      });

      this.game.add(bullet);
    }
  };



  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.relocate = function () {
    this.pos = [500,450];
    this.vel = [0, 0];
  };

  Ship.prototype.decreaseHealth = function(asteroidPower){
    if (this.health - asteroidPower <= 0){
      this.game.players[0].decreaseLife();
    } else {
      this.health = this.health - asteroidPower;
    }
  };
})();
