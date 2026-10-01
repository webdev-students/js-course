// Exercise 5 — Breakpoint hunt
// Counts words: a new word starts whenever a non-space follows a space (or the start).
function countWords(text) {
  let wordCount = 0;
  let isInWord = false;
  for (let i = 1; i < text.length; i++) {
    const character = text[i];
    if (character === ' ') {
      isInWord = false;
    } else if (isInWord) {
      wordCount++;
      isInWord = true;
    }
  }
  return wordCount;
}

console.log(countWords('Hello world'));
console.log(countWords('  This   ring is   the best  '));
console.log(countWords(''));
