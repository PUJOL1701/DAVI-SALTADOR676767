
/* ELEMENTOS DO JOGO */

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const gameBoard = document.querySelector('.game-board');

const gameOverScreen =
  document.getElementById('gameOverScreen');

const restartBtn =
  document.getElementById('restartBtn');


/* VARIÁVEIS */

let isJumping = false;
let gameEnded = false;


/* FUNÇÃO DE PULO */

function jump() {

  if (isJumping || gameEnded) return;

  isJumping = true;

  mario.classList.add('jump');

}


/* TECLADO */

document.addEventListener('keydown', (event) => {

  if (
    event.code === 'Space' ||
    event.code === 'ArrowUp'
  ) {

    event.preventDefault();

    jump();

  }

});


/* FINALIZAR ANIMAÇÃO DO PULO */

mario.addEventListener('animationend', (event) => {

  if (event.animationName === 'jump') {

    mario.classList.remove('jump');

    isJumping = false;

  }

});


/* VERIFICAR COLISÃO */

function checkCollision() {

  if (gameEnded) return;

  const marioRect =
    mario.getBoundingClientRect();

  const pipeRect =
    pipe.getBoundingClientRect();

  const collision =

    marioRect.right > pipeRect.left + 10 &&
    marioRect.left < pipeRect.right - 10 &&
    marioRect.bottom > pipeRect.top + 10 &&
    marioRect.top < pipeRect.bottom - 10;


  if (collision) {

    gameOver();

    return;

  }

  requestAnimationFrame(checkCollision);

}


/* FUNÇÃO GAME OVER */

function gameOver() {

  if (gameEnded) return;

  gameEnded = true;


  // PARAR O CANO

  const pipePosition =
    pipe.getBoundingClientRect();

  const boardPosition =
    gameBoard.getBoundingClientRect();

  pipe.style.animation = 'none';

  pipe.style.left =
    (pipePosition.left - boardPosition.left) + 'px';

  pipe.style.right = 'auto';


  // PARAR O PULO

  mario.classList.remove('jump');

  isJumping = false;


  // TROCAR PARA O ROSTO FAZENDO CARETA

  mario.src = './images/rosto-morrendo.png';

  mario.classList.add('dead');


  // MOSTRAR A TELA GAME OVER

  gameOverScreen.style.display = 'flex';


  console.log('GAME OVER! O personagem morreu!');

}


/* BOTÃO JOGAR NOVAMENTE */

restartBtn.addEventListener('click', () => {

  location.reload();

});


/* INICIAR JOGO */

checkCollision();
