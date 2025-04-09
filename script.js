import quotes from './quotes.js';

const generateBtn = document.getElementById('quoteBtn');
const quoteElement = document.getElementById('quoteElement');
const quoteAutor = document.getElementById('quoteAutor');
const toggleFavoriteBtn = document.getElementById('favorite-btn');
let lastIndex = -1;
let currentIndex;

function generateRandomQuote() {
  do {
    currentIndex = Math.floor(Math.random() * quotes.length);
  } while (currentIndex === lastIndex);
  if (quotes[currentIndex].isFavorite === undefined) {
    quotes[currentIndex].isFavorite = false;
  }
  if (quotes[currentIndex].isFavorite) {
    toggleFavoriteBtn.textContent = 'Remove from favorite';
  } else {
    toggleFavoriteBtn.textContent = 'Add to favorite';
  }
  lastIndex = currentIndex;
  quoteElement.textContent = `"${quotes[currentIndex].text}"`;
  quoteAutor.textContent = quotes[currentIndex].author;
}

function toggleFavorite() {
  quotes[currentIndex].isFavorite = !quotes[currentIndex].isFavorite;
  if (quotes[currentIndex].isFavorite) {
    toggleFavoriteBtn.textContent = 'Remove from favorite';
  } else {
    toggleFavoriteBtn.textContent = 'Add to favorite';
  }
}

generateBtn.addEventListener('click', generateRandomQuote);
toggleFavoriteBtn.addEventListener('click', toggleFavorite);
