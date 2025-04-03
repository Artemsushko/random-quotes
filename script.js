const quotes = [
  'Success is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill',
  'Do what you can, with what you have, where you are. – Theodore Roosevelt',
  'I find that the harder I work, the more luck I seem to have. – Thomas Jefferson',
  "It always seems impossible until it's done. – Nelson Mandela",
  'The only way to do great work is to love what you do. – Steve Jobs',
  "Opportunities don't happen. You create them. – Chris Grosser",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  'The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt',
  'Knowing yourself is the beginning of all wisdom. – Aristotle',
  'We are what we repeatedly do. Excellence, then, is not an act, but a habit. – Aristotle',
  'An unexamined life is not worth living. – Socrates',
  'Happiness depends upon ourselves. – Aristotle',
  'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment. – Buddha',
  'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. – Ralph Waldo Emerson',
  'Life is really simple, but we insist on making it complicated. – Confucius',
  'We accept the love we think we deserve. – Stephen Chbosky',
  'Love all, trust a few, do wrong to none. – William Shakespeare',
  'Being deeply loved by someone gives you strength, while loving someone deeply gives you courage. – Lao Tzu',
  'Where there is love there is life. – Mahatma Gandhi',
  'The best thing to hold onto in life is each other. – Audrey Hepburn',
  'Creativity is intelligence having fun. – Albert Einstein',
  'You can’t use up creativity. The more you use, the more you have. – Maya Angelou',
  'Think different. – Apple, Inc.',
  'Innovation distinguishes between a leader and a follower. – Steve Jobs',
  'Do not go where the path may lead, go instead where there is no path and leave a trail. – Ralph Waldo Emerson',
  'It does not matter how slowly you go as long as you do not stop. – Confucius',
  'Courage is resistance to fear, mastery of fear—not absence of fear. – Mark Twain',
  'Fall seven times and stand up eight. – Japanese Proverb',
  'Fear is the enemy of progress. – Napoleon Hill',
  'Bravery is not the absence of fear but the ability to continue despite it. – Unknown',
  'I can resist everything except temptation. – Oscar Wilde',
  'Behind every great man, there is a woman rolling her eyes. – Jim Carrey',
  'If you want your children to listen, try talking softly to someone else. – Ann Landers',
  'A day without laughter is a day wasted. – Charlie Chaplin',
  'Get your facts first, then you can distort them as you please. – Mark Twain',
];

const generateBtn = document.getElementById('quoteBtn');
const quoteElement = document.getElementById('quoteElement');
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
