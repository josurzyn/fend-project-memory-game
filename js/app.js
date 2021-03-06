/*
 * Create a list that holds all of your cards
 */

let cards = [
  'diamond',
  'diamond',
  'paper-plane-o',
  'paper-plane-o',
  'anchor',
  'anchor',
  'bolt',
  'bolt',
  'cube',
  'cube',
  'leaf',
  'leaf',
  'bicycle',
  'bicycle',
  'bomb',
  'bomb',
];

let deck = document.getElementsByClassName('card');
let openCards = [];
let displayMoves = document.querySelector('.moves');
let moves = 0;
let matches = 0;
const winningBox = document.querySelectorAll('.win-box');
const winningMessage = document.querySelector('.win-msg');
const congrats = document.querySelector('.congrats');
const close = document.getElementsByClassName('close');
const restart = document.getElementsByClassName('restart');
let starsUl = document.getElementsByClassName('stars');
let starChild = starsUl[0].children;
let timer = 0;
const timerSpan = document.getElementById('timer');
let seconds = 0;
let minutes = 0;

/* Display cards on document load*/
document.addEventListener('DOMContentLoaded', function(){
  displayCards();
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const deckFragment = document.createDocumentFragment();

function displayCards(){
  shuffle(cards);
  cards.forEach(function(card){
    const randomCard = document.createElement('li');
    randomCard.classList.add('card');
    randomCard.innerHTML = '<i class="fa fa-' + card + '"</i>';
    deckFragment.appendChild(randomCard);
  });
  removeDeck();
  /*add new deck fragment*/
  document.querySelector('.deck').appendChild(deckFragment);
  turnCards();
  reset();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/* Event listener to turn cards and add to open list */
function turnCards() {
  for (let i = 0; i < deck.length; i++) {
    deck[i].addEventListener('click', function(){
      if ((deck[i].classList.contains('open')) || (openCards.length == 2)){
        event.preventDefault();
      } else {
        this.classList.add('open', 'show');
        openCards.push(deck[i]);
        startTimer();
        matchTest();
      }
    });
  }
}

/* Check for card match */
function matchTest(){
    if (openCards.length == 2){
        if (openCards[0].firstChild.className == openCards[1].firstChild.className){
            setTimeout(match, 250);
        } else {
            setTimeout(noMatch, 1200);
        }
    }
}

/* Lock cards in matched position */
function match() {
  openCards[0].classList.remove('open', 'show');
  openCards[0].classList.add('match');
  openCards[1].classList.remove('open', 'show');
  openCards[1].classList.add('match');
  matches += 1;
  checkMatches();
  openCards.splice(0, 2);
  countMove();
}

/* Turn cards back over */
function noMatch() {
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');
    openCards.splice(0, 2);
    countMove();
}

/* Count and display moves */
function countMove() {
  moves += 1;
  if (moves == 1){
    displayMoves.innerHTML = moves + ' Move';
  } else {
    displayMoves.innerHTML = moves + ' Moves';
  }
  starRating();
}

/* Remove currently displayed deck */
function removeDeck(){
  const currentDeck = document.querySelector('.deck');
  while (currentDeck.firstChild) {
  currentDeck.removeChild(currentDeck.firstChild);
  }
}

/* Check total number of matches to see if cards remaining*/
function checkMatches() {
  if (matches == 8){
    stopTimer();
    setTimeout(showWin, 500);
    closeBox();
  }
}

/* Show winning box with score */
function showWin(){
  winningBox[0].style.display = 'block';
  addStars();
  let endTime = document.querySelector('#timer').innerText;
  congrats.insertAdjacentHTML('beforeend', endTime);
  const score = '<p>You won in ' + moves + ' moves!</p>';
  congrats.insertAdjacentHTML('beforeend', score);
}

/* Adds num of stars to winning message */
function addStars(){
  let rating = document.createElement('ul');
  rating.innerHTML = starsUl[0].innerHTML;
  rating.className = 'star-rating';
  congrats.appendChild(rating);
}

/* Close winning box and reset display */
function closeBox(){
  close[0].addEventListener('click', function(){
    winningBox[0].style.display = 'none';
    setTimeout(displayCards, 500);
  });
}

/* Add event listener to reset game on restart icons */
for (let i = 0; i < restart.length; i++)
  restart[i].addEventListener('click', function(){
    stopTimer();
    displayCards();
    winningBox[0].style.display = 'none';
  });

/* Set star rating */
function starRating(){
    if (moves == 18){
      starChild[1].children[0].className = 'fa fa-star-o';
    } else if (moves == 12){
      starChild[2].children[0].className = 'fa fa-star-o';
    }
}

/* Start Timer */
function startTimer(){
  if (timer == 0){
    timer = setInterval(countTime, 1000);
  }
}

/* Count and display time in seconds and minutes */
function countTime(){
    seconds++;
    if (seconds == 60){
        minutes++;
        seconds=0;
        if (minutes == 60){
            minutes = 0;
            seconds = 0;
        }
    }
    timerSpan.innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

/* Stop timer */
function stopTimer(){
  clearInterval(timer);
  timer = 0;
  seconds = 0;
  minutes = 0;
}

/* Reset game stats for new game */
function reset(){
  for (let i = 0; i < 3; i++){
    starChild[i].children[0].className = 'fa fa-star';
  };
  moves = 0;
  displayMoves.innerHTML = moves + ' Moves';
  matches = 0;
  timerSpan.innerHTML = '00:00';
  congrats.innerHTML = '';
}
