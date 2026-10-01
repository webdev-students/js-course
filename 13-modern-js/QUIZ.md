# Module 13 quiz — Modern JS

**1. Which import is correct in the browser?**
A) `import { formatPrice } from 'utils'` · B) `import { formatPrice } from './utils.js'` · C) `import formatPrice from utils.js` · D) `require('./utils.js')`

**2. What does `<script type="module">` do automatically?**
A) Nothing special · B) It's deferred, and the file gets its own scope · C) It runs before the HTML is read · D) It makes every variable global

**3. `class Product { constructor(title) { this.title = title; } }` — how do you make one?**
A) `Product('Lamp')` · B) `new Product('Lamp')` · C) `Product.new('Lamp')` · D) `create Product('Lamp')`

**4. What does a field named `#balance` in a class mean?**
A) It's a number · B) It's private: only code inside the class can use it · C) It's static · D) It's a comment

**5. In a child class's constructor, what must come before using `this`?**
A) `return` · B) `super(…)` · C) `extends` · D) Nothing

**6. Where does `[1, 2].map` come from?**
A) Every array has its own copy · B) `Array.prototype` — arrays borrow it through the prototype chain · C) The window · D) It's a keyword

**7. `button.addEventListener('click', counter.increment)` — what is `this` inside `increment`?**
A) `counter` · B) The button · C) `undefined` always · D) The window always

**8. Which regex checks that a WHOLE value is exactly 6 digits?**
A) `/\d{6}/` · B) `/^\d{6}$/` · C) `/[0-6]/` · D) `/\d+/`

**9. What does `new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1299.99)` give?**
A) `'1299.99'` · B) `'$1,299.99'` · C) `'USD 1299.99'` · D) `'1.299,99 $'`

**10. Why does the Checkout store's search use `location.replace` instead of setting `location.hash`?**
A) It's faster · B) So typing doesn't fill the Back button's history with every half-typed search · C) `location.hash` doesn't work with queries · D) To reload the page
