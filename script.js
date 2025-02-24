// script.js

const cardsArray = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

// Shuffle cards
// used Fisher-Yates algorithm
function shuffleCards() {
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]]; // Swap
    }
    return cardsArray;
}


// Create cards on the board
function createBoard() {
    const shuffledCards = shuffleCards();
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
    
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-card', card);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Track flipped cards
let flippedCards = [];
let matchedCards = 0;
let moves = 0;

// Flip a card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.getAttribute('data-card');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check if the flipped cards match
function checkMatch() {
    moves++;
    document.getElementById('moves').innerText = moves;

    const [firstCard, secondCard] = flippedCards;
    
    if (firstCard.innerText === secondCard.innerText) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards += 2;
    }

    // Delay before hiding the unmatched cards
    setTimeout(() => {
        flippedCards.forEach(card => {
            if (!card.classList.contains('matched')) {
                card.classList.remove('flipped');
                card.innerText = '';
            }
        });

        flippedCards = [];

        // Check if all cards are matched
        if (matchedCards === cardsArray.length) {
            setTimeout(() => {
                alert(`You won! Total moves: ${moves}`);
                resetGame();
            }, 500);
        }
    }, 1000);
}

// Reset the game
function resetGame() {
    matchedCards = 0;
    moves = 0;
    document.getElementById('moves').innerText = moves;
    createBoard();
}

// Initialize the game board
createBoard();
