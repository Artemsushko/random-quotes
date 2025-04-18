import quotes from './src/quotes.js';
import {
  changeFavoriteBtnColor,
  removeFavoriteCard,
  showFavoriteCard,
} from './src/favoritesHandler.js';

const generateBtn = document.getElementById('quoteBtn');
const quoteElement = document.getElementById('quoteElement');
const quoteAutor = document.getElementById('quoteAutor');
const toggleFavoriteBtn = document.getElementById('favorite-btn');
const favoriteContainer = document.getElementById('favorite-container');
const closeCardBtn = document.getElementById('close-btn');

let lastIndex = -1;
let currentIndex;

function generateRandomQuote() {
  do {
    currentIndex = Math.floor(Math.random() * quotes.length);
  } while (currentIndex === lastIndex);
  let { text, author, isFavorite } = quotes[currentIndex];
  if (isFavorite === undefined) {
    isFavorite = false;
  }

  changeFavoriteBtnColor(isFavorite, toggleFavoriteBtn);

  lastIndex = currentIndex;
  quoteElement.textContent = `"${text}"`;
  quoteAutor.textContent = author;
  toggleFavoriteBtn.style.display = 'inline-block';
}

function toggleFavorite() {
  const currentQuote = quotes[currentIndex];
  currentQuote.isFavorite = !currentQuote.isFavorite;

  changeFavoriteBtnColor(currentQuote.isFavorite, toggleFavoriteBtn);

  if (currentQuote.isFavorite) {
    showFavoriteCard(currentQuote, favoriteContainer, toggleFavoriteBtn);
  } else {
    removeFavoriteCard(currentQuote.text);
  }
}

generateBtn.addEventListener('click', generateRandomQuote);
toggleFavoriteBtn.addEventListener('click', toggleFavorite);
