import { toggleFavoriteIcon, toggleFavorite } from './favorites.js';
import { generateRandomInt } from '../utils.js';

const toggleFavoriteBtn = document.getElementById('favorite-btn');
toggleFavoriteBtn.addEventListener('click', toggleFavorite);

let lastIndex = -1;

function handleQuote(quotes, changeCurrentQuote) {
  const randomQuote = generateRandomQuote(quotes);
  changeCurrentQuote(randomQuote);
  displayQuote(randomQuote, toggleFavoriteBtn);
}

function generateRandomQuote(quotes) {
  let randomIndex;
  do {
    randomIndex = generateRandomInt(quotes.length);
  } while (randomIndex === lastIndex);
  lastIndex = randomIndex;
  return quotes[randomIndex];
}

function displayQuote(quote, btn) {
  let { text, author, isFavorite } = quote;
  const quoteElement = document.getElementById('quoteElement');
  const quoteAuthor = document.getElementById('quoteAuthor');
  quoteElement.classList.add('quote');
  quoteElement.textContent = text;
  quoteAuthor.textContent = author;
  toggleFavoriteIcon(isFavorite, btn);
}

export { handleQuote };
