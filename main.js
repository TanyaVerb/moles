const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const btnStart = document.querySelector(".start");
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  //в ind хранит случайный индекс элемента массива holes.
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx]; //извлекается элемент из массива holes и сохраняется в переменную hole.

  //проверяется, не совпадает ли выбранный hole с предыдущим выбранным элементом, хранящимся в переменной lastHole.
  if (hole === lastHole) {
    //снова выбирает случайный элемент из holes, пока не будет выбран элемент, отличный от lastHole.(происходит рекурсия)
    return randomHole(holes);
  }
  //После выбора нового элемента, он сохраняется в переменную lastHole для следующего сравнения.

  lastHole = hole;

  //возвращаем выбранный элемент hole
  return hole;
}

function peep() {
  const time = randomTime(200, 2000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000);
}

btnStart.addEventListener("click", startGame);

function bonk(e) {
  if (!e.isTrusted) return; //мошенник (cheater)
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
