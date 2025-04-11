import quotes from './quotes.js';

const generateBtn = document.getElementById('quoteBtn');
const quoteElement = document.getElementById('quoteElement');
const quoteAutor = document.getElementById('quoteAutor');
const toggleFavoriteBtn = document.getElementById('favorite-btn');
const favoriteContainer = document.getElementById('favorite-container');
let lastIndex = -1;
let currentIndex;

function changeColorOfMakeFavoriteBtn() {
  toggleFavoriteBtn.classList.remove('favorite', 'not-favorite');
  if (quotes[currentIndex].isFavorite) {
    toggleFavoriteBtn.classList.add('favorite');
    toggleFavoriteBtn.textContent = 'Remove from favorite';
  } else {
    toggleFavoriteBtn.classList.add('not-favorite');
    toggleFavoriteBtn.textContent = 'Add to favorite';
  }
}

function generateRandomQuote() {
  do {
    currentIndex = Math.floor(Math.random() * quotes.length);
  } while (currentIndex === lastIndex);
  if (quotes[currentIndex].isFavorite === undefined) {
    quotes[currentIndex].isFavorite = false;
  }

  changeColorOfMakeFavoriteBtn();

  lastIndex = currentIndex;
  quoteElement.textContent = `"${quotes[currentIndex].text}"`;
  quoteAutor.textContent = quotes[currentIndex].author;

  toggleFavoriteBtn.style.display = 'inline-block';
}

function toggleFavorite() {
  quotes[currentIndex].isFavorite = !quotes[currentIndex].isFavorite;

  changeColorOfMakeFavoriteBtn();
  if (quotes[currentIndex].isFavorite) {
    const favoriteCard = document.createElement('div');
    favoriteCard.classList.add('favorite-card');
    favoriteCard.innerHTML = `<p id="favorite-text">"${quotes[currentIndex].text}"</p>
    <p class=quoteAutor>${quotes[currentIndex].author}</p>`;
    favoriteContainer.appendChild(favoriteCard);
  } else {
    const favoriteCards = document.querySelectorAll('.favorite-card');
    favoriteCards.forEach((card) => {
      if (card.textContent.includes(quotes[currentIndex].text)) {
        card.remove();
      }
    });
  }
}

generateBtn.addEventListener('click', generateRandomQuote);
toggleFavoriteBtn.addEventListener('click', toggleFavorite);
