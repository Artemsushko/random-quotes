function changeFavoriteBtnColor(isFavorite, btn) {
  btn.classList.toggle('fas', isFavorite);
  btn.classList.toggle('far', !isFavorite);
}

function showFavoriteCard(quote, container, btn) {
  const { text, author } = quote;
  const favoriteCard = document.createElement('div');
  favoriteCard.classList.add('favorite-card');
  favoriteCard.innerHTML = `
    <span class="close-btn">&times;</span>
    <p id="favorite-text">"${text}"</p>
    <p class="quoteAutor">${author}</p>
  `;
  favoriteCard.querySelector('.close-btn').addEventListener('click', () => {
    favoriteCard.remove();
    quote.isFavorite = false;
    changeFavoriteBtnColor(false, btn);
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

export { changeFavoriteBtnColor, removeFavoriteCard, showFavoriteCard };
