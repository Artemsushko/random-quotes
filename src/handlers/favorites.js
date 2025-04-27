import {
  toggleFavoriteBtn as btn,
  removeAllCardsBtn as removeBtn,
} from '../../index.js';

function removeAllCards(quotes) {
  const favoriteCards = document.querySelectorAll('.favorite-card');
  favoriteCards.forEach((card) => card.remove());
  quotes.forEach((quote) => (quote.isFavorite = false));
  toggleFavoriteIcon(false);

  updateRemoveAllCardsVisibility(quotes);
}

function toggleFavorite(quote, quotes, container) {
  quote.isFavorite = !quote.isFavorite;
  toggleFavoriteIcon(quote.isFavorite);
  quote.isFavorite
    ? showFavoriteCard(quote, quotes, container)
    : removeFavoriteCard(quote.id);
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

function removeFavoriteQuote(quote, quotes) {
  removeFavoriteCard(quote.id);
  popFavoriteIcon();
  quote.isFavorite = false;
  const currentQuote = document.getElementById('current-quote');
  const currentQuoteId = currentQuote.dataset.currentQuoteId;
  if (quote.id === currentQuoteId) {
    toggleFavoriteIcon(quote.isFavorite);
  }
  updateRemoveAllCardsVisibility(quotes);
}

function showFavoriteCard(quote, quotes, container) {
  const { text, author, id } = quote;
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
    .addEventListener('click', () => removeFavoriteQuote(quote, quotes));

  container.append(favoriteCard);
}

function removeFavoriteCard(quoteId) {
  const card = document.querySelector(`[data-favorite-quote-id="${quoteId}"]`);
  if (card) {
    card.remove();
  }
}

function popFavoriteIcon() {
  btn.classList.add('pop');
  setTimeout(() => btn.classList.remove('pop'), 300);
}

function updateRemoveAllCardsVisibility(quotes) {
  const hasFavorites = quotes.some((quote) => quote.isFavorite);
  removeBtn.style.display = hasFavorites ? 'inline-block' : 'none';
}

export { toggleFavoriteIcon, toggleFavorite, removeAllCards };
