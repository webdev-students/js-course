// =============================================================
// api.js — the ONLY file that talks to DummyJSON.
// DummyJSON is a free practice API. It has no real shop behind
// it: nothing we "buy" is ever sent anywhere.
// =============================================================
import { API_BASE_URL } from './config.js';

// STEP 06: only ask for the fields the product cards need.
// Smaller responses = faster pages.
const CARD_FIELDS = [
  'id',
  'title',
  'price',
  'discountPercentage',
  'rating',
  'stock',
  'thumbnail',
  'category',
  'brand',
].join(',');

// STEP 06: one helper for every request.
// fetch() only rejects on network failure, so we check response.ok
// ourselves and throw for 404s and 500s too.
async function request(path) {
  const response = await fetch(API_BASE_URL + path);
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

// STEP 06: get a page of products.
// DummyJSON has three list addresses:
//   /products                      → everything
//   /products/search?q=phone       → search
//   /products/category/laptops     → one category
// All three accept limit, skip, sortBy, order and select.
// Resolves to { products: [...], total, skip, limit }.
export function getProducts({ search = '', category = '', limit, skip = 0, sortBy = '', order = '' } = {}) {
  const params = new URLSearchParams({ limit, skip, select: CARD_FIELDS });

  // STEP 11: only send sort settings when the user picked a sort.
  if (sortBy) {
    params.set('sortBy', sortBy);
    params.set('order', order);
  }

  // STEP 11: pick the right address.
  let path = '/products';
  if (search) {
    path = '/products/search';
    params.set('q', search);
  } else if (category) {
    path = `/products/category/${encodeURIComponent(category)}`;
  }

  return request(`${path}?${params}`);
}

// STEP 13: the category list for the filter dropdown.
// Resolves to [{ slug: 'beauty', name: 'Beauty', url: '...' }, ...]
export function getCategories() {
  return request('/products/categories');
}

// STEP 15: one full product (with images, description, reviews...).
export function getProductById(id) {
  return request(`/products/${encodeURIComponent(id)}`);
}

// STEP 17: a few products from the same category, for "You might also like".
export async function getRelatedProducts(product, count = 4) {
  const data = await getProducts({ category: product.category, limit: count + 1 });
  return data.products
    .filter((related) => related.id !== product.id)
    .slice(0, count);
}
