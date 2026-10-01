// =============================================================
// router.js — a tiny hash-based router.
// Everything after the # in the address bar decides which page
// we draw. The browser never reloads; we just swap what's in <main>.
//   #/                      → shop (home)
//   #/?q=phone&page=2       → shop with a search, page 2
//   #/product/12            → one product
//   #/cart  #/wishlist  #/checkout  #/payment  #/orders  #/order/CHK-1A2B3C4D
// =============================================================

// STEP 09: the list of routes, e.g. { pattern: '/product/:id', render }.
const routes = [];
let notFoundRender = null;
let outletElement = null;

// STEP 09: which page is on screen right now.
// STEP 10: …and the object its render function gave back.
let currentPath = null;
let currentView = null;
// STEP 15: every navigation gets a number (see isCurrent below).
let navigationCount = 0;

// STEP 09: other parts of the app can listen for page changes
// (the header highlights the active link, the drawer closes).
const routeListeners = [];

// STEP 09: register a page.
export function addRoute(pattern, render) {
  routes.push({ pattern, render });
}

// STEP 09: what to draw when no route matches.
export function setNotFound(render) {
  notFoundRender = render;
}

// STEP 09: listen for page changes.
export function onRouteChange(listener) {
  routeListeners.push(listener);
}

// STEP 09: split the hash into a path and its query string.
// '#/product/12'        → { path: '/product/12', params: (empty) }
// '#/?q=phone&page=2'   → { path: '/', params: q=phone, page=2 }
export function parseHash(hash = location.hash) {
  const withoutHash = hash.replace(/^#/, '') || '/';
  const [path, queryString = ''] = withoutHash.split('?');
  return { path: path || '/', params: new URLSearchParams(queryString) };
}

// STEP 09: does '/product/12' match '/product/:id'? If so → { id: '12' }.
export function matchPath(pattern, path) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) {
    return null;
  }
  const values = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      values[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }
  return values;
}

// STEP 28: go to a page, e.g. navigate('/cart').
export function navigate(path) {
  location.hash = path;
}

// STEP 12: change the query string of the CURRENT page WITHOUT
// adding a new entry to the browser history (so typing a search
// doesn't fill the Back button with 20 half-typed searches).
export function replaceQuery(params) {
  const { path } = parseHash();
  const queryString = params.toString();
  location.replace(`#${path}${queryString ? `?${queryString}` : ''}`);
}

// STEP 09: draw the page for the current hash.
function handleRouteChange() {
  const { path, params } = parseHash();

  // STEP 10: same page, only the query changed (e.g. page=2 → page=3)?
  // Let the page update itself instead of redrawing from scratch —
  // later, that keeps the search box focused while you type.
  if (path === currentPath && currentView && currentView.update) {
    currentView.update(params);
    return;
  }

  // STEP 21: clean up the old page (for example, stop listening to the cart).
  if (currentView && currentView.cleanup) {
    currentView.cleanup();
  }

  // STEP 15: each navigation gets a number. A page that finishes loading
  // AFTER you've already left can check isCurrent() and stop.
  navigationCount++;
  const thisNavigation = navigationCount;
  const isCurrent = () => thisNavigation === navigationCount;

  let render = notFoundRender;
  let routeParams = {};
  for (const route of routes) {
    const values = matchPath(route.pattern, path);
    if (values) {
      render = route.render;
      routeParams = values;
      break;
    }
  }

  const isFirstPage = currentPath === null;
  currentPath = path;
  outletElement.innerHTML = '';
  currentView = render({ container: outletElement, params, routeParams, isCurrent }) || null;

  // STEP 09: a new "page" should feel like one: scroll to the top,
  // and move keyboard focus to <main> so screen readers start there.
  if (!isFirstPage) {
    window.scrollTo(0, 0);
    outletElement.focus({ preventScroll: true });
  }

  routeListeners.forEach((listener) => listener(path));
}

// STEP 09: start listening for hash changes and draw the first page.
export function startRouter(outlet) {
  outletElement = outlet;
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}
