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
    /*remove current deck*/
  const currentDeck = document.querySelector('.deck');
  while (currentDeck.firstChild) {
  currentDeck.removeChild(currentDeck.firstChild);
  }
  /*add new deck fragment*/
  document.querySelector('.deck').appendChild(deckFragment);
  turnCards();
};

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

/* event listener that turns cards on click */

/* Attempt using selecting deck and forEach loop
function turnCards(){
  deck.forEach(function(card){
    card.addEventListener('click', function(){
      card.classList.add('open', 'show')
      });
    })
  };*/

/* Event listener to turn cards and add to open list */
function turnCards() {
  for (let i = 0; i < deck.length; i++) {
    deck[i].addEventListener('click', function(){
      this.classList.add('open', 'show');
      openCards.push(deck[i]);
    })
  }
};

/* Check for card match */
function matchTest(){
    if (openCards.length == 2){
        if (openCards[0].firstChild.className == openCards[1].firstChild.className){
          match();
        } else {
          noMatch();
        } openCards.splice(0, 2);
    }
};


/* Lock cards in matched position */
function match() {
  openCards[0].classList.remove('open', 'show');
  openCards[0].classList.add('match');
  openCards[1].classList.toggle('match');
  openCards[1].classList.add('match');
};

/* Turn cards back over */
function noMatch() {
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
};
