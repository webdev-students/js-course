# Module 9 quiz — The DOM

**1. What is the DOM?**
A) A CSS framework · B) The tree of objects the browser builds from your HTML, which JavaScript can read and change · C) Your HTML file · D) A JavaScript library

**2. What does `document.querySelector('.card')` return if there are three cards?**
A) All three · B) The first one · C) The last one · D) `null`

**3. What does `document.querySelector('.missing')` return when nothing matches?**
A) An empty NodeList · B) `undefined` · C) `null` · D) An error

**4. You have a NodeList `cards`. Which works?**
A) `cards.map(…)` · B) `[...cards].map(…)` · C) `cards.filter(…)` · D) `cards.reduce(…)`

**5. A user typed a review. How should you show it?**
A) `element.innerHTML = review` · B) `element.textContent = review` (or escape it before using `innerHTML`) · C) `document.write(review)` · D) `element.style = review`

**6. `<li data-product-id="7">` — how do you read the id in JavaScript?**
A) `li.dataset.product-id` · B) `li.dataset.productId` · C) `li.productId` · D) `li.data.productId`

**7. What's the best way to highlight a card?**
A) `card.style.outline = '3px solid brown'` · B) `card.classList.add('highlight')`, with the look defined in CSS · C) `card.innerHTML += 'highlight'` · D) `card.highlight = true`

**8. Which adds an HTML string at the end of a list WITHOUT rebuilding what's already inside?**
A) `list.innerHTML = html` · B) `list.innerHTML += html` · C) `list.insertAdjacentHTML('beforeend', html)` · D) `list.textContent += html`

**9. A button is inside a `.product-card`. How do you find its card?**
A) `button.parentElement.parentElement.parentElement` · B) `button.closest('.product-card')` · C) `document.querySelector('.product-card')` · D) `button.nextElementSibling`

**10. Why do we add `defer` to our script tags?**
A) To make the script download later · B) So the script runs after the whole page has been read, and can find every element · C) To stop errors being shown · D) It's required for `console.log`
