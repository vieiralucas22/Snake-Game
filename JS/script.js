let field_game;
let context;
let blockSize = 20;
let cols = 30;
let rows = 20;
let movX = 0;
let movY = 0;
let body = [];
let foodX;
let foodY;
let score = 0;
let applePoint = 20;
let velocityX = 1;
let velocityY = 0;

let gameOver = false;

window.onload = () => {
  field_game = document.getElementById("field_game");
  context = field_game.getContext("2d");

  field_game.width = cols * blockSize;
  field_game.height = rows * blockSize;

  document.addEventListener("keyup", changeDirection);

  field_game.addEventListener("click", () => {
    gameOver = false;
    score = 0;
  });

  foodPlace();

  setInterval(update, 100);
};

function update() {
  // Limpa a tela
  createRect(0, 0, field_game.width, field_game.height);

  if (gameOver) {
    //Cria a tela de game over

    createText(
      `Game Over`,
      field_game.width / 2,
      field_game.height / 2 - 25,
      "center",
      50
    );

    createText(
      `Score: ${score}`,
      field_game.width / 2,
      field_game.height / 2 + 25,
      "center"
    );

    createText(
      `Click to Start Again`,
      (cols * blockSize) / 2,
      field_game.height - 50,
      "center"
    );

    return;
  }

  // Coloca o score no tela
  createText(`Score: ${score}`, 30, 40);

  // Cria a primeira maça/comida
  createRect(foodX, foodY, blockSize, blockSize, "red");

  // aumenta o tamanho e o score se a cobrinha comer a maça
  if (movX == foodX && movY == foodY) {
    body.push([foodX, foodY]);

    score += applePoint;

    foodPlace();
  }

  // Corpo
  for (let i = body.length - 1; i > 0; i--) {
    body[i] = body[i - 1];
  }

  if (body.length) {
    body[0] = [movX, movY];
  }

  // Posiçāo da cobrinha
  movX += velocityX * blockSize;
  movY += velocityY * blockSize;

  createRect(movX, movY, blockSize, blockSize, "white");

  for (let i = 0; i < body.length; i++) {
    createRect(body[i][0], body[i][1], blockSize, blockSize, "lime");
  }

  // bateu na parede
  if (
    movX < 0 ||
    movX > cols * blockSize ||
    movY < 0 ||
    movY > rows * blockSize
  ) {
    gameOverEvent();
  }

  // Se ele bater nela mesma game over
  for (let i = 0; i < body.length; i++) {
    if (movX == body[i][0] && movY == body[i][1]) {
      gameOverEvent();
    }
  }
}
//Define onde a comida aparecerá na tela
function foodPlace() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
//Altera a direçāo da cobrinha
function changeDirection(e) {
  if (e.code == "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
}

function gameOverEvent() {
  gameOver = true;
  body = [];
  movX = 0;
  movY = 0;
  velocityX = 1;
  velocityY = 0;
}

function createRect(x, y, width, height, color = "black") {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}
//Funçāo que cria os textos
function createText(text, x, y, textAlign = "start", fontSize = 20) {
  context.fillStyle = "white";
  context.font = `${fontSize}px Silkscreen`;
  context.textAlign = textAlign;
  context.fillText(text, x, y);
}
