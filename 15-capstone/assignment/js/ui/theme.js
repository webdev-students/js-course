// =============================================================
// ui/theme.js — the light/dark toggle.
// The theme is a data-theme attribute on <html>. The CSS swaps
// its colour variables based on it. The choice is saved as
// 'checkout-app:theme'.
// =============================================================
import { loadFromStorage, saveToStorage } from '../storage.js';

// STEP 34: the two themes we support.
const THEMES = ['light', 'dark'];

// STEP 34: saved choice first; otherwise follow the computer's setting.
function getInitialTheme() {
  const savedTheme = loadFromStorage('theme', null);
  if (THEMES.includes(savedTheme)) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}


// STEP 34: apply a theme to the page and to the toggle button.
// aria-pressed="true" tells screen readers "dark mode is ON".
function applyTheme(theme, button) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === 'dark';
  button.setAttribute('aria-pressed', String(isDark));
  button.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
}

// STEP 34: set up the toggle button.
export function initTheme() {
  const button = document.querySelector('[data-action="toggle-theme"]');
  let theme = getInitialTheme();
  applyTheme(theme, button);

  button.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme, button);
    saveToStorage('theme', theme);
  });
}
