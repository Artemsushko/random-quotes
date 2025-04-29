import quotes from './src/data/quotes.js';
import { setIdsToQuotes } from './src/utils.js';
import { handleQuote } from './src/handlers/quote.js';
import { toggleFavorite, removeAllCards } from './src/handlers/favorites.js';
import { applySavedTheme, handleThemeToggle } from './src/handlers/theme.js';

const themeToggle = document.getElementById('theme-toggle');
applySavedTheme(themeToggle);
handleThemeToggle(themeToggle);

const toggleFavoriteBtn = document.getElementById('favorite-btn');
toggleFavoriteBtn.addEventListener('click', () =>
  toggleFavorite(currentQuote, quotes, favoriteContainer)
);

const removeAllCardsBtn = document.getElementById('removeAllCardsBtn');
removeAllCardsBtn.addEventListener('click', () => removeAllCards(quotes));

const generateBtn = document.getElementById('quoteBtn');
generateBtn.addEventListener('click', () =>
  handleQuote(quotes, changeCurrentQuote)
);

const favoriteContainer = document.getElementById('favorite-container');

let currentQuote = null;
setIdsToQuotes(quotes);

function changeCurrentQuote(quote) {
  currentQuote = quote;
  localStorage.setItem('currentQuote', JSON.stringify(currentQuote));
}

const saved = localStorage.getItem('currentQuote');
if (saved) {
  try {
    const savedQuote = JSON.parse(saved);
    handleQuote([savedQuote], changeCurrentQuote);
  } catch (error) {
    console.error('Error when reading currentQuote from localStorage', error);
    handleQuote(quotes, changeCurrentQuote);
  }
} else {
  handleQuote(quotes, changeCurrentQuote);
}

export { toggleFavoriteBtn, removeAllCardsBtn, favoriteContainer };
