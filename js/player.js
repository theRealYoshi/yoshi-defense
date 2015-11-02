(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Player = Asteroids.Player = function (options) {
    options.color = options.color;
    options.health = options.health || Player.LIVES;
    options.money = options.money || Player.MONEY;
    options.numNukes = options.numNukes || Player.NUMNUKES;
    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Player, Asteroids.MovingObject);
  Player.LIVES = 10;
  Player.MONEY = 1000;
  Player.NUMNUKES = 0;

  Player.prototype.draw = function(ctx){
    var lifeX = 50, lifeY = 50;
    var moneyX = 50, moneyY = 100;
    ctx.font = '20pt Helvetica';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'green';
    if (this.noNukes){
      ctx.fillText('You have no blue eggs', 650, 100);
      setTimeout(function(){
        this.noNukes = false;
      }.bind(this), 3000);
    } else if (this.noMoney){
      ctx.fillText('You do not have enough money', 500, 100);
      setTimeout(function(){
        this.noMoney = false;
      }.bind(this), 3000);
    } else if (this.lost){
      var bgReady = false;
      var gameOverImg = new Image();
      gameOverImg.onload = function () {
      	bgReady = true;
      };
      gameOverImg.src = 'img/gameover.png';
      ctx.fillStyle = "red";
      ctx.fillText("Game Over", 800, 100);
      ctx.drawImage(gameOverImg, 800, 150, 50, 50);
      this.health = '';
      this.money = '';
      this.game.round = '';
      this.numNukes = '';
    }
    ctx.fillText("Lives: " + this.health, lifeX, lifeY);
    ctx.fillText("Money: " + this.money, moneyX, moneyY);
    ctx.fillText("Blue Eggs: " + this.numNukes, 50, 150);
    ctx.fillText("Space = shoot, Left = a, Right = d, Buy Blue Egg = w, Shoot Blue Egg = n", 50, 575);

  };

  Player.prototype.buyNuke = function(){
    if (this.money - 500 < 0){
      this.noMoney = true;
    } else {
      this.numNukes += 1;
      this.money = this.money - 500;
    }
  };

  Player.prototype.decreaseLife = function(){
    if (this.health - 1 <= 0){
      this.lost = true;
    } else {
      this.health = this.health - 1;
      console.log(this.health);
    }
  };

  Player.prototype.changeMoney = function(money, add){
    if (add){
      this.money = this.money + money;
    } else {
      this.money = this.money - money;
    }
  };

  Player.prototype.checkNuke = function(){
    if (this.numNukes <= 0){
      this.noNukes = true;
      return false;
    } else {
      return true;
    }
  };

  Player.prototype.subtractNuke = function(){
    this.numNukes -= 1;
  };

}());
