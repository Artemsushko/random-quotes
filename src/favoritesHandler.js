import { currentQuote } from '../index.js';
import quotes from './quotes.js';

const toggleFavoriteBtn = document.getElementById('favorite-btn');
const removeAllCardsBtn = document.getElementById('removeAllCardsBtn');
const favoriteContainer = document.getElementById('favorite-container');

toggleFavoriteBtn.addEventListener('click', toggleFavorite);
removeAllCardsBtn.addEventListener('click', removeAllCards);

function removeAllCards() {
  const favoriteCards = document.querySelectorAll('.favorite-card');
  favoriteCards.forEach((card) => card.remove());
  quotes.forEach((quote) => (quote.isFavorite = false));
  toggleFavoriteIcon(false);

  updateRemoveAllBtnVisibility();
}

function toggleFavorite() {
  currentQuote.isFavorite = !currentQuote.isFavorite;
  toggleFavoriteIcon(currentQuote.isFavorite);
  showOrRemoveFavoriteCard();
  updateRemoveAllBtnVisibility();
}

function showOrRemoveFavoriteCard() {
  currentQuote.isFavorite
    ? showFavoriteCard(currentQuote)
    : removeFavoriteCard(currentQuote.text);
}

function toggleFavoriteIcon(isFavorite) {
  const btnComputedStyle = window.getComputedStyle(toggleFavoriteBtn);
  if (btnComputedStyle.display === 'none') {
    toggleFavoriteBtn.style.display = 'inline-block';
  }
  toggleFavoriteBtn.classList.toggle('fas', isFavorite);
  toggleFavoriteBtn.classList.toggle('far', !isFavorite);
}

function showFavoriteCard(quote) {
  const { text, author } = quote;
  const favoriteCard = document.createElement('div');
  favoriteCard.classList.add('favorite-card');
  favoriteCard.innerHTML = `
  <span class="close-btn">&times;</span>
  <p class="quote">${text}</p>
  <p class="quoteAuthor">${author}</p>
  `;
  favoriteCard.querySelector('.close-btn').addEventListener('click', () => {
    favoriteCard.remove();
    quote.isFavorite = false;

    const currentQuoteElement = document.getElementById('quoteElement');
    if (currentQuoteElement.textContent === quote.text) {
      toggleFavoriteIcon(false);
    }
    updateRemoveAllBtnVisibility();
  });
  favoriteContainer.appendChild(favoriteCard);
}

function removeFavoriteCard(quoteText) {
  const favoriteCards = document.querySelectorAll('.favorite-card');
  favoriteCards.forEach((card) => {
    if (card.textContent.includes(quoteText)) {
      card.remove();
    }
  });
}

function updateRemoveAllBtnVisibility() {
  const hasFavorites = quotes.some((quote) => quote.isFavorite);
  removeAllCardsBtn.style.display = hasFavorites ? 'inline-block' : 'none';
}

export { toggleFavoriteIcon };
