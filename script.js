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
  toggleFavoriteBtn.classList.remove('favorite', 'not-favorite');
  if (quotes[currentIndex].isFavorite) {
    toggleFavoriteBtn.classList.add('favorite');
    toggleFavoriteBtn.textContent = 'Remove from favorite';
  } else {
    toggleFavoriteBtn.classList.add('not-favorite');
    toggleFavoriteBtn.textContent = 'Add to favorite';
  }

  lastIndex = currentIndex;
  quoteElement.textContent = `"${quotes[currentIndex].text}"`;
  quoteAutor.textContent = quotes[currentIndex].author;
}

function toggleFavorite() {
  quotes[currentIndex].isFavorite = !quotes[currentIndex].isFavorite;

  toggleFavoriteBtn.classList.remove('favorite', 'not-favorite');
  if (quotes[currentIndex].isFavorite) {
    toggleFavoriteBtn.classList.add('favorite');
    toggleFavoriteBtn.textContent = 'Remove from favorite';
  } else {
    toggleFavoriteBtn.classList.add('not-favorite');
    toggleFavoriteBtn.textContent = 'Add to favorite';
  }
}

generateBtn.addEventListener('click', generateRandomQuote);
toggleFavoriteBtn.addEventListener('click', toggleFavorite);
