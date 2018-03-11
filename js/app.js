import "../scss/style.scss";

//creating a board made of table

class Game{
  constructor() {
  }

  createBoard() {
    let table = $('<table></table>').addClass("table");
    let board = [];

    for (let i = 0; i < 40; i++) {
      let row = $('<tr></tr>').addClass("row").attr("id", i);

        for (let j = 0; j < 40; j++) {
          let cell = $('<td></td>').addClass("cell").attr("id", j);
          $(row).append(cell);
        }

      $(table).append(row);
    }
    $('.board').append(table);
  }


  createSnakeHead(newPos) {
    let randomRow = $('.row').find('#19');
    let randomCell = randomRow[39];
    $(randomCell).addClass("head");
    this.currPos = randomCell;
    this.direction = "up";
  }

  createWholeSnake() {
    $(this.currPos).addClass("head");
  }

  hideSnake() {
    $(this.currPos).removeClass("head");
    $(".snake-body").removeClass("snake-body");
  }

  createFrogs() {
    let num1 = Math.floor(Math.random() * 39) + 0;
    let num2 = Math.floor(Math.random() * 39) + 0;
    let randomRow = $('.row').find('#' + num1);
    let frogPos = randomRow[num2];
    $(frogPos).addClass("frog");
    this.point = frogPos;
  }


  turnSnake(e) {
    if (e.keyCode == 37){
      this.direction = "left";
    }
    else if (e.keyCode == 40){
      this.direction = "down";
    }
    if (e.keyCode == 38){
      this.direction = "up";
    }
    if (e.keyCode == 39){
      this.direction = "right";
    }
  }

  checkFrogCollision() {
    if (this.currPos == this.point) {
      this.score = $('.score').text();
      this.score++;
      this.snakeLength++;
      $('.score').text(this.score);
      $(this.point).removeClass("frog");
      console.log(this.snakeCords);
      game.createFrogs();
    }
  }

  checkCollision() {
    if (this.currPos === undefined) {
      console.log('game over');
      clearInterval(this.intervalId);
    }
  }


  moveSnake() {
    game.hideSnake();
    if (this.direction === "up") {
      let newPos = $(this.currPos).parent().prev().find('#' + this.currPos.id);
      this.currPos = newPos[0];
    }
    else if (this.direction === "down") {
      let newPos = $(this.currPos).parent().next().find('#' + this.currPos.id);
      this.currPos = newPos[0];
    }
    else if (this.direction === "right") {
      let newPos = $(this.currPos).next();
      this.currPos = newPos[0];
    }
    else if (this.direction === "left") {
      let newPos = $(this.currPos).prev();
      this.currPos = newPos[0];
    }

    game.checkFrogCollision();
    game.checkCollision();
    game.createWholeSnake();
  }

  startGame() {
    this.intervalId = setInterval( () => {
      game.moveSnake();
    }, 100 );
  }
}


const game = new Game();
game.createBoard();
game.createSnakeHead();
game.createFrogs();
game.startGame();
$(document).on('keydown', (e) => {
  game.turnSnake(e);
});
