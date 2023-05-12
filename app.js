// Define an array of card values
const cardValues = [
	'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

// Shuffle the card values array using the Fisher-Yates shuffle algorithm
function shuffle(array) {
	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// Generate the game board dynamically using the shuffled card values array
function generateBoard() {
	const gameBoard = document.getElementById('game-board');
	const shuffledCards = shuffle(cardValues);

	for (let i = 0; i < shuffledCards.length; i++) {
		const card = document.createElement('div');
		card.classList.add('card');
		card.dataset.cardValue = shuffledCards[i];

		const front = document.createElement('div');
		front.classList.add('front');
		front.textContent = shuffledCards[i];
		card.appendChild(front);

		const back = document.createElement('div');
		back.classList.add('back');
		back.textContent = ' ';
		card.appendChild(back);

		gameBoard.appendChild(card);
	}

	// Add a click event listener to each card
	const cards = document.querySelectorAll('.card');
	cards.forEach(card => card.addEventListener('click', flipCard));
}

// Flip a card over
function flipCard() {
	if (gameLocked) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard) {
		// First card flipped
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	// Second card flipped
	secondCard = this;
	checkForMatch();
}

// Check if two flipped cards match
function checkForMatch() {
	let isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;

	isMatch ? disableCards() : unflipCards();
}

// Disable matching cards
function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}

// Unflip non-matching cards
function unflipCards() {
	gameLocked = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 1000);
}

// Reset the board after two cards have been flipped
function resetBoard() {
	hasFlippedCard = false;
	gameLocked = false;
	firstCard = null;
	secondCard = null;
}

// Generate the game board when the page loads
generateBoard();
