import quotes from './src/quotes.js';
import {
  toggleFavoriteIcon,
  removeFavoriteCard,
  showFavoriteCard,
} from './src/favoritesHandler.js';
import { generateRandomInt } from './src/utils.js';

const generateBtn = document.getElementById('quoteBtn');
const toggleFavoriteBtn = document.getElementById('favorite-btn');
const favoriteContainer = document.getElementById('favorite-container');
const removeAllCardsBtn = document.getElementById('removeAllCardsBtn');

let lastIndex = -1;
let currentIndex;

function chooseAndDisplayQuote() {
  const randomQuote = generateRandomQuote(quotes);
  displayQuote(randomQuote);
}

function toggleFavorite() {
  const currentQuote = quotes[currentIndex];
  currentQuote.isFavorite = !currentQuote.isFavorite;
  toggleFavoriteIcon(currentQuote.isFavorite, toggleFavoriteBtn);
  showOrRemoveFavoriteCard(currentQuote);
  updateRemoveAllBtnVisibility();
}

function displayQuote(quote) {
  let { text, author, isFavorite } = quote;
  const quoteElement = document.getElementById('quoteElement');
  const quoteAuthor = document.getElementById('quoteAuthor');
  quoteElement.classList.add('quote');
  if (isFavorite === undefined) {
    isFavorite = false;
  }
  quoteElement.textContent = text;
  quoteAuthor.textContent = author;
  toggleFavoriteIcon(isFavorite, toggleFavoriteBtn);
}

function generateRandomQuote(quotes) {
  do {
    currentIndex = generateRandomInt(quotes.length);
  } while (currentIndex === lastIndex);
  lastIndex = currentIndex;
  return quotes[currentIndex];
}

function showOrRemoveFavoriteCard(currentQuote) {
  currentQuote.isFavorite
    ? showFavoriteCard(
        currentQuote,
        favoriteContainer,
        toggleFavoriteBtn,
        updateRemoveAllBtnVisibility
      )
    : removeFavoriteCard(currentQuote.text);
}

function removeAllCards() {
  const favoriteCards = document.querySelectorAll('.favorite-card');
  favoriteCards.forEach((card) => card.remove());
  quotes.forEach((quote) => (quote.isFavorite = false));
  toggleFavoriteIcon(false, toggleFavoriteBtn);

  updateRemoveAllBtnVisibility();
}

function updateRemoveAllBtnVisibility() {
  const hasFavorites = quotes.some((quote) => quote.isFavorite);
  removeAllCardsBtn.style.display = hasFavorites ? 'inline-block' : 'none';
}

generateBtn.addEventListener('click', chooseAndDisplayQuote);
toggleFavoriteBtn.addEventListener('click', toggleFavorite);
removeAllCardsBtn.addEventListener('click', removeAllCards);
