(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.player = this.game.addPlayer();
    this.timerId = null;
  };

  GameView.MOVES = {
    "a": [-1,  0],
    // "s": [ 0,  1],
    "d": [ 1,  0]
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;
    var player = this.game.players[0];

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("space", function () { ship.fireBullet() });
    key("n", function () { ship.fireBullet(101) });
    key("w", function () { player.buyNuke() });
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step(gameView);
        gameView.game.draw(gameView.ctx);
      }, 1000 / Asteroids.Game.FPS
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
  };

  GameView.prototype.init = function(ctx){
    document.getElementById('play-again').addEventListener('click', function() {
      this.stop();
    }.bind(this));
    document.getElementById('play-again')

  };

})();
