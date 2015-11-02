(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.players = [];
    this.round = 0;
    this.addAsteroids();
  };

  Game.BG_COLOR = "#fff";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 2;

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else if (object instanceof Asteroids.Player){
      this.players.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addAsteroids = function () {
    this.round += 1;
    var numAsteroids = Game.NUM_ASTEROIDS * this.round;
    for (var i = 0; i < numAsteroids; i++) {
      this.add(new Asteroids.Asteroid({
        game: this,
        image: this.imageLoad('img/enemy.png')
      }));
    }
  };

  Game.prototype.nukeAsteroids = function(){
    var asteroidLength = this.asteroids.length;
    this.asteroids = [];
    for (var i = 0; i < asteroidLength; i++) {
      this.players[0].changeMoney(10, true);
    }
    this.addAsteroids();
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: [500,450],
      image: this.imageLoad('img/yoshi_throwing.png'),
      game: this
    });

    this.add(ship);

    return ship;
  };

  Game.prototype.addPlayer = function(){
    var player = new Asteroids.Player({
      lives: 10,
      numNukes: 0,
      noNukes: false,
      noMoney: false,
      lost: false,
      game: this
    });

    this.add(player);
    console.log(player);
    return player;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ships, this.asteroids, this.bullets, this.players);
  };

  Game.prototype.imageLoad = function(imgSrc){
    var bgReady = false;
    var bgImage = new Image();
    bgImage.onload = function () {
    	bgReady = true;
    };
    bgImage.src = imgSrc;
    return bgImage;
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      if (!(obj1 instanceof Asteroids.Player)){
        game.allObjects().forEach(function (obj2) {
          if (!(obj2 instanceof Asteroids.Player)){
            if (obj1 == obj2) {
              // don't allow self-collision
              return;
            }

            if (obj1.isCollidedWith(obj2)) {
              obj1.collideWith(obj2);
            }
          }
        });
      }
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var pattern = ctx.createPattern(this.imageLoad('img/background.jpg'), "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillText(this.round, 800,500);
    this.allObjects().forEach(function (object) {
      object.draw(ctx, object.image);
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.lost = function(){
    this.lost = true;
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      if (!(object instanceof Asteroids.Player)){
        object.move();
      }
    });
  };

  Game.prototype.randomPosition = function () {
    var randY = Math.floor(Math.random() * 100);
    var randX = Math.floor(Math.random() * 1000);
    return [
      // Game.DIM_X * Math.random(),
      randX,
      randY
    ];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
      if (this.asteroids.length <= 0){
        this.addAsteroids();
      }
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.step = function (gameView) {
    this.moveObjects();
    this.checkCollisions();
    this.checkGameOver(gameView);
  };

  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];

    function wrap(coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };

  Game.prototype.checkGameOver = function(gameView){
    if (this.players[0].health <= 0 ){
      gameView.stop();
    }
  };

  Game.prototype.init = function(){
    var canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = Asteroids.Game.DIM_X;
    canvasEl.height = Asteroids.Game.DIM_Y;
    var ctx = canvasEl.getContext("2d");
    var game = new Asteroids.Game();
    new Asteroids.GameView(game, ctx).start();
  }
})();
