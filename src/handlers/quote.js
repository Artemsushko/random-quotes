import { toggleFavoriteIcon } from './favorites.js';
import { generateRandomInt } from '../utils.js';

let lastIndex = -1;

function handleQuote(quotes, changeCurrentQuote, btn) {
  const randomQuote = generateRandomQuote(quotes);
  changeCurrentQuote(randomQuote);
  displayQuote(randomQuote, btn);
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
