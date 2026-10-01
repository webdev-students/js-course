// =============================================================
// ui/productList.js — the shop (home) page: filters on the left,
// product cards on the right, page numbers underneath.
// =============================================================
import { getProducts } from '../api.js';
import { PAGE_SIZE } from '../config.js';
import { replaceQuery } from '../router.js';
import { formatCategoryName, toDisplayAmount } from '../utils.js';
import { setPageTitle } from './header.js';
import { createProductCardHTML, attachProductActions } from './productCard.js';
import { createSkeletonCardsHTML } from './skeletons.js';
import { createEmptyStateHTML, renderErrorState, getErrorMessage } from './states.js';
import { createPaginationHTML } from './pagination.js';
import {
  createFiltersHTML,
  readFiltersFromParams,
  filtersToParams,
  syncFilterControls,
  loadCategoryOptions,
  attachFilterEvents,
  hasActiveFilters,
  SORT_OPTIONS,
} from './filters.js';

// STEP 14: is this product inside the price range? (Prices are in the
// display currency, because that's what the user typed.)
function isInPriceRange(product, minPrice, maxPrice) {
  const price = toDisplayAmount(product.price);
  if (minPrice !== null && price < minPrice) {
    return false;
  }
  if (maxPrice !== null && price > maxPrice) {
    return false;
  }
  return true;
}

// STEP 11: get ONE page of products for these filters.
// Resolves to { products, total }.
//
// STEP 14: normally the API does all the work with limit + skip. But the
// API can't filter by price, and can't search inside a category. In
// those cases we ask for EVERY match (limit: 0), filter them here,
// and then cut out the page ourselves with slice(skip, skip + PAGE_SIZE)
// — the same limit/skip idea, done in the browser.
export async function fetchProductPage(filters) {
  const { sortBy, order } = SORT_OPTIONS.find((option) => option.value === filters.sort);
  const skip = (filters.page - 1) * PAGE_SIZE;
  const hasPriceFilter = filters.minPrice !== null || filters.maxPrice !== null;
  const needsBrowserFiltering = hasPriceFilter || Boolean(filters.search && filters.category);

  if (!needsBrowserFiltering) {
    const data = await getProducts({
      search: filters.search,
      category: filters.category,
      limit: PAGE_SIZE,
      skip,
      sortBy,
      order,
    });
    return { products: data.products, total: data.total };
  }

  const data = await getProducts({ search: filters.search, category: filters.category, limit: 0, sortBy, order });
  const matches = data.products.filter(
    (product) =>
      (!filters.category || product.category === filters.category) &&
      isInPriceRange(product, filters.minPrice, filters.maxPrice),
  );
  return { products: matches.slice(skip, skip + PAGE_SIZE), total: matches.length };
}

// STEP 11: the page heading changes with the filters.
function getHeading(filters) {
  if (filters.search) {
    return `Results for “${filters.search}”`;
  }
  if (filters.category) {
    return formatCategoryName(filters.category);
  }
  return 'Shop all products';
}

// STEP 07: draw the shop page.
export function renderHomePage({ container, params }) {
  container.innerHTML = `
    <section class="shop">
      <div class="shop-header">
        <h1 class="page-title" tabindex="-1" data-shop-heading>Shop all products</h1>
        <p class="shop-summary" data-results-summary aria-live="polite"></p>
      </div>
      <div class="shop-layout">
        <aside class="shop-filters">${createFiltersHTML()}</aside>
        <div class="shop-results">
          <div class="product-grid" data-product-grid></div>
          <nav class="pagination" data-pagination aria-label="Product pages"></nav>
        </div>
      </div>
    </section>
  `;

  const heading = container.querySelector('[data-shop-heading]');
  const summary = container.querySelector('[data-results-summary]');
  const grid = container.querySelector('[data-product-grid]');
  const pagination = container.querySelector('[data-pagination]');
  const filtersForm = container.querySelector('[data-filters]');

  // STEP 21: the products on screen right now, by id, so the
  // click handler can find the product for a button.
  const productsById = new Map();

  // STEP 11: the current filters always come from the URL.
  let filters = readFiltersFromParams(params);

  // STEP 12: each request gets a number. If an older, slower request
  // finishes AFTER a newer one, we simply ignore it.
  let latestRequestId = 0;

  // STEP 12: a filter changed → put it in the URL. The router sees
  // the new URL and calls update() below. Any change except the page
  // itself takes you back to page 1.
  function applyFilterChanges(changes) {
    const nextFilters = { ...filters, ...changes };
    if (!('page' in changes)) {
      nextFilters.page = 1;
    }
    replaceQuery(filtersToParams(nextFilters));
  }

  // STEP 11: the link for page N, keeping every other filter.
  function getPageHref(page) {
    const pageParams = filtersToParams({ ...filters, page });
    const queryString = pageParams.toString();
    return queryString ? `#/?${queryString}` : '#/';
  }

  // STEP 07: load and draw the current page.
  async function loadProducts() {
    const requestId = ++latestRequestId;
    const headingText = getHeading(filters);
    heading.textContent = headingText;
    setPageTitle(headingText);

    // STEP 08: show skeletons while we wait.
    grid.setAttribute('aria-busy', 'true');
    grid.innerHTML = createSkeletonCardsHTML(PAGE_SIZE);
    pagination.innerHTML = '';
    summary.textContent = 'Loading products…';

    try {
      const { products, total } = await fetchProductPage(filters);
      if (requestId !== latestRequestId) {
        return; // a newer request has started — throw this one away
      }

      productsById.clear();
      products.forEach((product) => productsById.set(product.id, product));
      grid.removeAttribute('aria-busy');

      // STEP 12: nothing matched at all.
      if (total === 0) {
        summary.textContent = 'No products found.';
        grid.innerHTML = createEmptyStateHTML({
          title: 'No products match your search',
          message: 'Try a different word, another category or a wider price range.',
          actionHTML: hasActiveFilters(filters)
            ? '<button type="button" class="button button-primary" data-action="reset-filters">Clear all filters</button>'
            : '',
        });
        return;
      }

      // STEP 10: a page number past the end (e.g. from an old link).
      if (products.length === 0) {
        summary.textContent = `There are only ${Math.ceil(total / PAGE_SIZE)} pages.`;
        grid.innerHTML = createEmptyStateHTML({
          title: 'That page doesn’t exist',
          message: 'Head back to the first page of results.',
          actionHTML: `<a class="button button-primary" href="${getPageHref(1)}">Go to page 1</a>`,
        });
        return;
      }

      // STEP 10: "Showing 13–24 of 194 products"
      const first = (filters.page - 1) * PAGE_SIZE + 1;
      const last = first + products.length - 1;
      summary.textContent = `Showing ${first}–${last} of ${total} products`;

      grid.innerHTML = products.map(createProductCardHTML).join('');
      pagination.innerHTML = createPaginationHTML({
        currentPage: filters.page,
        totalPages: Math.ceil(total / PAGE_SIZE),
        getPageHref,
      });
    } catch (error) {
      if (requestId !== latestRequestId) {
        return;
      }
      // STEP 08: something failed → friendly message + Retry.
      console.error(error);
      grid.removeAttribute('aria-busy');
      summary.textContent = '';
      renderErrorState(grid, {
        title: 'We couldn’t load the products',
        message: getErrorMessage(error),
        onRetry: loadProducts,
      });
    }
  }

  // STEP 21: Add to cart buttons on every card.
  attachProductActions(grid, (productId) => productsById.get(productId));

  // STEP 12: the "Clear all filters" button inside the empty state.
  grid.addEventListener('click', (event) => {
    if (event.target.closest('[data-action="reset-filters"]')) {
      applyFilterChanges({ search: '', category: '', minPrice: null, maxPrice: null, sort: '' });
    }
  });

  // STEP 12: make the controls match the URL, and listen to them.
  syncFilterControls(filtersForm, filters);
  attachFilterEvents(filtersForm, applyFilterChanges);
  loadCategoryOptions(filtersForm.elements.category, filters.category);
  loadProducts();

  // STEP 10: the router calls this when only the query string changed.
  return {
    update(newParams) {
      const previousPage = filters.page;
      filters = readFiltersFromParams(newParams);
      syncFilterControls(filtersForm, filters);
      if (filters.page !== previousPage) {
        container.querySelector('.shop').scrollIntoView({ block: 'start' });
      }
      loadProducts();
    },
  };
}
