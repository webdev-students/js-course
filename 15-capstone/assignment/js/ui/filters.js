// =============================================================
// ui/filters.js — the search box, category, price and sort
// controls, and how they're stored in the URL.
// Example URL: #/?q=phone&category=smartphones&min=100&sort=price-asc&page=2
// =============================================================

import { getCategories } from '../api.js';
import { SEARCH_DELAY_MS } from '../config.js';
import { debounce, escapeHTML } from '../utils.js';

// STEP 11: every sort choice, and what it means to the API.
export const SORT_OPTIONS = [
  { value: '', label: 'Featured', sortBy: '', order: '' },
  { value: 'price-asc', label: 'Price: low to high', sortBy: 'price', order: 'asc' },
  { value: 'price-desc', label: 'Price: high to low', sortBy: 'price', order: 'desc' },
  { value: 'rating-desc', label: 'Top rated', sortBy: 'rating', order: 'desc' },
  { value: 'title-asc', label: 'Name: A to Z', sortBy: 'title', order: 'asc' },
];

// STEP 11: '120' → 120, '' → null, 'abc' → null, '-5' → null.
function parsePrice(value) {
  if (value === null || value.trim() === '') {
    return null;
  }
  const price = Number(value);
  return Number.isFinite(price) && price >= 0 ? price : null;
}

// STEP 11: turn the URL's query string into a clean filters object.
// Anything missing or invalid falls back to a sensible default,
// so a hand-edited URL can never break the page.
export function readFiltersFromParams(params) {
  const page = Number.parseInt(params.get('page'), 10);
  const sort = params.get('sort') ?? '';
  return {
    search: (params.get('q') ?? '').trim(),
    category: params.get('category') ?? '',
    minPrice: parsePrice(params.get('min')),
    maxPrice: parsePrice(params.get('max')),
    sort: SORT_OPTIONS.some((option) => option.value === sort) ? sort : '',
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

// STEP 11: the reverse — filters object → URLSearchParams.
// We leave defaults out so the URL stays short and tidy.
export function filtersToParams(filters) {
  const params = new URLSearchParams();
  if (filters.search) {
    params.set('q', filters.search);
  }
  if (filters.category) {
    params.set('category', filters.category);
  }
  if (filters.minPrice !== null) {
    params.set('min', filters.minPrice);
  }
  if (filters.maxPrice !== null) {
    params.set('max', filters.maxPrice);
  }
  if (filters.sort) {
    params.set('sort', filters.sort);
  }
  if (filters.page > 1) {
    params.set('page', filters.page);
  }
  return params;
}

// STEP 12: are any filters switched on? (Used for the "Clear" buttons.)
export function hasActiveFilters(filters) {
  return Boolean(filters.search || filters.category || filters.minPrice !== null || filters.maxPrice !== null || filters.sort);
}

// STEP 12: the form with all the filter controls.
export function createFiltersHTML() {
  const sortOptionsHTML = SORT_OPTIONS
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join('');

  return `
    <form class="filters" data-filters role="search" aria-label="Search and filter products">
      <div class="field">
        <label class="field-label" for="filter-search">Search</label>
        <input class="field-input" id="filter-search" name="search" type="search"
          placeholder="Try “phone” or “watch”" autocomplete="off">
      </div>

      <div class="field">
        <label class="field-label" for="filter-category">Category</label>
        <select class="field-input" id="filter-category" name="category">
          <option value="">All categories</option>
        </select>
      </div>

      <fieldset class="field field-group">
        <legend class="field-label">Price range</legend>
        <div class="filters-price">
          <label class="visually-hidden" for="filter-min">Minimum price</label>
          <input class="field-input" id="filter-min" name="minPrice" type="number" min="0" step="1" inputmode="decimal" placeholder="Min">
          <span aria-hidden="true">–</span>
          <label class="visually-hidden" for="filter-max">Maximum price</label>
          <input class="field-input" id="filter-max" name="maxPrice" type="number" min="0" step="1" inputmode="decimal" placeholder="Max">
        </div>
      </fieldset>

      <div class="field">
        <label class="field-label" for="filter-sort">Sort by</label>
        <select class="field-input" id="filter-sort" name="sort">${sortOptionsHTML}</select>
      </div>

      <button type="button" class="button button-ghost button-block" data-action="clear-filters">Clear filters</button>
    </form>
  `;
}

// STEP 13: fetch the categories once, then remember them.
let cachedCategories = null;

// STEP 13: fill the category dropdown. If it fails, the dropdown
// just keeps "All categories" — the shop still works.
export async function loadCategoryOptions(select, selectedCategory) {
  try {
    if (!cachedCategories) {
      cachedCategories = await getCategories();
    }
    const optionsHTML = cachedCategories
      .map((category) => `<option value="${escapeHTML(category.slug)}">${escapeHTML(category.name)}</option>`)
      .join('');
    select.insertAdjacentHTML('beforeend', optionsHTML);
    select.value = selectedCategory;
  } catch (error) {
    console.warn('Could not load categories.', error);
  }
}

// STEP 12: make the controls show what the URL says.
// We don't touch the search box while you're typing in it.
export function syncFilterControls(form, filters) {
  if (document.activeElement !== form.elements.search) {
    form.elements.search.value = filters.search;
  }
  form.elements.category.value = filters.category;
  form.elements.minPrice.value = filters.minPrice ?? '';
  form.elements.maxPrice.value = filters.maxPrice ?? '';
  form.elements.sort.value = filters.sort;
  form.querySelector('[data-action="clear-filters"]').disabled = !hasActiveFilters(filters);
}

// STEP 14: read both price boxes; swap them if min is bigger than max.
function readPriceRange(form) {
  let minPrice = parsePrice(form.elements.minPrice.value);
  let maxPrice = parsePrice(form.elements.maxPrice.value);
  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }
  return { minPrice, maxPrice };
}

// STEP 12: listen to the controls.
// `onChange` receives just the parts that changed, e.g. { category: 'laptops' }.
export function attachFilterEvents(form, onChange) {
  // STEP 12: search waits until you stop typing.
  const debouncedSearch = debounce((value) => onChange({ search: value.trim() }), SEARCH_DELAY_MS);
  form.elements.search.addEventListener('input', (event) => debouncedSearch(event.target.value));

  // STEP 13: category changes apply straight away.
  form.elements.category.addEventListener('change', (event) => onChange({ category: event.target.value }));

  // STEP 14: price applies when you leave the box (or press Enter).
  form.elements.minPrice.addEventListener('change', () => onChange(readPriceRange(form)));
  form.elements.maxPrice.addEventListener('change', () => onChange(readPriceRange(form)));

  // STEP 14: sort applies straight away.
  form.elements.sort.addEventListener('change', (event) => onChange({ sort: event.target.value }));

  // STEP 14: one button to reset everything.
  form.querySelector('[data-action="clear-filters"]').addEventListener('click', () => {
    form.elements.search.value = '';
    onChange({ search: '', category: '', minPrice: null, maxPrice: null, sort: '' });
    form.elements.search.focus();
  });

  // STEP 12: pressing Enter searches immediately instead of reloading the page.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    onChange({ search: form.elements.search.value.trim(), ...readPriceRange(form) });
  });
}
