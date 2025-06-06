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

const newQuotes = quotes.map((quote) => ({
  ...quote,
  isFavorite: false,
}));

const themeToggle = document.getElementById('theme-toggle');
applySavedTheme(themeToggle);
handleThemeToggle(themeToggle);

const toggleFavoriteBtn = document.getElementById('favorite-btn');
toggleFavoriteBtn.addEventListener('click', () =>
  toggleFavorite(currentQuote, newQuotes, favoriteContainer)
);

const removeAllCardsBtn = document.getElementById('removeAllCardsBtn');
removeAllCardsBtn.addEventListener('click', () => removeAllCards(newQuotes));

const generateBtn = document.getElementById('quoteBtn');
generateBtn.addEventListener('click', () => {
  handleQuote(newQuotes, changeCurrentQuote);
});

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
      const quoteFromList = newQuotes.find(
        (quote) => quote.id === savedQuote.id
      );
      if (!quoteFromList) {
        throw new Error('Saved quote not found in array');
      }
      quoteFromList.isFavorite = savedQuote.isFavorite;
      handleQuote([quoteFromList], changeCurrentQuote);
    } catch (error) {
      console.error('Error when reading currentQuote from localStorage', error);
      handleQuote(newQuotes, changeCurrentQuote);
    }
  }

  // Восстановление избранных цитат из localStorage
  const savedFavoriteQuotes = getItem('favoriteQuotes') || [];
  savedFavoriteQuotes.forEach((quote) => {
    const quoteInArray = newQuotes.find((q) => q.id === quote.id);
    if (quoteInArray) {
      quoteInArray.isFavorite = true; // Восстанавливаем состояние избранного
      showFavoriteCard(quoteInArray, newQuotes, favoriteContainer); // Показываем карточку
    }
  });

  updateRemoveAllCardsVisibility(newQuotes);
}

window.addEventListener('load', init);

export {
  toggleFavoriteBtn,
  removeAllCardsBtn,
  favoriteContainer,
  changeCurrentQuote,
};
