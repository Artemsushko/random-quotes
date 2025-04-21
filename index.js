import quotes from './src/quotes.js';
import { displayQuote, generateRandomQuote } from './src/quotesHandler.js';
const generateBtn = document.getElementById('quoteBtn');

let currentQuote = null;

function chooseAndDisplayQuote() {
  const randomQuote = generateRandomQuote(quotes);
  currentQuote = randomQuote;
  displayQuote(randomQuote);
}

generateBtn.addEventListener('click', chooseAndDisplayQuote);

export { currentQuote };
