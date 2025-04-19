function toggleFavoriteIcon(isFavorite, btn) {
  btn.classList.toggle('fas', isFavorite);
  btn.classList.toggle('far', !isFavorite);
}

function showToggleFavoriteBtn(btn) {
  btn.style.display = 'inline-block';
}

function showFavoriteCard(quote, container, btn) {
  const { text, author } = quote;
  const favoriteCard = document.createElement('div');
  favoriteCard.classList.add('favorite-card');
  favoriteCard.innerHTML = `
    <span class="close-btn">&times;</span>
    <p class="quote">${text}</p>
    <p class="quoteAutor">${author}</p>
  `;
  closeFavoriteCard(favoriteCard, quote, btn);
  container.appendChild(favoriteCard);
}

function closeFavoriteCard(card, quote, btn) {
  card.querySelector('.close-btn').addEventListener('click', () => {
    card.remove();
    quote.isFavorite = false;
    const currentQuoteElement = document.getElementById('quoteElement');
    if (currentQuoteElement.textContent === quote.text) {
      toggleFavoriteIcon(false, btn);
    }
  });
}

function removeFavoriteCard(quoteText) {
  const favoriteCards = document.querySelectorAll('.favorite-card');
  favoriteCards.forEach((card) => {
    if (card.textContent.includes(quoteText)) {
      card.remove();
    }
  });
}

export {
  toggleFavoriteIcon,
  removeFavoriteCard,
  showFavoriteCard,
  showToggleFavoriteBtn,
};
