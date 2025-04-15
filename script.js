import quotes from './quotes.js';

const generateBtn = document.getElementById('quoteBtn');
const quoteElement = document.getElementById('quoteElement');
const quoteAutor = document.getElementById('quoteAutor');
const toggleFavoriteBtn = document.getElementById('favorite-btn');
const favoriteContainer = document.getElementById('favorite-container');
let lastIndex = -1;
let currentIndex;

function changeFavoriteBtnColor(isFavorite) {
  toggleFavoriteBtn.classList.toggle('fas', isFavorite);
  toggleFavoriteBtn.classList.toggle('far', !isFavorite);
}

function showFavoriteCard(quote) {
  const { text, author } = quote;
  const favoriteCard = document.createElement('div');
  favoriteCard.classList.add('favorite-card');
  favoriteCard.innerHTML = `<p id="favorite-text">"${text}"</p>
  <p class=quoteAutor>${author}</p>`;
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

function generateRandomQuote() {
  do {
    currentIndex = Math.floor(Math.random() * quotes.length);
  } while (currentIndex === lastIndex);
  let { text, author, isFavorite } = quotes[currentIndex];
  if (isFavorite === undefined) {
    isFavorite = false;
  }

  changeFavoriteBtnColor(isFavorite);

  lastIndex = currentIndex;
  quoteElement.textContent = `"${text}"`;
  quoteAutor.textContent = author;
  toggleFavoriteBtn.style.display = 'inline-block';
}

function toggleFavorite() {
  const currentQuote = quotes[currentIndex];
  currentQuote.isFavorite = !currentQuote.isFavorite;

  changeFavoriteBtnColor(currentQuote.isFavorite);

  if (currentQuote.isFavorite) {
    showFavoriteCard(currentQuote);
  } else {
    removeFavoriteCard(currentQuote.text);
  }
}

generateBtn.addEventListener('click', generateRandomQuote);
toggleFavoriteBtn.addEventListener('click', toggleFavorite);
