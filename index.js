import quotes from './src/data/quotes.js';
import { handleQuote } from './src/handlers/quote.js';

let currentQuote = null;

function changeCurrentQuote(quote) {
  currentQuote = quote;
}

const generateBtn = document.getElementById('quoteBtn');
generateBtn.addEventListener('click', () =>
  handleQuote(quotes, changeCurrentQuote)
);

export { currentQuote };
