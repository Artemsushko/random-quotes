import { currentQuote } from '../../index.js';
import quotes from '../data/quotes.js';

const toggleFavoriteBtn = document.getElementById('favorite-btn');
const removeAllCardsBtn = document.getElementById('removeAllCardsBtn');
const favoriteContainer = document.getElementById('favorite-container');

toggleFavoriteBtn.addEventListener('click', toggleFavorite);
removeAllCardsBtn.addEventListener('click', removeAllCards);

function removeAllCards() {
  const favoriteCards = document.querySelectorAll('.favorite-card');
  favoriteCards.forEach((card) => card.remove());
  quotes.forEach((quote) => (quote.isFavorite = false));
  toggleFavoriteIcon(false, toggleFavoriteBtn);

  updateRemoveAllBtnVisibility();
}

function toggleFavorite() {
  currentQuote.isFavorite = !currentQuote.isFavorite;
  toggleFavoriteIcon(currentQuote.isFavorite, toggleFavoriteBtn);
  showOrRemoveFavoriteCard(currentQuote, toggleFavoriteBtn);
  updateRemoveAllBtnVisibility();
}

function toggleFavoriteIcon(isFavorite, btn) {
  const btnComputedStyle = window.getComputedStyle(toggleFavoriteBtn);
  if (btnComputedStyle.display === 'none') {
    btn.style.display = 'inline-block';
  }
  btn.classList.add('pop');
  setTimeout(() => btn.classList.remove('pop'), 300);
  btn.classList.toggle('fas', isFavorite);
  btn.classList.toggle('far', !isFavorite);
}

function showOrRemoveFavoriteCard(currentQuote, btn) {
  currentQuote.isFavorite
    ? showFavoriteCard(currentQuote, btn)
    : removeFavoriteCard(currentQuote.text);
}

function showFavoriteCard(quote, btn) {
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
      toggleFavoriteIcon(false, btn);
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

export { toggleFavoriteIcon, toggleFavorite };
