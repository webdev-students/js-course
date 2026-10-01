// To-do App — refactored to state (Lesson 11.2)

// The state (all the app's data).
let todos = [
  { id: 1, text: 'Buy ring', done: false },
  { id: 2, text: 'Pay electricity bill', done: true },
  { id: 3, text: 'Call Mum', done: false },
];
let currentFilter = 'all';
let nextId = 4;

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
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.done);
  }
  if (currentFilter === 'done') {
    return todos.filter((todo) => todo.done);
  }
  return todos;
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

  const activeCount = todos.filter((todo) => !todo.done).length;
  itemsLeft.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;

  filterButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === currentFilter));
  });
}

render();

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
  todos = [...todos, { id: nextId, text, done: false }];
  nextId++;
  todoForm.reset();
  todoInput.focus();
  render();
});

todoList.addEventListener('click', (event) => {
  const control = event.target.closest('[data-action]');
  if (!control) {
    return;
  }
  const id = Number(control.closest('[data-todo-id]').dataset.todoId);

  if (control.dataset.action === 'toggle') {
    todos = todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
  } else if (control.dataset.action === 'delete') {
    todos = todos.filter((todo) => todo.id !== id);
  }
  render();
});

document.querySelector('.filters').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (button) {
    currentFilter = button.dataset.filter;
    render();
  }
});

document.querySelector('#clear-done').addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.done);
  render();
});
