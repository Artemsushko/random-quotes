function toggleFavoriteIcon(isFavorite, btn) {
  const btnComputedStyle = window.getComputedStyle(btn);
  if (btnComputedStyle.display === 'none') {
    btn.style.display = 'inline-block';
  }
  btn.classList.toggle('fas', isFavorite);
  btn.classList.toggle('far', !isFavorite);
}

function showFavoriteCard(quote, container, btn, updateRemoveAllBtnVisibility) {
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
  container.appendChild(favoriteCard);
}

function removeFavoriteCard(quoteText) {
  const favoriteCards = document.querySelectorAll('.favorite-card');
  favoriteCards.forEach((card) => {
    if (card.textContent.includes(quoteText)) {
      card.remove();
    }
  });
}

export { toggleFavoriteIcon, removeFavoriteCard, showFavoriteCard };
