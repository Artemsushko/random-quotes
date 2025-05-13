import {
  toggleFavoriteBtn as btn,
  removeAllCardsBtn as removeBtn,
  changeCurrentQuote,
} from '../../index.js';
import { setItem, getItem, clear, removeItem } from '../utils/localStorage.js';

// Функция для удаления всех избранных карточек
function removeAllCards(quotes, currentQuote) {
  const favoriteCards = document.querySelectorAll('.favorite-card');
  favoriteCards.forEach((card) => card.remove());
  quotes.forEach((quote) => (quote.isFavorite = false)); // Убираем все избранное
  toggleFavoriteIcon(false); // Обновляем иконку сердечка на пустое
  setItem('currentQuote', currentQuote);
  clear(); // Очищаем локальное хранилище
  updateRemoveAllCardsVisibility(quotes); // Обновляем видимость кнопки "Удалить все"
}

function saveFavoriteQuotes(quotes) {
  const favoriteQuotes = quotes.filter((quote) => quote.isFavorite); // Фильтруем только избранные цитаты
  setItem('favoriteQuotes', favoriteQuotes); // Сохраняем их в localStorage
}

// Функция для переключения статуса "избранное"
function toggleFavorite(quote, quotes, container) {
  quote.isFavorite = !quote.isFavorite;
  toggleFavoriteIcon(quote.isFavorite);
  changeCurrentQuote(quote);

  // Если цитата в избранном, добавляем ее, иначе удаляем
  if (quote.isFavorite) {
    showFavoriteCard(quote, quotes, container);
  } else {
    removeFavoriteCard(quote, quotes);
  }

  // Сохраняем обновленное состояние избранных цитат в localStorage
  saveFavoriteQuotes(quotes);
  updateRemoveAllCardsVisibility(quotes);
}

// Обновление иконки сердечка в зависимости от статуса
function toggleFavoriteIcon(isFavorite) {
  const btnComputedStyle = window.getComputedStyle(btn);
  if (btnComputedStyle.display === 'none') {
    btn.style.display = 'inline-block';
  }
  popFavoriteIcon();
  btn.classList.toggle('fas', isFavorite); // Закрашенное сердечко
  btn.classList.toggle('far', !isFavorite); // Пустое сердечко
}

// Функция для показа карточки в избранном
function showFavoriteCard(quote, quotes, container) {
  const { text, author, id } = quote;
  const existingCard = document.querySelector(
    `[data-favorite-quote-id="${id}"]`
  );
  if (existingCard) return; // Если карточка уже существует, не создаем новую
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
    setItem('savedCards', storedFavorites); // Сохраняем в локальное хранилище
  }
}

// Удаление карточки из избранного
function removeFavoriteCard(quote, quotes) {
  const { id } = quote;
  const card = document.querySelector(`[data-favorite-quote-id="${id}"]`);
  const currentQuote = document.getElementById('current-quote');
  const currentQuoteId = currentQuote.dataset.currentQuoteId;
  quote.isFavorite = false;
  if (id === currentQuoteId) {
    changeCurrentQuote(quote); // Если текущая цитата, обновляем ее
    toggleFavoriteIcon(false); // Обновляем иконку на пустое сердечко
  }
  if (card) {
    card.remove(); // Удаляем карточку из DOM
  }
  popFavoriteIcon();
  const storedFavorites = getItem('savedCards') || [];
  const updatedFavorites = storedFavorites.filter(
    (card) => card.id !== quote.id
  );
  setItem('savedCards', updatedFavorites); // Обновляем локальное хранилище
  const quoteInArray = quotes.find((q) => q.id === quote.id);
  if (quoteInArray) {
    quoteInArray.isFavorite = false; // Обновляем статус в массиве цитат
  }
  updateRemoveAllCardsVisibility(quotes); // Обновляем видимость кнопки "Удалить все"
}

// Функция для анимации иконки сердечка
function popFavoriteIcon() {
  btn.classList.add('pop');
  setTimeout(() => btn.classList.remove('pop'), 300);
}

// Обновление видимости кнопки "Удалить все"
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
