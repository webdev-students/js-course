# Module 10 quiz — Events & Forms

**1. What's wrong with `button.addEventListener('click', handleClick());`?**
A) Nothing · B) The brackets call `handleClick` straight away, and its return value is passed instead of the function · C) `'click'` should be `'onclick'` · D) Listeners must be arrow functions

**2. A click lands on a `<strong>` inside a button that has the listener. What are `event.target` and `event.currentTarget`?**
A) Both the button · B) target is the `<strong>`, currentTarget is the button · C) target is the button, currentTarget is the `<strong>` · D) Both the `<strong>`

**3. Which event fires on EVERY keystroke in a text box?**
A) `change` · B) `input` · C) `submit` · D) `blur`

**4. Why do we call `event.preventDefault()` in a form's submit handler?**
A) To stop other listeners · B) To stop the page reloading, so we can handle the data ourselves · C) To clear the form · D) To validate the form

**5. Which fields does `new FormData(form)` read?**
A) Every field with an `id` · B) Every field with a `name` · C) Only text inputs · D) Only required fields

**6. Which pair of attributes makes a form error accessible?**
A) `class="error"` and `style="color: red"` · B) `aria-invalid="true"` on the input, and `aria-describedby` pointing to the error text · C) `title` and `alt` · D) `hidden` and `disabled`

**7. A click on a button inside a card inside a list: which listeners run, and in what order (normal listeners)?**
A) Only the button's · B) The list's, then the card's, then the button's · C) The button's, then the card's, then the list's · D) It depends on the browser

**8. Why is event delegation useful for a product grid that's re-rendered after sorting?**
A) It's faster to type · B) The one listener is on the container, which isn't replaced — so the new buttons work too · C) It stops bubbling · D) It removes the need for `data-` attributes

**9. How do you remove a listener?**
A) `element.removeEventListener('click', sameNamedFunction)` · B) `element.removeEventListener('click')` · C) `element.onclick = null` always works · D) You can't

**10. A dialog closes. Where should the keyboard focus go?**
A) The top of the page · B) Nowhere · C) Back to the element that opened it · D) The first link on the page
