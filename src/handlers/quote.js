import { toggleFavoriteIcon } from './favorites.js';
import { generateRandomInt } from '../utils/math.js';

let lastIndex = -1;

function handleQuote(quotes, changeCurrentQuote) {
  const randomQuote = generateRandomQuote(quotes);
  changeCurrentQuote(randomQuote);
  displayQuote(randomQuote);
}

function generateRandomQuote(quotes) {
  let randomIndex;
  do {
    randomIndex = generateRandomInt(quotes.length);
  } while (randomIndex === lastIndex);
  lastIndex = randomIndex;
  return quotes[randomIndex];
}

function displayQuote(quote) {
  let { text, author, isFavorite, id } = quote;
  const quoteElement = document.getElementById('current-quote');
  const quoteTextElement = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  quoteElement.dataset.currentQuoteId = id;
  quoteTextElement.classList.add('quote');
  quoteTextElement.textContent = text;
  quoteAuthor.textContent = author;
  toggleFavoriteIcon(isFavorite);
}

export { handleQuote };
