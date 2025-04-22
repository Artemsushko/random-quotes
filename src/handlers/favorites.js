import {
  toggleFavoriteBtn as btn,
  removeAllCardsBtn as removeBtn,
} from '../../index.js';

function removeAllCards(quotes) {
  const favoriteCards = document.querySelectorAll('.favorite-card');
  favoriteCards.forEach((card) => card.remove());
  quotes.forEach((quote) => (quote.isFavorite = false));
  toggleFavoriteIcon(false, btn);

  updateRemoveAllCardsVisibility(quotes, removeBtn);
}

function toggleFavorite(quote, quotes, container) {
  quote.isFavorite = !quote.isFavorite;
  toggleFavoriteIcon(quote.isFavorite, btn);
  quote.isFavorite
    ? showFavoriteCard(quote, quotes, btn, container)
    : removeFavoriteCard(quote.id, quotes);
  updateRemoveAllCardsVisibility(quotes);
}

function toggleFavoriteIcon(isFavorite, btn) {
  const btnComputedStyle = window.getComputedStyle(btn);
  if (btnComputedStyle.display === 'none') {
    btn.style.display = 'inline-block';
  }
  btn.classList.add('pop');
  setTimeout(() => btn.classList.remove('pop'), 300);
  btn.classList.toggle('fas', isFavorite);
  btn.classList.toggle('far', !isFavorite);
}

function showFavoriteCard(quote, quotes, btn, container) {
  const { text, author, id } = quote;
  const favoriteCard = document.createElement('div');
  favoriteCard.classList.add('favorite-card');
  favoriteCard.innerHTML = `
  <span class="close-btn">&times;</span>
  <p class="quote">${text}</p>
  <p class="quoteAuthor">${author}</p>
  `;
  favoriteCard.setAttribute('data-id', id);
  favoriteCard.querySelector('.close-btn').addEventListener('click', () => {
    favoriteCard.remove();
    quote.isFavorite = false;

    const currentQuoteElement = document.getElementById('quoteElement');
    if (currentQuoteElement.textContent === quote.text) {
      toggleFavoriteIcon(false, btn);
    }
    updateRemoveAllCardsVisibility(quotes, removeBtn);
  });
  container.appendChild(favoriteCard);
}

function removeFavoriteCard(quoteId) {
  const favoriteCards = document.querySelectorAll('.favorite-card');
  favoriteCards.forEach((card) => {
    if (card.getAttribute('data-id') === quoteId) {
      card.remove();
    }
  });
}

function updateRemoveAllCardsVisibility(quotes) {
  const hasFavorites = quotes.some((quote) => quote.isFavorite);
  removeBtn.style.display = hasFavorites ? 'inline-block' : 'none';
}

export { toggleFavoriteIcon, toggleFavorite, removeAllCards };
