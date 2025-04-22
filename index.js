import quotes from './src/data/quotes.js';
import { setIdsToQuotes } from './src/utils.js';
import { handleQuote } from './src/handlers/quote.js';
import { toggleFavorite, removeAllCards } from './src/handlers/favorites.js';

const toggleFavoriteBtn = document.getElementById('favorite-btn');
toggleFavoriteBtn.addEventListener('click', () =>
  toggleFavorite(currentQuote, quotes, favoriteContainer)
);

const removeAllCardsBtn = document.getElementById('removeAllCardsBtn');
removeAllCardsBtn.addEventListener('click', () => removeAllCards(quotes));

const generateBtn = document.getElementById('quoteBtn');
generateBtn.addEventListener('click', () =>
  handleQuote(quotes, changeCurrentQuote, toggleFavoriteBtn)
);

const favoriteContainer = document.getElementById('favorite-container');

let currentQuote = null;
setIdsToQuotes(quotes);
console.log(quotes);
function changeCurrentQuote(quote) {
  currentQuote = quote;
}

export {
  currentQuote,
  toggleFavoriteBtn,
  removeAllCardsBtn,
  favoriteContainer,
};
