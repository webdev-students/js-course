// Lesson 6.3 — DevTools breakpoints

// Average of the ratings 1 to 5 given in one string, like '4,5,3'.
function getAverageRating(ratingsText) {
  const ratings = ratingsText.split(',');
  let total = 0;
  for (let i = 0; i < ratings.length; i++) {
    total += ratings[i];
  }
  const average = total / ratings.length;
  return Math.round(average * 10) / 10;
}

console.log('Average rating:', getAverageRating('4,5,3'));
