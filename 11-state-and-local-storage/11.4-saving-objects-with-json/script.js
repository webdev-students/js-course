// To-do App — saved in localStorage (Lesson 11.4)

// Part 1: storage helpers.

// STEP 2: ONE state object — and the only way to change it.
const state = {
  todos: [
    { id: 1, text: 'Buy ring', done: false },
    { id: 2, text: 'Pay electricity bill', done: true },
    { id: 3, text: 'Call Mum', done: false },
  ],
  currentFilter: 'all',
  nextId: 4,
};

const listeners = [];

function subscribe(listener) {
  listeners.push(listener);
  listener(state);
}

function setState(changes) {
  Object.assign(state, changes);
  listeners.forEach((listener) => listener(state));
}

const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoError = document.querySelector('#todo-error');
const todoList = document.querySelector('#todo-list');
const itemsLeft = document.querySelector('#items-left');
const filterButtons = document.querySelectorAll('[data-filter]');

function escapeHTML(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getVisibleTodos() {
  if (state.currentFilter === 'active') {
    return state.todos.filter((todo) => !todo.done);
  }
  if (state.currentFilter === 'done') {
    return state.todos.filter((todo) => todo.done);
  }
  return state.todos;
}

function createTodoHTML(todo) {
  return `
    <li class="${todo.done ? 'todo-done' : ''}" data-todo-id="${todo.id}">
      <label>
        <input type="checkbox" data-action="toggle" ${todo.done ? 'checked' : ''} />
        <span>${escapeHTML(todo.text)}</span>
      </label>
      <button type="button" class="secondary" data-action="delete" aria-label="Delete ${escapeHTML(todo.text)}">✕</button>
    </li>
  `;
}

function render() {
  const visibleTodos = getVisibleTodos();
  todoList.innerHTML = visibleTodos.length
    ? visibleTodos.map(createTodoHTML).join('')
    : '<li class="muted">Nothing here.</li>';

  const activeCount = state.todos.filter((todo) => !todo.done).length;
  itemsLeft.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;

  filterButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === state.currentFilter));
  });
}

subscribe(render);

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (text === '') {
    todoError.textContent = 'Type a to-do first.';
    todoError.hidden = false;
    todoInput.setAttribute('aria-invalid', 'true');
    todoInput.focus();
    return;
  }

  todoError.hidden = true;
  todoInput.removeAttribute('aria-invalid');
  setState({
    todos: [...state.todos, { id: state.nextId, text, done: false }],
    nextId: state.nextId + 1,
  });
  todoForm.reset();
  todoInput.focus();
});

todoList.addEventListener('click', (event) => {
  const control = event.target.closest('[data-action]');
  if (!control) {
    return;
  }
  const id = Number(control.closest('[data-todo-id]').dataset.todoId);

  if (control.dataset.action === 'toggle') {
    setState({ todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)) });
  } else if (control.dataset.action === 'delete') {
    setState({ todos: state.todos.filter((todo) => todo.id !== id) });
  }
});

document.querySelector('.filters').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (button) {
    setState({ currentFilter: button.dataset.filter });
  }
});

document.querySelector('#clear-done').addEventListener('click', () => {
  setState({ todos: state.todos.filter((todo) => !todo.done) });
});
