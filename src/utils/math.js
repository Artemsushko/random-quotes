function generateRandomInt(maxInt) {
  return Math.floor(Math.random() * maxInt);
}
function generateRandomId() {
  return Math.floor(Math.random() * 0xffffffff)
    .toString(16)
    .padStart(8, '0');
}
function setIdsToQuotes(quotes) {
  quotes.forEach((quote) => {
    quote.id = generateRandomId();
  });
}
export { generateRandomInt, setIdsToQuotes };
