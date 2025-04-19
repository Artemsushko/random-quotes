import quotes from './src/quotes.js';
import {
  toggleFavoriteIcon,
  removeFavoriteCard,
  showFavoriteCard,
  showToggleFavoriteBtn,
} from './src/favoritesHandler.js';
import { generateRandomInt } from './src/utils.js';

const generateBtn = document.getElementById('quoteBtn');
const toggleFavoriteBtn = document.getElementById('favorite-btn');
const favoriteContainer = document.getElementById('favorite-container');

let lastIndex = -1;
let currentIndex;

function chooseAnddisplayQuote() {
  const randomQuote = generateRandomQuote();
  displayQuote(randomQuote);
}

function displayQuote(quote) {
  const quoteElement = document.getElementById('quoteElement');
  const quoteAutor = document.getElementById('quoteAutor');
  quoteElement.classList.add('quote');
  let { text, author, isFavorite } = quote;
  if (isFavorite === undefined) {
    isFavorite = false;
  }
  quoteElement.textContent = text;
  quoteAutor.textContent = author;
  showToggleFavoriteBtn(toggleFavoriteBtn);
  toggleFavoriteIcon(isFavorite, toggleFavoriteBtn);
}

function generateRandomQuote() {
  do {
    currentIndex = generateRandomInt(quotes.length);
  } while (currentIndex === lastIndex);
  lastIndex = currentIndex;
  return quotes[currentIndex];
}

function toggleFavorite() {
  const currentQuote = quotes[currentIndex];
  currentQuote.isFavorite = !currentQuote.isFavorite;

  toggleFavoriteIcon(currentQuote.isFavorite, toggleFavoriteBtn);

  if (currentQuote.isFavorite) {
    showFavoriteCard(currentQuote, favoriteContainer, toggleFavoriteBtn);
  } else {
    removeFavoriteCard(currentQuote.text);
  }
}

generateBtn.addEventListener('click', chooseAnddisplayQuote);
toggleFavoriteBtn.addEventListener('click', toggleFavorite);
