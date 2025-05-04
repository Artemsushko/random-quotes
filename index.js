import quotes from './src/data/quotes.js';
import { handleQuote } from './src/handlers/quote.js';
import {
  toggleFavorite,
  removeAllCards,
  showFavoriteCard,
  updateRemoveAllCardsVisibility,
} from './src/handlers/favorites.js';
import { applySavedTheme, handleThemeToggle } from './src/handlers/theme.js';
import {
  setItem,
  clear,
  getItem,
  removeItem,
} from './src/utils/localStorage.js';
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

function changeCurrentQuote(quote) {
  currentQuote = quote;
  setItem('currentQuote', currentQuote);
}

function init() {
  const savedQuote = getItem('currentQuote');
  if (savedQuote) {
    try {
      const quoteFromList = quotes.find((quote) => quote.id === savedQuote.id);
      if (!quoteFromList) {
        throw new Error('Saved quote not found in quotes array');
      }
      quoteFromList.isFavorite = savedQuote.isFavorite;
      handleQuote([quoteFromList], changeCurrentQuote);
    } catch (error) {
      console.error('Error when reading currentQuote from localStorage', error);
      handleQuote(quotes, changeCurrentQuote);
    }
  }
  const savedCards = getItem('savedCards') || [];
  savedCards.forEach((quote) => {
    showFavoriteCard(quote, quotes, favoriteContainer);
  });
  updateRemoveAllCardsVisibility(quotes);
}

window.addEventListener('load', init);

export {
  toggleFavoriteBtn,
  removeAllCardsBtn,
  favoriteContainer,
  changeCurrentQuote,
};
