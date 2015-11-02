(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    options.bulletPower = options.bulletPower || Bullet.POWER;
    options.image = this.imageLoad(options.bulletPower);
    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 10;
  Bullet.SPEED = 15;
  Bullet.POWER = 5;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.imageLoad = function(bulletPower){
    var imgSrc;
    if (bulletPower === 5){
      imgSrc = 'img/yoshi_green_egg.png';
    } else {
      imgSrc = 'img/bullet.png';
    }
    var bgReady = false;
    var bgImage = new Image();
    bgImage.onload = function () {
      bgReady = true;
    };
    bgImage.src = imgSrc;
    return bgImage;
  };

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.remove();
    }
  };

  Bullet.prototype.isWrappable = false;
})();
