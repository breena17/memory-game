/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond','fa-diamond',
             'fa-paper-plane-o','fa-paper-plane-o',
             'fa-anchor','fa-anchor',
             'fa-bolt','fa-bolt',
             'fa-cube','fa-cube',
             'fa-leaf','fa-leaf',
             'fa-bicycle','fa-bicycle',
             'fa-bomb','fa-bomb',];
        
function generateCard(...cards) {
    let generateCard = `<li class="card" data-card="${cards}"><i class="fa ${cards}"></i></li>`;
    return generateCard;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

function initGame() {
    let deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });
    
    
    deck.innerHTML = cardHTML.join('');
    refreshListeners();

    
}
//move counter and removes stars
let moves=0;
let moveCounter = document.querySelector('.moves');
let stars= document.getElementsByClassName("stars");

function reduceStars() {
    moves +=1;
    moveCounter.innerHTML = moves;
    
    if (moves > 14 && moves <=18) {
        document.getElementsByClassName("fa-star")[2].style.color='black';
    }
    else if (moves > 18) {
        document.getElementsByClassName('fa-star')[1].style.color='black';
    }
}




//timer
let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');
let interval;


function initTimer() {
    interval = setInterval(function() {
        timer.innerHTML = `${minute} Minutes ${second} Seconds`;
        second ++;
        if(second == 60) {
            minute++;
            second = 0;
        }
        
    },1000);
    
}
initGame();
function restartTimer() {
    let second = 0;
    let minute = 0;
    let timer = document.querySelector('.timer');
    let interval;
    interval = setInterval(function() {
        timer.innerHTML = `${minute} Minutes ${second} Seconds`;
        second ++;
        if(second == 60) {
            minute++;
            second = 0;
        }
        
    },1000);
    
}


function refreshListeners() {

let allCards = document.querySelectorAll('.card');
let openCards = [];

allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
        
            if (!card.classList.contains('open') || !card.classList.contains('show')) {    
                openCards.push(card);
                card.classList.add('open','show');
                
                if (openCards.length == 2) {
                    //match
                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                        openCards[0].classList.add('match');
                        openCards[0].classList.add('open');
                        openCards[0].classList.add('show');
                        openCards[1].classList.add('match');
                        openCards[1].classList.add('open');
                        openCards[1].classList.add('show');
                        openCards=[];
                    } 
                     
                    else {
                        // no match, hide
                        setTimeout(function() {
                            openCards.forEach(function(card) {
                                card.classList.remove('open','show');
                            });
                            openCards=[];
                        }, 1000);
                    }
                    
                    reduceStars();
                    congrats();
                }    
            }

    });
});
}
//modal
let matchedCards = document.getElementsByClassName('match');
let modal = document.getElementById('myModal');
let span = document.querySelector('.close').addEventListener('click',close);
let button = document.querySelector('.button').addEventListener('click',replay);
function congrats() {
    if (matchedCards.length === 16) {
        clearInterval(interval);
        
        finalTime = `Completed In: ${minute} Minutes ${second} Seconds`;
        modal.style.display = 'block';
        moves = `Total Moves: ${moves}`;
        
        let starRating =document.querySelector('.stars').innerHTML;
        document.getElementById('starRating').innerHTML=starRating;
        document.getElementById('totalMoves').innerHTML=moves;
        document.getElementById('totalTime').innerHTML=finalTime;
    }
}
function close() {
    modal.style.display = "none";
}
function replay() {
    modal.style.display ="none";
        //clear moves
        moves = 0;
        moveCounter.innerHTML = moves;
        //clear timer
        let minute=0;
        let second=0;
        let timer = document.querySelector(".timer");
        timer.innerHTML =`${minute} Minutes ${second} Seconds`;
        clearInterval(interval);
        //clear stars
        let stars= document.getElementsByClassName("stars");
        document.getElementsByClassName("fa-star")[1].style.color='gold';
        document.getElementsByClassName("fa-star")[2].style.color='gold';
        //reset timer onclick
        document.querySelector('.deck').setAttribute('onclick','clearInterval(interval); restartTimer(); this.onclick=null');
        
        initGame();
        
        

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


