const quotes = [
  'The only way to do great work is to love what you do. - Steve Jobs',
  'Innovation distinguishes between a leader and a follower. - Steve Jobs',
  "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
];

const quoteElement = document.getElementById('quote');
const generateBtn = document.getElementById('generate-btn');
let lastIndex = -1;
function generateRandomQuote() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastIndex);
  lastIndex = randomIndex;
  quoteElement.textContent = quotes[randomIndex];
}

generateBtn.addEventListener('click', generateRandomQuote);
