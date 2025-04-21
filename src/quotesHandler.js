import { toggleFavoriteIcon } from './favoritesHandler.js';
import { generateRandomInt } from './utils.js';

let lastIndex = -1;

function displayQuote(quote) {
  let { text, author, isFavorite } = quote;
  const quoteElement = document.getElementById('quoteElement');
  const quoteAuthor = document.getElementById('quoteAuthor');
  quoteElement.classList.add('quote');
  quoteElement.textContent = text;
  quoteAuthor.textContent = author;
  toggleFavoriteIcon(isFavorite);
}

function generateRandomQuote(quotes) {
  let randomIndex;
  do {
    randomIndex = generateRandomInt(quotes.length);
  } while (randomIndex === lastIndex);
  lastIndex = randomIndex;
  return quotes[randomIndex];
}

export { displayQuote, generateRandomQuote };
