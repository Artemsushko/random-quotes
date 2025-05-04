import {
  toggleFavoriteBtn as btn,
  removeAllCardsBtn as removeBtn,
  changeCurrentQuote,
} from '../../index.js';
import { setItem, getItem, clear, removeItem } from '../utils/localStorage.js';

function removeAllCards(quotes, currentQuote) {
  const favoriteCards = document.querySelectorAll('.favorite-card');
  favoriteCards.forEach((card) => card.remove());
  quotes.forEach((quote) => (quote.isFavorite = false));
  toggleFavoriteIcon(false);
  setItem('currentQuote', currentQuote);
  clear();
  updateRemoveAllCardsVisibility(quotes);
}

function toggleFavorite(quote, quotes, container) {
  quote.isFavorite = !quote.isFavorite;
  toggleFavoriteIcon(quote.isFavorite);
  changeCurrentQuote(quote);
  quote.isFavorite
    ? showFavoriteCard(quote, quotes, container)
    : removeFavoriteCard(quote, quotes);
  updateRemoveAllCardsVisibility(quotes);
}

function toggleFavoriteIcon(isFavorite) {
  const btnComputedStyle = window.getComputedStyle(btn);
  if (btnComputedStyle.display === 'none') {
    btn.style.display = 'inline-block';
  }
  popFavoriteIcon();
  btn.classList.toggle('fas', isFavorite);
  btn.classList.toggle('far', !isFavorite);
}

function createFavoriteCard(quote, quotes, container) {
  const { text, author, id } = quote;
  const existingCard = document.querySelector(
    `[data-favorite-quote-id="${id}"]`
  );
  if (existingCard) return;
  const favoriteCard = document.createElement('div');
  favoriteCard.classList.add('favorite-card');
  favoriteCard.dataset.favoriteQuoteId = id;
  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close-btn');
  closeBtn.textContent = '×';
  const quoteText = document.createElement('p');
  quoteText.classList.add('quote');
  quoteText.textContent = text;
  const quoteAuthor = document.createElement('p');
  quoteAuthor.classList.add('quote-author');
  quoteAuthor.textContent = author;
  favoriteCard.append(closeBtn, quoteText, quoteAuthor);
  favoriteCard
    .querySelector('.close-btn')
    .addEventListener('click', () => removeFavoriteCard(quote, quotes));
  container.append(favoriteCard);

  const storedFavorites = getItem('savedCards') || [];
  const alreadyExists = storedFavorites.some((q) => q.id === quote.id);
  if (!alreadyExists) {
    storedFavorites.push({ id, text, author });
    setItem('savedCards', storedFavorites);
  }
}

function showFavoriteCard(quote, quotes, container) {
  createFavoriteCard(quote, quotes, container);
}

function removeFavoriteCard(quote, quotes) {
  const { id } = quote;
  const card = document.querySelector(`[data-favorite-quote-id="${id}"]`);
  const currentQuote = document.getElementById('current-quote');
  const currentQuoteId = currentQuote.dataset.currentQuoteId;
  quote.isFavorite = false;
  if (id === currentQuoteId) {
    changeCurrentQuote(quote);
    toggleFavoriteIcon(false);
  }
  if (card) {
    card.remove();
  }
  popFavoriteIcon();
  const storedFavorites = getItem('savedCards') || [];
  const updatedFavorites = storedFavorites.filter(
    (card) => card.id !== quote.id
  );
  setItem('savedCards', updatedFavorites);
  const quoteInArray = quotes.find((q) => q.id === quote.id);
  if (quoteInArray) {
    quoteInArray.isFavorite = false;
  }
  updateRemoveAllCardsVisibility(quotes);
}

function popFavoriteIcon() {
  btn.classList.add('pop');
  setTimeout(() => btn.classList.remove('pop'), 300);
}

function updateRemoveAllCardsVisibility(quotes) {
  const hasFavorites = quotes.some((quote) => quote.isFavorite);
  removeBtn.style.display = hasFavorites ? 'inline-block' : 'none';
}

export {
  toggleFavoriteIcon,
  toggleFavorite,
  removeAllCards,
  showFavoriteCard,
  updateRemoveAllCardsVisibility,
};
